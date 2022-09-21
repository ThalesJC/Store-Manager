const sinon = require("sinon");
const chai = require("chai");

const salesController = require("../../../src/controllers/salesController");
const salesService = require("../../../src/services/salesService");
const newSaleBody = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

describe('Teste da camada controller de vendas', async () => {
  afterEach(sinon.restore);

  it('Registra uma nova venda', async () => {
    const req = { body: newSaleBody };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.salesRegistration(req, res);

    chai.expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('Busca por todas as vendas', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await salesController.findAllSales(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Busca por uma venda com um determinado "Id"', async () => {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.findSaleById(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });
});