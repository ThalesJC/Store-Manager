const sinon = require('sinon');
const chai = require('chai');

const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');
const productsMock = require('../mocks/products.mock');
const newProductMock = require('../mocks/newProduct.mock');
const newProduct = { name: "produtoX" };
const incorrectName = { name: "lala" };

describe('Teste da camada service de produtos', async () => {
  afterEach(sinon.restore);

  it('Encontra todos os produtos', async () => {
    sinon.stub(productModel, 'findAll').resolves(productsMock);
    const result = await productService.findAllProducts();

    chai.expect(result).to.be.deep.equal(productsMock);
  });

  it('Encontra um produto com determinado "Id"', async () => {
    sinon.stub(productModel, 'findId').resolves(productsMock[2]);
    const result = await productService.findProductsById(3);

    chai.expect(result).to.be.deep.equal(productsMock[2]);
  });

  it('Cadastra um novo produto', async () => {
    sinon.stub(productModel, "create").resolves(newProductMock);
    const result = await productService.createProduct(newProduct);

    chai.expect(result).to.be.deep.equal(newProductMock);
  });

  it('o novo produto precisa ter pelomenos 5 letras', async () => {
    const result = await productService.createProduct(incorrectName);

    chai.expect(result).to.be.deep.equal({
      status: 422,
      message: '"name" length must be at least 5 characters long',
    });
  });

  it("o nome do produto é obrigatorio", async () => {
    const result = await productService.createProduct({ });

    chai
      .expect(result)
      .to.be.deep.equal({ status: 400, message: '"name" is required' });
  });
});