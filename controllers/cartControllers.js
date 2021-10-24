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
      console.log(result)
    });
  },
  getDetail: (req, res) => {
    let scriptQuery = `select cart.id_user, cart.cart_date, cart.id_cart, cart.qty_parcel, parcels.parcel_name, parcels.harga_jual, parcels.photo_parcel from parcels join cart on cart.id_parcel = parcels.id_parcel where id_user= ${db.escape(req.query.userId)};`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
      console.log(result)
    });
  },
  addData: (req, res) => { 
    let { id_parcel, id_user, cart_date } = req.body;
    let scriptQuery = `insert into db_sepaket.cart value (null, ${db.escape(id_parcel)}, ${db.escape(id_user)},${db.escape(cart_date)});`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: "Menambah Cart Berhasil", hasil: result });
    });
  },
  detailData: (req, res) => { 
    let { id_cart, boxData } = req.body;
    let value = []
    boxData.forEach((val)=>{
      let idProduct = 0
      let qty =0
      idProduct = val.id_product 
      qty = val.qty
      value.push(`(${id_cart},${idProduct},${qty})`)
    })
    let valueText = value.join()
    let scriptQuery = `insert into db_sepaket.cart_detail value ${valueText};`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: "Menambah Cart Berhasil", hasil: result });
    });
  },
  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `UPDATE db_sepaket.users set ${dataUpdate} where id_user = ${req.params.id_user};`;

    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);

      db.query(
        `select * from db_sepaket.users where id_user = ${req.params.id_user};`,
        (err, hasil) => {
          if (err) res.status(500).send(err);
          res
            .status(200)
            .send({ message: "Edit Data user Berhasil", data: hasil });
        }
      );
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

        let sqlInsert = `UPDATE db_sepaket.users set photo_user = ${db.escape(
          filepath
        )} where id_user = ${req.params.id_user};`;
        console.log(
          `UPDATE db_sepaket.users set photo_user = ${db.escape(
            filepath
          )} where id_user = ${req.params.id_user};`
        );

        db.query(sqlInsert, (err, result) => {
          if (err) {
            res.status(500).send(err);
            console.log(err);
            fs.unlinkSync("./public" + filepath);
          }
          res.status(200).send({ message: "upload photo profile success" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deleteData: (req, res) => {
    let scriptQuery = `DELETE FROM db_sepaket.users where id_user = ${req.params.id_user};`;
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);

      db.query(`select * from db_sepaket.users;`, (err, hasil) => {
        if (err) res.status(500).send(err);
        res
          .status(200)
          .send({ message: "Edit Data user Berhasil", data: hasil });
      });
    });
  },
};