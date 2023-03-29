const Joi = require("joi");

const deleteAddressesSchema = Joi.object({
  address_1: Joi.string(),
  address_2: Joi.string(),
  city: Joi.string(),
  createdAt: Joi.string(),
  customers: Joi.array(),
  id: Joi.string(),
  state: Joi.string(),
  updatedAt: Joi.string(),
  zip: Joi.number(),
});
export default deleteAddressesSchema;
