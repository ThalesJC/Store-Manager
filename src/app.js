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

app.post('/sales', salesController.salesRegistration);

app.get('/sales', salesController.findAllSales);

app.get('/sales/:id', salesController.findSalesById);

// app.use((error, _req, res, _next) => {
//   if (error.status) return res.status(error.status).json({ message: error.message });
//   return res.status(500).json({ message: error.message });
// });

module.exports = app;