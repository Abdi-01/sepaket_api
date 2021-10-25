const userRouters = require("./userRouter");
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRouter");
const parcelRouters = require("./parcelRouter");
const parcelAdminRouter = require("./parcelAdminRouter");
const transactionRouter = require("./transactionRouter");
const cartRouters = require("./cartRouter")
const userTransactionRouters = require("./userTransactionRouter")

module.exports = {
  userRouters,
  productsRouter,
  categoryRouter,
  parcelRouters,
  parcelAdminRouter,
  transactionRouter,
  cartRouters,
  userTransactionRouters
};
