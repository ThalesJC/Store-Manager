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

describe('Testa a camada services de vendas', async () => {
  afterEach(async () => {
    sinon.restore();
  });

  it('Registra uma nova venda', async () => {
    sinon.stub(salesModel, 'registration').resolves([{ insertId: 3 }]);
    const result = await salesService.salesRegistration(newSale);

    chai.expect(result).to.be.deep.equal(newSaleReturn);
  });

  it('Busca por todas as vendas', async () => {
    sinon.stub(salesModel, "findAll").resolves(sales);
    const { response } = await salesService.findAllSales();

    chai.expect(response).to.be.deep.equal(sales);
  });

  it('Busca por uma vendo com um determinado "Id"', async () => {
    sinon.stub(salesModel, "findId").resolves([sales]);
    const {response} = await salesService.findSaleById(3);

    chai.expect(response).to.have.length(2);
  });
});