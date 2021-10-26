const express = require("express");
const { categoryController } = require("../controllers");
const routers = express.Router();

routers.get("/get", categoryController.getCategories);
routers.post("add-category", categoryController.addCategory);

module.exports = routers;
