const sinon = require('sinon');
const chai = require('chai');

const productController = require("../../../src/controllers/productController");
const productService = require("../../../src/services/productService");
const products = require("../mocks/products.mock");
const newProductReturn = require("../mocks/newProduct.mock");
const newProductError = require("../mocks/newProductError");
const newProduct = { name: "produtoX" };

describe('Teste da camada controller de produtos', async () => {
  afterEach(sinon.restore);

  it('Busca por todos os produtos', async () => {
    const req = {};
    const res = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.findAllProducts(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Busca um produto com um determinado "Id"', async () => {
    const req = { params: { id: 2 } };
    const res = {};
  
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "findProductsById").resolves(products[1]);

    await productController.findProductsById(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
    chai.expect(res.json.calledWith(products[1])).to.be.equal(true);
  });

  it('Não encontra um determinado "Id"', async () => {
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "findProductsById").resolves(undefined);

    await productController.findProductsById(req, res);

    chai.expect(res.status.calledWith(404)).to.be.equal(true);
    chai
      .expect(res.json.calledWith({ message: "Product not found" }))
      .to.be.equal(true);
  });

  it('Cadastra um novo produto', async () => {
    const req = { body: newProduct };
    const res = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "createProduct").resolves(newProductReturn);

    await productController.createProduct(req, res);

    chai.expect(res.status.calledWith(201)).to.be.equal(true);
    chai.expect(res.json.calledWith(newProductReturn)).to.be.equal(true);

  });

  it('nao consegue cadastrar um novo produto', async () => {
    const req = { body: newProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "createProduct").resolves(newProductError);

    await productController.createProduct(req, res);

    chai.expect(res.status.calledWith(404)).to.be.equal(true);
    chai.expect(res.json.calledWith({ message: newProductError.message })).to.be.equal(true);
  })
});