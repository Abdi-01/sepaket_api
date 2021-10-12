const { db } = require("../database");

module.exports = {
  getParcel: (req, res) => {
    let scriptQuery = "SELECT * FROM parcels";
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
