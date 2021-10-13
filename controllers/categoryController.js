const { db } = require("../database");

module.exports = {
  getCategories: (req, res) => {
    let scriptQuery = "SELECT * FROM categories;";

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  addCategory: (req, res) => {
    let { category_name, description } = req.body;

    let insertQuery = `INSERT INTO categories (category_name, description) values (${db.escape(
      category_name
    )}, ${db.escape(description)})`;

    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
