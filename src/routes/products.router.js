const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");


//rutas:

router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit);

    if (limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
});


router.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El Producto no se encuentra' });
  }
});


router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  res.json(product);
});


router.post('/', async (req, res) => {
  const { title, description, price,category, thumbnail, code, stock } = req.body;
  await productManager.addProduct({ title, description,category, price, thumbnail, code, stock });
  res.json({ message: 'Producto agregado con éxito al carrito' });
});


router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid)
  
  const updatedProduct = req.body;
  await productManager.updateProduct(productId, updatedProduct);
  res.json({ message: 'Producto actualizado' });
});


router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  await productManager.deleteProduct(productId);
  res.json({ message: 'Producto eliminado' });
  
  const products = await productManager.getProducts();
  res.send(products);
});

module.exports = router;