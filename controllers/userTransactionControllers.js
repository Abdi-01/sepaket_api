const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `select cart.id_user, cart.cart_date, cart.id_cart, cart.qty_parcel, parcels.parcel_name, parcels.harga_jual, parcels.photo_parcel from parcels join cart on cart.id_parcel = parcels.id_parcel where id_user= ${db.escape(req.query.userId)};`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  getDetail: (req, res) => {
    let scriptQuery = `select parcels.parcel_name, products.product_name, products.stock, cart_detail.qty_product, products.harga_beli, products.photo_product from parcels join cart join cart_detail join products on cart.id_parcel = parcels.id_parcel and cart.id_cart = cart_detail.id_cart and cart_detail.id_product = products.id_product where id_user= ${db.escape(req.query.userId)};`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  addData: (req, res) => { 
    let { cart_date, total_trx, id_user, address } = req.body;
    let scriptQuery = `insert into db_sepaket.transactions value (null, ${db.escape(cart_date)}, ${db.escape(total_trx)}, ${db.escape(id_user)}, ${db.escape(address)}, null, null, 'unpaid');`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: "Berhasil menambah data transaction", hasil: result });
    });
  },
  detailData: (req, res) => { 
    let { id_trx, cartList, detailItem  } = req.body;
    cartList.forEach((val)=>{
      let value = []
      let idParcel = 0
      let qty =0
      idParcel = val.id_parcel 
      qty = val.qty_parcel
      value.push(`(null,${id_trx},${idParcel},${qty})`)
      let valueText = value.join()
      let scriptQuery = `insert into db_sepaket.transaction_detail value ${valueText};`;
      console.log("transaction detail tabel2",scriptQuery)
  
      db.query(scriptQuery, (err, result1) => {
        if (err) res.status(500).send(err);
        
        let value2 = []
        detailItem.forEach((val)=>{
          if(idParcel===val.id_parcel){
            let idProduct = 0
            let qty2 =0
            idProduct = val.id_product
            qty2 = val.qty_product
            value2.push(`(null,${result1.insertId},${idProduct},${qty2})`)
          }
        })
        let valueText2 = value2.join()
        let scriptQuery2 = `insert into db_sepaket.transaction_products value ${valueText2};`;
        console.log("transaction product tabel3",scriptQuery2)
    
        db.query(scriptQuery2, (err, result2) => {
          if (err) res.status(500).send(err);
        });
      });
    })
    res.status(200).send({ message: "Complete transaction Berhasil"});
  },
  
  editData: (req, res) => {
    let { qty_parcel } = req.body;

    let updateQuery = `UPDATE db_sepaket.cart set qty_parcel=${qty_parcel} where id_cart = ${req.params.id_cart};`;

    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);

      res.status(200).send({ message: "Berhasil Mengedit Cart", hasil: result });
    });
  },
  uploadFile: (req, res) => {
    console.log("uploadFile Jalan");

    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        console.log(file);
        const filepath = file ? path + "/" + file[0].filename : null;
        console.log(filepath);
        // let data = JSON.parse(req.body.data)
        // data.image = filepath

        let sqlInsert = `UPDATE db_sepaket.transactions set transfer_receipt = ${db.escape(filepath)}, status= 'paid' where id_trx = ${req.params.id_trx};`;

        db.query(sqlInsert, (err, result) => {
          if (err) {
            res.status(500).send(err);
            console.log(err);
            fs.unlinkSync("./public" + filepath);
          }

          res.status(200).send({ message: "upload bukti transfer success" });

        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteData: (req, res) => {
    let scriptQuery = `DELETE FROM db_sepaket.cart where id_cart = ${req.params.id_cart};`;
    console.log(scriptQuery)
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);

      db.query(`DELETE FROM db_sepaket.cart_detail where id_cart = ${req.params.id_cart};`, (err, result) => {
        if (err) res.status(500).send(err);

        db.query(`select * from db_sepaket.users;`, (err, hasil) => {
          if (err) res.status(500).send(err);
          res
            .status(200)
            .send({ message: "Berhasil menghapus Cart", data: hasil });
        });
      })
    });
  },
};
