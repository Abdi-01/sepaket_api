const express = require("express");
const { parcelAdminController } = require("../controllers");
const routers = express.Router();

routers.get("/get", parcelAdminController.getParcel);
routers.get("/get-parcel-detail", parcelAdminController.getParcelDetail);
routers.post("/add-parcel", parcelAdminController.addParcel);
routers.delete("/delete-parcel/:id_parcel", parcelAdminController.deleteParcel);
routers.patch(
  "/edit-parcelwi/:id_parcel",
  parcelAdminController.editParcelwImage
);
routers.patch("/edit-parcel/:id_parcel", parcelAdminController.editParcel);
routers.patch("/edit-spek/:id_spek", parcelAdminController.editSpek);
module.exports = routers;
