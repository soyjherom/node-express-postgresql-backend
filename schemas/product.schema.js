// DTO (Data Transfer Object)
const Joi = require('joi');

const idRule = Joi.string().uuid();
const nameRule = Joi.string().min(3).max(15);
const priceRule = Joi.number().integer().min(10);
const categoryRule = Joi.number();

const idRequiredProductSchema = Joi.object({
  id: idRule.required()
});

const createProductSchema = Joi.object({
  product_name: nameRule.required(),
  price: priceRule.required(),
  category_id: categoryRule.required()
});

const updateProductSchema = Joi.object({
  name: nameRule,
  price: priceRule,
  category_id: categoryRule
});

module.exports = {
  idRequiredProductSchema,
  createProductSchema,
  updateProductSchema,
}
