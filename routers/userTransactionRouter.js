const express = require("express");
const { userTransactionController } = require("../controllers");
const routers = express.Router();

routers.get("/get", userTransactionController.getData);
routers.get("/get-detail", userTransactionController.getDetail);
routers.post("/add-transaction", userTransactionController.addData);
routers.post("/detail-transaction", userTransactionController.detailData);
routers.patch("/edit-cart/:id_cart", userTransactionController.editData);
routers.delete("/delete-cart/:id_cart", userTransactionController.deleteData);
routers.patch("/bukti-transfer/:id_user", userTransactionController.uploadFile);

module.exports = routers;
