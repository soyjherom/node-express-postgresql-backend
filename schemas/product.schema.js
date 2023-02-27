// DTO (Data Transfer Object)
const Joi = require('joi');

const idRule = Joi.string().uuid();
const nameRule = Joi.string().min(3).max(15);
const priceRule = Joi.number().integer().min(10);
const imageRule = Joi.string().uri();

const idRequiredProductSchema = Joi.object({
  id: idRule.required()
});

const createProductSchema = Joi.object({
  name: nameRule.required(),
  price: priceRule.required(),
  image: imageRule
});

const updateProductSchema = Joi.object({
  name: nameRule,
  price: priceRule,
  image: imageRule
});

module.exports = {
  idRequiredProductSchema,
  createProductSchema,
  updateProductSchema,
}
