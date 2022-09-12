const productService = require('../services/productService');

const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
};

const findAllProducts = async (_req, res, _next) => {
  const products = await productService.findAllProducts();
  res.status(HTTP_STATUS.OK).json(products);
};

const findProductsById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await productService.findProductsById(id);
  if (!product) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Product not found' });
  res.status(HTTP_STATUS.OK).json(product);
};

module.exports = {
  findAllProducts,
  findProductsById,
};
