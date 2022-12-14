require('dotenv').config();
const axios = require('axios');
const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

let dbConn;

initDBConnection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbConn) {
        dbConn = mysql.createPool({
          connectionLimit: 5,
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        });
      }
      resolve(true);
    } catch (err) {
      console.log('Failure in creating DB connection pool:', err);
      reject(err);
    }
  });
};

async function dbQuery(query, params) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Query:', query);
      dbConn.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } catch (err) {
      console.log('Failure in query: ', err);
      reject(err);
    }
  });
};

app.use(async function (req, res, next) {
  await initDBConnection();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get("/health", (req, res) => {
  return res.status(200).json({ message: 'API health: okay' });
});

/*
    /cities for complete list
    /cities?q=xyz for filtered cities
*/
app.get("/cities", async (req, res) => {
  try{
    const q = req.query['q'];
    let query = `select * from cities`;
    if(q){
      query += ` where city like ? or state like ? or code like ?`
    }
    query += ` order by city`
    const data = await dbQuery(
      query, ['%'+q+'%','%'+q+'%','%'+q+'%']
    );
    return res.json({results: data});
  } catch(err) {
    res.status(400).json(err);
  }
});

app.post("/bestsite", async (req, res) => {
  try{
    const item = req.body.item;
    const sites = item.sites;
    const travellers = item.travellers;
    const startDate = new Date(item.travelDateRange.startDate);
    const endDate = new Date(item.travelDateRange.endDate);
    const travelClass = item.travelClass;

    let perdiem_days = {};

    for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      let month = d.getMonth();
      let year = d.getFullYear();
      if(!(year in perdiem_days)) {
        perdiem_days[year] = {}
      }
      if(!(month in perdiem_days[year])) {
        perdiem_days[year][month] = 0;
      }
      perdiem_days[year][month] += 1;
    }

    let cities = await dbQuery(
      `
        SELECT
          r.dest_city_id as city_id,
          c.city,
          c.state,
          c.code,
          sum(r.fare) as airfare,
          sum(r.co2) as co2
        FROM routes r
          JOIN cities c ON r.dest_city_id = c.city_id
        WHERE
          dest_city_id in (?) and
          origin_city_id in (?) and
          class=?
        GROUP BY dest_city_id
      `,
      [sites, travellers, travelClass]
    );

    const return_fare = await dbQuery(
      `
        SELECT
          r.origin_city_id as city_id,
          sum(r.fare) as airfare,
          sum(r.co2) as co2
        FROM routes r
          JOIN cities c ON r.origin_city_id = c.city_id
        WHERE
          origin_city_id in (?) and
          dest_city_id in (?) and
          class=?
        GROUP BY origin_city_id
      `,
      [sites, travellers, travelClass]
    );

    cities.forEach((city, i) => {
      return_fare.forEach((ret, j) => {
        if(city.city_id === ret.city_id) {
          cities[i].airfare = Math.round((cities[i].airfare+ret.airfare) * 1e12) / 1e12;
          cities[i].co2 = Math.round((cities[i].co2+ret.co2) * 1e12) / 1e12;
        }
      })
    });
    
    const same_city = await dbQuery(
      `
        SELECT
          city_id,
          city,
          state,
          code,
          0 as airfare,
          0 as co2
        FROM cities
        WHERE
          city_id in (?) and
          city_id in (?) and
          city_id not in (?)
      `,
      [sites, travellers, cities.map(a => a.city_id).concat([0])]
    );

    cities.push(...same_city);

    for(const city of cities) {
      let perdiem = 0;
      for(const [year, data] of Object.entries(perdiem_days)){
        const perdiem_data = await getPerdiemData(city.city, city.state, year);
        meals = perdiem_data.meals;
        for(const [month, days] of Object.entries(data)) {
          lodging = perdiem_data.months.month[month].value;
          perdiem += meals*days + lodging*days
        }
      }
      city['perdiem'] = perdiem;
      city['monetoryCost'] = perdiem + city.airfare;
      city['effectiveCost'] = city.monetoryCost + city.co2;
    }

    cities.sort(function(a,b) {return (a.effectiveCost > b.effectiveCost) ? 1 : ((b.effectiveCost > a.effectiveCost) ? -1 : 0);} );

    console.log('final', cities);

    res.json({
      results: cities
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

app.listen(port, function () {
  console.log('API started on url -', hostname+":"+port);
});

async function getPerdiemData(city, state, year) {
  const url = process.env.PERDIEM_RATES_URL;
  const api_key = process.env.PERDIEM_API_KEY;

  if(!url.endsWith('/')){
    url += '/';
  }
  return new Promise(async (resolve, reject) => {
    axios.get(`${url}city/${city}/state/${state}/year/${year}?api_key=${api_key}`).then(async function (response) {
      resolve(response.data.rates[0].rate[0]);
    });
  });
}
