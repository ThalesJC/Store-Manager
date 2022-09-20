const sinon = require('sinon');
const chai = require('chai');

const productController = require("../../../src/controllers/productController");
// const productService = require("../../../src/services/productService");
// const products = require("../mocks/products.mock");

describe('Teste da camada controller de produtos', async () => {
  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  after(async () => {
    sinon.restore();
  });

  it('Busca por todos os produtos', async () => {
    await productController.findAllProducts(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Busca um produto com um determinado "Id"', async () => {
    await productController.findProductsById(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Cadastra um novo produto', async () => {
    await productController.createProduct(req, res);

    chai.expect(res.status.calledWith(201)).to.be.equal(true);
  });
});