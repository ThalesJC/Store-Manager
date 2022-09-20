const sinon = require('sinon');
const chai = require('chai');

const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');
const productsMock = require('../mocks/products.mock');
const newProductMock = require('../mocks/newProduct.mock');
const newProduct = { name: "produtoX" };

describe('Teste da camada service de produtos', async () => {
  afterEach(async () => {
    sinon.restore();
  });

  it('Encontra todos os produtos', async () => {
    sinon.stub(productModel, 'findAll').resolves(productsMock);
    const result = await productService.findAllProducts();

    chai.expect(result).to.be.deep.equal(productsMock);
  });

  it('Encontra um produto com determinado "Id"', async () => {
    sinon.stub(productModel, 'findId').resolves([productsMock]);
    const result = await productService.findProductsById(3);

    chai.expect(result).to.be.deep.equal(productsMock[2]);
  });

  it('Cadastra um novo produto', async () => {
    sinon.stub(productModel, 'create').resolves([{ insertId: 4 }]);
    const result = await productService.createProduct(newProduct);
    console.log(result);

    chai.expect(result).to.be.deep.equal(newProductMock);
  });
});