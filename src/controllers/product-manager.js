const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

//Array vacio.
  constructor(path) {
    this.products = [];
    this.path = path;
    this.initialize();
  }

  async initialize() {
    await this.loadProductsFromDisk();
  }

  async loadProductsFromDisk() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      ProductManager.ultId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    } catch (error) {
      this.products = [];
    }
  }

//Método.
  async addProduct(newObjects) {
    let { title, description, price, img, code, stock } = newObjects;

//Validamos todos los campos.
    if (![title, description, price, img, code, stock].every(Boolean)) {
      console.error("Todos los campos son obligatorios");
      return;
    }

//Validamos que el código sea único.
    if (this.products.some(item => item.code === code)) {
      console.error("El código debe ser único");
      return;
    }

//Creamos un nuevo objeto con todos estos datos.
    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock
    };

    this.products.push(newProduct);


//guardar el array

    await this.saveProduct();
    console.log("Producto agregado:", newProduct);
  }

getProducts() {
  console.log("getProducts:", this.products);
  return this.products;
}

  async getProductById(id) {
    try {
      const arrayProductos = await this.readProduct();
      const buscado = arrayProductos.find(item => item.id === id);

      if (!buscado) {objetos
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado:", buscado);
        return buscado;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async updateProduct(id, updatedProducts) {
    try {
      const arrayProducts = await this.readProduct();

      const index = arrayProducts.findIndex(item => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1, updatedProducts);
        await this.saveProduct(arrayProducts);
        console.log("Producto actualizado:", updatedProducts);
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readProduct();

      const index = arrayProducts.findIndex(item => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1);
        await this.saveProduct(arrayProducts);
        console.log("Producto eliminado satisfactoriamente");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }

  async readProduct() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProducts = JSON.parse(respuesta);
      return arrayProducts;
    } catch (error) {
      console.log("Error al leer un archivo", error);
    }
  }

  async saveProduct(arrayProducts = this.products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }
}

module.exports = ProductManager;