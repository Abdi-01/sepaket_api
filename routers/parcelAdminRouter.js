const express = require("express");
const { parcelAdminController } = require("../controllers");
const routers = express.Router();

routers.get("/get", parcelAdminController.getParcel);
module.exports = routers;
