const sinon = require('sinon');
const chai = require('chai');

const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/db/connection');
const productsMock = require('../mocks/products.mock');
const newProductReturn = require("../mocks/newProduct.mock");
const newProduct = { name: "produtoX" };

describe('teste da camada model', async () => {
  afterEach(() => {
    sinon.restore();
  });
  it('Encontra todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productModel.findAll();

    chai.expect(result).to.be.deep.equal(productsMock);
  });
  it('Encontra um produto de determinado "ID"', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await productModel.findId(1);

    chai.expect(result).to.be.deep.equal(productsMock[0]);
  });
  it('cadastra um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productModel.create(newProduct);

    chai.expect(result).to.be.deep.equal(newProductReturn);
  })
});