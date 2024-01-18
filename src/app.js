const express = require('express');
const PUERTO = 8080;
const app = express();
const viewsRouter = require("./routes/views.router.js");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
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

//Array productos:
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");


const io = socket(server);

//Obtengo el array:
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

//Enviamos el array de productos al cliente que se conectó:
    socket.emit("productos", await productManager.getProducts());

//Recibimos el evento "eliminarProducto" desde el cliente:
    socket.on("eliminarProducto", async (id) => {
      await productManager.deleteProduct(id);

//Enviamos el array de productos actualizado a todos los productos:
      io.sockets.emit("productos", await productManager.getProducts());
  });


//Recibimos el evento "agregarProducto" desde el cliente:
  socket.on("agregarProducto", async (producto) => {
    await productManager.addProduct(producto);

//Enviamos el array de productos actualizado a todos los productos:
    io.sockets.emit("productos", await productManager.getProducts());
});
});