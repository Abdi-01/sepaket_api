const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getParcel: (req, res) => {
    let scriptQuery = "SELECT * FROM parcels";
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addParcel: (req, res) => {
    // let { parcel_name, harga_jual, id_cat, id_parcel, jml } = JSON.parse(
    //   req.body.data
    // );

    // let { photo_parcel } = req.files;

    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;
        let data = JSON.parse(req.body.data);
        data.image = filepath;
        photo_parcel = filepath;

        let { parcel_name, harga_jual, spek } = data;

        let addQuery = `insert into parcels (parcel_name, harga_jual, photo_parcel, category) values (${db.escape(
          parcel_name
        )}, ${db.escape(harga_jual)}, ${db.escape(
          photo_parcel
        )}, 'customized parcel');`;

        let addSpekQuery = `INSERT INTO spesifications (id_cat, id_parcel, jml) values ${spek.map(
          (val) =>
            `(${db.escape(val.id_cat)}, ${db.escape(
              val.id_parcel
            )}, ${db.escape(val.jml)})`
        )};`;
        db.query(addQuery, (err, result) => {
          if (err) {
            fs.unlinkSync("./public" + filepath);
            return res.status(500).send(err);
          }
          res.status(200).send({ message: "Parcel Berhasil ditambahkan!" });
        });
        db.query(addSpekQuery, (err, result) => {
          if (err) res.status(500).send(err);
          // res.status(200).send(result);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getParcelDetail: (req, res) => {
    let scriptQuery =
      "select parcels.id_parcel, parcels.parcel_name, parcels.harga_jual, parcels.photo_parcel, spesifications.id_spek, spesifications.id_cat, spesifications.jml from parcels left join spesifications on parcels.id_parcel=spesifications.id_parcel order by id_parcel;";

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteParcel: (req, res) => {
    let delParcelQuery = `Delete from parcels where id_parcel = ${db.escape(
      req.params.id_parcel
    )};`;
    let delSpekQuery = `Delete from spesifications where id_parcel = ${db.escape(
      req.params.id_parcel
    )};`;

    db.query(delParcelQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
    db.query(delSpekQuery, (err, results) => {
      if (err) res.status(500).send(err);
    });
  },

  editParcelwImage: (req, res) => {
    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;
        let data = JSON.parse(req.body.data);
        data.image = filepath;
        photo_parcel = filepath;

        // let updateData = [`photo_parcel = ${db.escape(photo_parcel)}`];
        // for (let prop in data) {
        //   updateData.push(`${prop} = ${db.escape(data[prop])}`);
        // }

        let { parcel_name, harga_jual } = data;

        let editQuery = `UPDATE parcels set parcel_name = ${db.escape(
          parcel_name
        )}, harga_jual=${db.escape(harga_jual)}, photo_parcel = ${db.escape(
          photo_parcel
        )} where id_parcel = ${db.escape(req.params.id_parcel)};`;

        db.query(editQuery, (err, result) => {
          if (err) {
            fs.unlinkSync("./public" + filepath);
            return res.status(500).send(err);
          }
          res.status(200).send({ message: "Parcel Berhasil diupdate!" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  editParcel: (req, res) => {
    let updateData = [];
    for (let prop in req.body) {
      updateData.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let editQuery = `UPDATE parcels set ${updateData} where id_parcel = ${db.escape(
      req.params.id_parcel
    )};`;
    db.query(editQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editSpek: (req, res) => {
    let { id_cat, jml } = req.body;
    let editQuery = `UPDATE spesifications set id_cat = ${db.escape(
      id_cat
    )}, jml = ${db.escape(jml)} where id_spek = ${db.escape(
      req.params.id_spek
    )};`;

    db.query(editQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
