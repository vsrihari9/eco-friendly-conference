/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const glob = require('glob');

let files = [];

glob('src/api/**/*.schema.validators.js', (err, res) => {
  if (err) {
    console.log('Failed to retrieve files');
  } else {
    files = res;
    describe('Validation Schema Tests', () => {
      files.forEach((filename) => {
        console.log(`Checking ${filename}`);
        // eslint-disable-next-line global-require
        const validator = require(`../../../../${filename}`);
        for (const [key, value] of Object.entries(validator)) {
          console.log(`Checking ${key} in ${filename}`);
          it(`Validator schema ${key} in ${filename} should have query params validated`, () => {
            expect(value.query).to.be.an('object');
          });
        }
      });
    });
  }
});
