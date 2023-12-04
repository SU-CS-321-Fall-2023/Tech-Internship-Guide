const Joi = require('joi');

const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'edu'] } })
  .required();

module.exports = emailSchema;
