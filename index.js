const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3300;
const app = express();
const {
  userRouters,
  productsRouter,
  categoryRouter,
  parcelRouters,
  parcelAdminRouter,
  transactionRouter,
} = require("./routers");

app.use(cors()); // untuk memberikan hak akses
app.use(express.json()); // untuk membaca body dari front end
app.use(bearerToken());

app.use(express.static("public"));

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/parcels-admin", parcelAdminRouter);
app.use("/transaction", transactionRouter);

app.use("/users", userRouters);
app.use("/parcels", parcelRouters);

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated mySQL with express</h4>");
});

app.listen(PORT, () => console.log("Api running :", PORT));
