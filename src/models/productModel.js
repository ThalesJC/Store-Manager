const connection = require('../db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const findId = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const create = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return {
    id: result.insertId,
    name,
  };
};

const update = async (name, id) => {
  const product = await findId(id);
  if (!product) {
    return { status: 404, message: 'Product not found' };
  }
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ? WHERE id = ?`,
    [name, id],
  );
  return {
    id: result.insertId,
    name,
  };
};

const delet3 = async (id) => {
  await connection.execute(`
  DELETE FROM StoreManager.products
  WHERE id = ?
  `, [id]);
};

module.exports = {
  findAll,
  findId,
  create,
  update,
  delet3,
};
