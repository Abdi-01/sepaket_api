const { db } = require("../database");

module.exports = {
  getProductData: (req, res) => {
    // if(req.query.idproduct)
    let scriptQuery = "Select * from products;";

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  addProductData: (req, res) => {
    console.log(req.body);
    let { product_name, harga_beli, id_cat, stock, photo_product } = req.body;

    let insertQuery = `Insert into products (product_name, harga_beli, id_cat, stock, photo_product ) values (${db.escape(
      product_name
    )}, ${db.escape(harga_beli)}, ${db.escape(id_cat)}, ${db.escape(
      stock
    )}, ${db.escape(photo_product)});`;

    console.log(insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editProductData: (req, res) => {
    console.log(req.body);
    let productUpdate = [];
    for (let prop in req.body) {
      productUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    console.log(productUpdate);
    let updateQuery = `Update products set ${productUpdate} where id_product = ${db.escape(
      req.params.id
    )}`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteProductData: (req, res) => {
    let deleteQuery = `Delete from products where id_product = ${db.escape(
      req.params.id_product
    )}`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getAvgHargaBeli: (req, res) => {
    let scriptQuery =
      "select products.id_cat as value, categories.category_name as label, round(avg(harga_beli))  as rataRata from products inner join categories on products.id_cat = categories.id_cat group by products.id_cat;";

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getProductsStock: (req, res) => {
    let scriptQuery = "select id_product, product_name, stock from products;";

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  restockProducts: (req, res) => {
    let { stock } = req.body;

    let updateQuery = `Update products set stock = ${db.escape(
      stock
    )} where id_product = ${db.escape(req.params.id)}`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  revertProductsStockTransaction: (req, res) => {
    // let { id_trx, id_product, stock } = req.body;
    // console.log(req.body);
    let updateStock = req.body
      .map((val) => {
        return `when id_product = ${val.id_product} then stock + ${val.stock}`;
      })
      .reduce((x, y) => {
        return `${x}
    ${y}`;
      });
    let products = req.body
      .map((val) => {
        return val.id_product;
      })
      .reduce((x, y) => {
        return `${x}, ${y}`;
      });

    let query = `UPDATE products SET products.stock = (case ${updateStock} end) where products.id_product in (${products})`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
