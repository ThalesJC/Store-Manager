const salesService = require('../services/salesService');

const salesRegistration = async (req, res, _next) => {
  const productsSale = req.body;
  const newSale = await salesService.salesRegistration(productsSale);
  return res.status(newSale.status).json(newSale.response);
};

const findAllSales = async (_req, res, _next) => {
  const sales = await salesService.findAllSales();
  res.status(sales.status).json(sales.response);
};

const findSaleById = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await salesService.findSaleById(id);
  res.status(sale.status).json(sale.response);
};

module.exports = {
  salesRegistration,
  findAllSales,
  findSaleById,
};
