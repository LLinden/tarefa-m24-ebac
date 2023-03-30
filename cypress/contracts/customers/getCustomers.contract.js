const Joi = require("joi");

const getCustomersSchema = Joi.array().items({
  address: Joi.object(),
  createdAt: Joi.string(),
  email: Joi.string(),
  firstName: Joi.string(),
  id: Joi.string(),
  lastName: Joi.string(),
  orders: Joi.array(),
  phone: Joi.string(),
  updatedAt: Joi.string(),
});
export default getCustomersSchema;
