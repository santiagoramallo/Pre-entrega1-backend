const express = require('express');
const PUERTO = 8080;
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
