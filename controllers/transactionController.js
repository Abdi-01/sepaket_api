const { format } = require("mysql");
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

  getTrxParcel: (req, res) => {
    let query =
      'select date_format(transactions.trx_date, "%d-%m-%Y") as date , transaction_detail.id_parcel as id, parcels.parcel_name as name, transaction_detail.qty_parcel as qty from transactions inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx inner join parcels on transaction_detail.id_parcel = parcels.id_parcel where status="paid";';
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getTrxParcelChart: (req, res) => {
    let query =
      'select date_format(transactions.trx_date, "%d-%m-%Y") as date, sum(transaction_detail.qty_parcel) as qty from transactions inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx inner join parcels on transaction_detail.id_parcel = parcels.id_parcel where status="paid" group by date;';
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getTrxParcelDate: (req, res) => {
    let param = req.params.par.split(" ");

    let query = `select date_format(transactions.trx_date, "%d-%m-%Y") as date , transaction_detail.id_parcel as id, parcels.parcel_name as name, transaction_detail.qty_parcel as qty from transactions inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx inner join parcels on transaction_detail.id_parcel = parcels.id_parcel where status="paid" and trx_date between ${db.escape(
      param[0]
    )} and ${db.escape(param[1])};`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getTrxParcelChartDate: (req, res) => {
    let param = req.params.par.split(" ");

    let query = `select date_format(transactions.trx_date, "%d-%m-%Y") as date, sum(transaction_detail.qty_parcel) as qty from transactions inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx inner join parcels on transaction_detail.id_parcel = parcels.id_parcel where status="paid" and trx_date between ${db.escape(
      param[0]
    )} and ${db.escape(param[1])} group by date;`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getTrxProductDate: (req, res) => {
    let param = req.params.par.split(" ");

    let query = `select date_format(transactions.trx_date, '%d-%m-%Y') as date , transaction_products.id_product as id, products.product_name as name, transaction_products.qty_product as qty from transactions
    inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx
    inner join transaction_products on transaction_detail.id_trx_detail = transaction_products.id_trx_detail
    inner join products on transaction_products.id_product = products.id_product
    where status="paid" and trx_date between ${db.escape(
      param[0]
    )} and ${db.escape(param[1])};`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getTrxProductChartDate: (req, res) => {
    let param = req.params.par.split(" ");

    let query = `select date_format(transactions.trx_date, '%d-%m-%Y') as date, sum(transaction_products.qty_product) as qty from transactions
    inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx
    inner join transaction_products on transaction_detail.id_trx_detail = transaction_products.id_trx_detail
    inner join products on transaction_products.id_product = products.id_product
    where status="paid" and trx_date between ${db.escape(
      param[0]
    )} and ${db.escape(param[1])} group by date;`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getRevenue: (req, res) => {
    let query = `select transactions.id_trx as id, date_format(transactions.trx_date, '%d-%m-%Y') as date, transactions.total_trx as pendapatan, sum(products.harga_beli) as totalModal from transactions
    inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx
    inner join transaction_products on transaction_detail.id_trx_detail = transaction_products.id_trx_detail
    inner join products on transaction_products.id_product = products.id_product
    where status="paid" group by transactions.id_trx;`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getRevenueDate: (req, res) => {
    let param = req.params.par.split(" ");

    let query = `select transactions.id_trx as id, date_format(transactions.trx_date, '%d-%m-%Y') as date, transactions.total_trx as pendapatan, sum(products.harga_beli) as totalModal from transactions
    inner join transaction_detail on transactions.id_trx = transaction_detail.id_trx
    inner join transaction_products on transaction_detail.id_trx_detail = transaction_products.id_trx_detail
    inner join products on transaction_products.id_product = products.id_product
    where status="paid" and trx_date between ${db.escape(
      param[0]
    )} and ${db.escape(param[1])} group by transactions.id_trx;`;
    db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
