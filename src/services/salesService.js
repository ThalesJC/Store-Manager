const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { findId } = require('../models/productModel');

const verifyId = async (productsArray) => {
  const verifiedId = productsArray.map(async (sale) => findId(sale.productId));
  const promiseReturn = await Promise.all(verifiedId);
  return promiseReturn.some((product) => !product);
};

const saleSchema = Joi.array().items({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const errorTreatment = (productsSale) => {
const { error } = saleSchema.validate(productsSale);
  if (error) {
  if (error.message.includes('must be greater than or equal to 1')) {
    return {
      status: 422,
      response: {
        message: error.message
          .replace(error.details[0].context.label, error.details[0].context.key) },
    };
  }
  return {
    status: 400,
    response: {
      message: error.message
        .replace(error.details[0].context.label, error.details[0].context.key) },
  };
}
  return null;
};

const salesRegistration = async (productsSale) => {
  const errorResult = errorTreatment(productsSale);
  if (errorResult) return errorResult;
  if (await verifyId(productsSale)) {
    return { status: 404, response: { message: 'Product not found' } };
  }
  const newSale = await salesModel.registration(productsSale);
  return { status: 201, response: newSale };
 };

module.exports = {
  salesRegistration,
};
