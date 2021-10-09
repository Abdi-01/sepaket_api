const express = require("express");
const { productsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", productsController.getProductData);
routers.post("/add-product", productsController.addProductData);
routers.patch("/edit-product/:id", productsController.editProductData);
routers.delete(
  "/delete-product/:idproduct",
  productsController.deleteProductData
);
module.exports = routers;
