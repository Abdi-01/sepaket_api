const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "select * from db_sepaket.parcels;";
    if (req.query.id_parcel) {
      scriptQuery = `select * from db_sepaket.parcels where id_parcel = ${db.escape(
        req.query.id_parcel
      )};`;
    } else if (req.query.parcel_name) {
      scriptQuery = `select * from db_sepaket.users where parcel_name = ${db.escape(
        req.query.parcel_name
      )};`;
    }
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
};
