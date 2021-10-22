const express = require("express");
const { transactionController } = require("../controllers");
const routers = express.Router();

routers.get("/get-profitloss", transactionController.getTrxProfLoss);
routers.get("/get", transactionController.getTrx);

module.exports = routers;
