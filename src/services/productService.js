// const joi = require('joi');
const productModel = require('../models/productModel');

const findAllProducts = async () => {
  const products = await productModel.findAll();
  return products;
};

const findProductsById = async (id) => {
  const product = await productModel.findId(id);
  return product;
};

module.exports = {
  findAllProducts,
  findProductsById,
};