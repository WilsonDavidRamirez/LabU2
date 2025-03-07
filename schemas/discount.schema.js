const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const percentage = Joi.number().integer().min(0).max(100);
const startDate = Joi.date();
const endDate = Joi.date().greater(Joi.ref('startDate'));
const status = Joi.boolean();

const createDiscountSchema = Joi.object({
  name: name.required(),
  percentage: percentage.required(),
  startDate: startDate.required(),
  endDate: endDate.required(),
  status: status.default(true),
});

module.exports = { createDiscountSchema };
