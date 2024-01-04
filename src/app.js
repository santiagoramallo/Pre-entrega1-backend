const app = express();
const PUERTO = 8080;
const express = require('express');
app.use(express.json());
const ProductManager = require('./product-manager');
const productManager = new ProductManager('./src/productos.json');


app.get("/", (req, res) => {
    res.send('Pagina de Inicio');
  });

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);

    if (limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
});

app.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
