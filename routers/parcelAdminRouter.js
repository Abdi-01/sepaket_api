const express = require("express");
const { parcelAdminController } = require("../controllers");
const routers = express.Router();

routers.get("/get", parcelAdminController.getParcel);
routers.post("/add-parcel", parcelAdminController.addParcel);
module.exports = routers;
