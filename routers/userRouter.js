const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/get", userController.getData);
routers.post("/add-user", userController.addData);
routers.patch("/change-password/:id_user", userController.changePassword);
routers.patch("/reset-password/:email", userController.resetPassword);
routers.patch("/edit-user/:id_user", userController.editData);
routers.delete("/delete-user/:id_user", userController.deleteData);
routers.patch("/verified", auth, userController.verification);
routers.post("/login", userController.loginData);
routers.patch("/photo-profile/:id_user", userController.uploadFile);

module.exports = routers;
