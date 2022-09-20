const toCamel = require('camelize');
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
    `SELECT SP.sale_id, SP.product_id, SP.quantity, S.date
      FROM StoreManager.sales_products AS SP
      INNER JOIN StoreManager.sales AS S
      ON SP.sale_id = S.id`,
  );
  return toCamel(result);
};

const findId = async (id) => {
  const [result] = await connection.execute(
    `SELECT S.date, SP.product_id, SP.quantity
      FROM StoreManager.sales_products AS SP
      INNER JOIN StoreManager.sales AS S
      ON SP.sale_id = S.id WHERE S.id = ?`,
    [id],
  );
  return toCamel(result);
};

module.exports = {
  registration,
  findId,
  findAll,
};
