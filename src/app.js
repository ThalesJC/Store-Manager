const express = require('express');
const productControler = require('./controllers/productController');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productControler.findAllProducts);

app.get('/products/:id', productControler.findProductsById);

// app.use((error, _req, res, _next) => {
//   if (error.status) return res.status(error.status).json({ message: error.message });
//   return res.status(500).json({ message: error.message });
// });

module.exports = app;