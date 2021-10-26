const userController = require("./userControllers");
const productsController = require("./productsController");
const categoryController = require("./categoryController");
const parcelController = require("./parcelControllers");
const parcelAdminController = require("./parcelAdminController");
const transactionController = require("./transactionController");
const cartController = require("./cartControllers")
const userTransactionController = require("./userTransactionControllers")

module.exports = {
  userController,
  productsController,
  categoryController,
  parcelController,
  parcelAdminController,
  transactionController,
  cartController,
  userTransactionController
};
