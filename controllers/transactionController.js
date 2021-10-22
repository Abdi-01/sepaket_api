const { db } = require("../database");

module.exports = {
  getTrxProfLoss: (req, res) => {
    let getQuery =
      'select transaction_detail.id_parcel, parcels.parcel_name, transactions.id_trx, parcels.harga_jual, sum(products.harga_beli) as totalModal from transactions inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx inner join parcels on transaction_detail.id_parcel = parcels.id_parcel inner join transaction_products on transaction_detail.id_trx_detail = transaction_products.id_trx_detail inner join products on transaction_products.id_product = products.id_product where status="paid" group by transaction_detail.id_parcel, transactions.id_trx;';
    console.log(getQuery);
    db.query(getQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getTrx: (req, res) => {
    let query = "select * from transactions";
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
