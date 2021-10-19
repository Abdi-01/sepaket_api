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
};
