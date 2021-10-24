const express = require("express");
const { transactionController } = require("../controllers");
const routers = express.Router();

routers.get("/get-trxparcel-date/:par", transactionController.getTrxParcelDate);
routers.get(
  "/get-trxproduct-date/:par",
  transactionController.getTrxProductDate
);
routers.get("/get-trxparcel", transactionController.getTrxParcel);
routers.get(
  "/get-trxprochart-date/:par",
  transactionController.getTrxProductChartDate
);
routers.get(
  "/get-trxparchart-date/:par",
  transactionController.getTrxParcelChartDate
);
routers.get("/get-trxparchart", transactionController.getTrxParcelChart);
routers.get("/get-profitloss", transactionController.getTrxProfLoss);
routers.get("/get-revenue-date/:par", transactionController.getRevenueDate);
routers.get("/get-revenue", transactionController.getRevenue);

routers.get("/get", transactionController.getTrx);
routers.get("/get-status", transactionController.getTrxStatus);
routers.get("/get-trxproducts", transactionController.getTrxProductsStock);
routers.get("/get-trxmanage/:par", transactionController.getTrxManage);
routers.get("/get-trxmanageall/:par", transactionController.getTrxManageAll);
routers.patch("/confirm-transaction/:id", transactionController.confirmTrx);
routers.patch("/reject-transaction/:id", transactionController.rejectTrx);

module.exports = routers;
