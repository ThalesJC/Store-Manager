const sinon = require("sinon");
const chai = require("chai");

const salesController = require("../../../src/controllers/salesController");

describe('Teste da camada controller de vendas', async () => {
  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  after(async () => {
    sinon.restore();
  });

  it('Registra uma nova venda', async () => {
    await salesController.salesRegistration(req, res);

    chai.expect(res.status.calledWith(201)).to.be.equal(true);
  });

  it('Busca por todas as vendas', async () => {
    await salesController.findAllSales(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Busca por uma venda com um determinado "Id"', async () => {
    await salesController.findSaleById(req, res);

    chai.expect(res.status.calledWith(200)).to.be.equal(true);
  });
});