const express = require('express');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.findAllProducts);

app.get('/products/:id', productController.findProductsById);

app.post('/products', productController.createProduct);

app.put('/products/:id', productController.updateProduct);

app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.salesRegistration);

app.get('/sales', salesController.findAllSales);

app.get('/sales/:id', salesController.findSaleById);

module.exports = app;