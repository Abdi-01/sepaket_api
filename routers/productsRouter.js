const express = require("express");
const { productsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", productsController.getProductData);
routers.get("/get-avg", productsController.getAvgHargaBeli);
routers.get("/get-stock", productsController.getProductsStock);
routers.post("/add-product", productsController.addProductData);
routers.patch("/edit-product/:id", productsController.editProductData);
routers.patch("/edit-stock/:id", productsController.restockProducts);
routers.delete(
  "/delete-product/:id_product",
  productsController.deleteProductData
);
module.exports = routers;
