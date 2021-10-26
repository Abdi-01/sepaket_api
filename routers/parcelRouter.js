const express = require("express");
const { parcelController } = require("../controllers");
const routers = express.Router();

routers.get("/get", parcelController.getData);


module.exports = routers;
