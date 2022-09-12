const Joi = require('joi');
const productModel = require('../models/productModel');

const productSchema = Joi.string().min(5).required();

const findAllProducts = async () => {
  const products = await productModel.findAll();
  return products;
};

const findProductsById = async (id) => {
  const product = await productModel.findId(id);
  return product;
};

const createProduct = async (product) => {
  const { error } = productSchema.validate(product.name);
  if (error) {
    if (error.message === '"value" length must be at least 5 characters long') {
      return {
        status: 422,
        message: error.message.replace('value', 'name'),
      };
    } return {
      status: 400,
      message: error.message.replace('value', 'name'),
    };
  }
  const newProduct = await productModel.create(product);
  return newProduct;
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
};