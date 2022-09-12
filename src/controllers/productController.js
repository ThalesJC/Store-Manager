const productService = require('../services/productService');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
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

const createProduct = async (req, res, _next) => {
  const product = req.body;
  const newProduct = await productService.createProduct(product);
  if (newProduct.status) {
    return res.status(newProduct.status).json({ message: newProduct.message });
  }
  return res.status(HTTP_STATUS.CREATED).json(newProduct);
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
};
