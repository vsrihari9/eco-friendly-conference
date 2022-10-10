const FlakeIDGen = require('flake-idgen');

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const flakeIDGenrator = new FlakeIDGen({ id: getRandomNumber(1, 1023) });

exports.GenerateRequestID = () => async (req, res, next) => {
  const uniqueRequestID = flakeIDGenrator.next().toString('hex');
  req.RequestID = uniqueRequestID;
  res.set('Request-Id', uniqueRequestID);
  global.REQUEST_ID = uniqueRequestID;
  return next();
};
