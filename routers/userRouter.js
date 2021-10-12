<<<<<<< HEAD
const express = require("express");
const { userController } = require("../controllers");
const routers = express.Router();

routers.get("/get", userController.getData);
routers.post("/add-user", userController.addData);
routers.patch("/edit-user/:id_user", userController.editData);
routers.delete("/delete-user/:id_user", userController.deleteData);
=======
const express = require('express')
const { userController } = require ('../controllers')
const { auth } = require('../helper/authToken')
const routers = express.Router()

routers.get('/get', userController.getData)
routers.post('/add-user', userController.addData)
routers.patch('/edit-user/:id_user', userController.editData)
routers.delete('/delete-user/:id_user', userController.deleteData)
routers.patch('/verified', auth ,userController.verification)
routers.post('/login', userController.loginData)
>>>>>>> 8e992670b975f77818ac8fd86f3e9f342ca1d059

module.exports = routers;
