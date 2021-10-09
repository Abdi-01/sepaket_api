const express = require("express");
const cors = require("cors");

const PORT = 3300;
const app = express();
const { userRouters, parcelRouters } = require("./routers");

app.use(cors()); // untuk memberikan hak akses
app.use(express.json()); // untuk membaca body dari front end
app.use("/users", userRouters);
app.use("/parcels", parcelRouters);

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated mySQL with express</h4>");
});

app.listen(PORT, () => console.log("Api running :", PORT));
