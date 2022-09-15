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

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );
  return result;
};

const findId = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  registration,
  findId,
  findAll,
};
