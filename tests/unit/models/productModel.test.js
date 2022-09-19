const sinon = require('sinon');
const chai = require('chai');

const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/db/connection');
const productsMock = require('../mocks/products.mock');

describe('teste da camada model', async () => {
  test('Encontra todos os produtos', async () => {
    sinon.stub(connection, "execute").resolves(productsMock);
    const result = await productModel.findAll();

    chai.expect(result).to.be.deep.equal(productsMock);
  });
  // test('Encontra um produto de determinado "ID"', async () => { });
});