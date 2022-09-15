const salesService = require('../services/salesService');

const salesRegistration = async (req, res, _next) => {
  const productsSale = req.body;
  const newSale = await salesService.salesRegistration(productsSale);
  return res.status(newSale.status).json(newSale.response);
};

module.exports = {
  salesRegistration,
};
