const JoiOriginal = require('@hapi/joi');

module.exports = JoiOriginal.defaults((schema) => {
  switch (schema.type) {
    case 'object':
      return schema.options({ abortEarly: false });
    default:
      return schema;
  }
});
