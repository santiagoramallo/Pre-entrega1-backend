const express = require('express');
const PUERTO = 8080;
const app = express();
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const fs = require('fs');

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");



//Rutas
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/", viewsRouter);

//Motor de plantillas:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("./src/public"));



app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
