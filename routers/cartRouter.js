const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get", cartController.getData);
routers.get("/get-detail", cartController.getDetail);
routers.post("/add-cart", cartController.addData);
routers.post("/detail-cart", cartController.detailData);
routers.patch("/edit-cart/:id_cart", cartController.editData);
routers.delete("/delete-cart/:id_cart", cartController.deleteData);
routers.patch("/bukti-transfer/:id_user", cartController.uploadFile);

module.exports = routers;
