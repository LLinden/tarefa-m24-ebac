const Joi = require("joi");

const postCustomersSchema = Joi.object({
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
export default postCustomersSchema;
