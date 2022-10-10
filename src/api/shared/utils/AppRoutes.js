/* istanbul ignore file */
/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const app = require('../../../index');

const routes = [];

function split(thing) {
  let result;
  if (typeof thing === 'string') {
    result = thing;
  } else if (thing.fast_slash) {
    result = '';
  } else {
    result = thing
      .toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    result = result ? result[1].replace(/\\(.)/g, '$1') : '';
  }
  return result;
}

app._router.stack.forEach((i) => {
  if (i.name === 'router') {
    i.handle.stack.forEach((s) => {
      Object.keys(s.route.methods).forEach((m) => {
        const routePath = `${split(i.regexp)}${s.route.path}`;
        routes.push({
          method: m.toUpperCase(),
          route: routePath,
          stack: s.route.stack,
        });
      });
    });
  }
});

module.exports = routes;
