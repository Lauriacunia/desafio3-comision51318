const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async loadInitialProducts(products) {
    await this.write(products);
  }

  async getProducts() {
    return await this.read(this.file);
  }

  async getProductById(id) {
    let allProductsArray = await this.read(this.file);
    const product = allProductsArray.find((product) => product.id == id);
    return product;
  }

  async read() {
    let allProductsArray = [];
    try {
      let allProductsString = await fs.promises.readFile(this.path, "utf-8");
      allProductsString.length > 0
        ? (allProductsArray = JSON.parse(allProductsString))
        : (allProductsArray = []);
    } catch (err) {
      console.log("Error en la lectura del archivo", err);
    }
    return allProductsArray;
  }

  async write(allProductsArray) {
    let allProductsString = JSON.stringify(allProductsArray);
    try {
      await fs.promises.writeFile(this.path, allProductsString);
    } catch (err) {
      console.log("Error en la escritura", err);
    }
  }
}

module.exports = ProductManager;
