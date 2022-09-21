const sinon = require("sinon");
const chai = require("chai");

const salesService = require("../../../src/services/salesService");
const salesModel = require("../../../src/models/salesModel");
const sales = require("../mocks/sales.mock");
const newSaleReturn = require("../mocks/newSale.mock");
const newSale = [
  {
    productId: 1,
    quantity: 3,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const noProductIdSale = [
  {
    quantity: 3,
  },
  {
    quantity: 5,
  },
];
const quantityError = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
  },
];

const productNotFound = [
  {
    productId: 99,
    quantity: 3,
  },
  {
    productId: 98,
    quantity: 5,
  },
];

describe("Testa a camada services de vendas", async () => {
  afterEach(sinon.restore);

  it("Registra uma nova venda", async () => {
    sinon.stub(salesModel, "registration").resolves(newSaleReturn);
    const result = await salesService.salesRegistration(newSale);

    chai.expect(result).to.be.deep.equal({
      status: 201,
      response: newSaleReturn,
    });
  });

  it("o 'productId' é obrigatorio", async () => {
    const result = await salesService.salesRegistration(noProductIdSale);

    chai
      .expect(result)
      .to.be.deep.equal({
        status: 400,
        response: { message: '"productId" is required' },
      });
  });

  it("o 'quantity' é obrigatorio", async () => {
    const result = await salesService.salesRegistration(quantityError);

    chai.expect(result).to.be.deep.equal({
      status: 422,
      response: { message: '"quantity" must be greater than or equal to 1' },
    });
  });

  it("Erro caso Id seja inexistente", async () => {
    const result = await salesService.salesRegistration(productNotFound);

    chai
      .expect(result)
      .to.be.deep.equal({
        status: 404,
        response: { message: "Product not found" },
      });
  });

  it("Busca por todas as vendas", async () => {
    sinon.stub(salesModel, "findAll").resolves(sales);
    const { response } = await salesService.findAllSales();

    chai.expect(response).to.be.deep.equal(sales);
  });

  it("Nao existem vendas", async () => {
    sinon.stub(salesModel, "findAll").resolves(undefined);
    const result = await salesService.findAllSales();

    chai
      .expect(result)
      .to.be.deep.equal({
        status: 404,
        response: { message: "Sale not found" },
      });
  });

  it('Busca por uma venda com um determinado "Id"', async () => {
    sinon.stub(salesModel, "findId").resolves([sales]);
    const { response } = await salesService.findSaleById(2);

    chai.expect(response).to.have.length(1);
  });

  it('Não é possivel encontrar uma venda com determinado Id', async () => {
    sinon.stub(salesModel, "findId").resolves([]);
    const result = await salesService.findSaleById(1);

    chai
      .expect(result)
      .to.be.deep.equal({
        status: 404,
        response: { message: "Sale not found" },
      });
  });
});