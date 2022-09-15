const connection = require('../db/connection');

const registration = async (productsSale) => {
  const [resultSales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  productsSale.forEach(async (sale) => {
    await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [resultSales.insertId, sale.productId, sale.quantity],
    );
  });
  
  return {
    id: resultSales.insertId,
    itemsSold: productsSale,
  };
};

module.exports = {
  registration,
};
