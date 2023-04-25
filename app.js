const http = require("http");
const express = require("express");
const app = express();
const PORT = 8080 || process.env.PORT;
const ProductManager = require("./productManager");
const { createFile, productsToSave } = require("./helpers");
const path = "./products.txt";
createFile(path);
const myProductManager = new ProductManager(path);
myProductManager.loadInitialProducts(productsToSave);

app.get("/", (req, res) => {
  res.send("<h1>Desafío 3 - Server NodeJS - Tutora: Laura Acuña</h1>");
});

/** GET ALL PRODUCTS */
app.get("/api/products", async (req, res) => {
  try {
    const products = await myProductManager.getProducts();
    const limit = req.query.limit;
    const isValidLimit = limit && !isNaN(limit) && limit > 0;
    products
      ? isValidLimit
        ? res.json(products.slice(0, limit))
        : res.json(products)
      : res.json({ error: "Sorry, no products found" });
  } catch (err) {
    console.log("getProducts", err);
  }
});

/** GET PRODUCT BY ID */
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const isValidId = id && !isNaN(id) && id > 0;
    if (!isValidId) {
      res.json({ error: "Sorry, invalid id" });
      return;
    }
    const product = await myProductManager.getProductById(req.params.id);
    product
      ? res.json(product)
      : res.json({ error: "Sorry, no product found by id: " + req.params.id });
  } catch (err) {
    console.log("getProductById", err);
  }
});

try {
  app.listen(PORT, () =>
    console.log(
      `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
    )
  );
} catch (error) {
  console.log("Error al iniciar servidor", error);
}

// resolver las promesas con then catch
// myProductManager
//   .getProducts()
//   .then((products) => console.log("getProducts", products))
//   .catch((err) => console.log("getProducts", err));

// myProductManager
//   .getProductById(1)
//   .then((product) => console.log("getProductById", product))
//   .catch((err) => console.log("getProductById", err));

// resolver las promesas con async await
// (async () => {
//   try {
//     const products = await myProductManager.getProducts();
//     console.log("getProducts", products);
//   } catch (err) {
//     console.log("getProducts", err);
//   }
// })();

// (async () => {
//   try {
//     const product = await myProductManager.getProductById(1);
//     console.log("getProductById", product);
//   } catch (err) {
//     console.log("getProductById", err);
//   }
// })();
