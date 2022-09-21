const sinon = require("sinon");
const chai = require("chai");

const salesModel = require("../../../src/models/salesModel");
const connection = require("../../../src/db/connection");
const sales = require("../mocks/newSale.mock");
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

describe('Teste da camada model de vendas', async () => {
  afterEach(sinon.restore);

  it('Registra uma nova venda', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.registration(newSale);

    chai.expect(result).to.be.deep.equal(newSaleReturn);
  });

  it('Encontra por todas as vendas registradas', async () => {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.findAll();

    chai.expect(result).to.be.deep.equal(sales);
  });

  it('Encontra uma venda com determinado "Id"', async () => {
    sinon.stub(connection, 'execute').resolves([[sales]]);
    const result = await salesModel.findId(2);

    chai.expect(result).to.have.length(1);
  });
});