const { db } = require('../database')
const { createToken } = require('../helper/createToken')
const Crypto = require('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
  getData: (req, res) => {
    let scriptQuery = 'select * from db_sepaket.users;'
    if (req.query.username) {
      scriptQuery = `select * from db_sepaket.users where username = ${db.escape(req.query.username)};`
    } else if (req.query.email) {
      scriptQuery = `select * from db_sepaket.users where email = ${db.escape(req.query.email)};`
    }
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err)
      res.status(200).send(result)
    })
  },
  loginData: (req, res) => {
    let password = Crypto.createHmac("sha1", "hash123").update(req.body.password).digest("hex")

    let scriptQuery = `select * from db_sepaket.users where email = ${db.escape(req.body.email)} and password = '${password}';`
    console.log(`select * from db_sepaket.users where email = ${db.escape(req.body.email)} and password = '${password}';`)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err)
      if (result[0]) {
        let { id_user, username, email, password, role, status } = result[0]
        let token = createToken({ id_user, username, email, password, role, status })
        if (result[0].status !== "verified") {
          console.log("gagal belum verified")
          res.status(200).send({ message: "Your account not yet verified, Please check your email" })
        }
        else {
          res.status(200).send({ dataLogin: result[0], token, message: "Login Success" })
          console.log(result[0].id_user)
        }
      } else {
        let scriptQuery2 = `select * from db_sepaket.users where username = ${db.escape(req.body.email)} and password = '${password}';`
        console.log(`select * from db_sepaket.users where username = ${db.escape(req.body.email)} and password = '${password}';`)
    
        db.query(scriptQuery2, (err2, result2) => {
          if (err2) res.status(500).send(err2)
          if (result2[0]) {
            console.log("oke")
            let { id_user, username, email, password, role, status } = result2[0]
            let token = createToken({ id_user, username, email, password, role, status })
            if (result2[0].status !== "verified"){
              console.log("gagal belum verified")
              res.status(200).send({ message: "Your account not yet verified, Please check your email" })
            }
            else {
              res.status(200).send({ dataLogin: result2[0], token, message: "Login Success" })
              console.log(result2[0].id_user)
            }
          } else{res.status(200).send({message: "Failed to Login, Try Again"})}
        })
      }
    })
    
  },
  addData: (req, res) => {
    let { username, fullname, email, password } = req.body
    password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
    console.log(password)

    let scriptQuery = `insert into db_sepaket.users value (null, ${db.escape(username)}, ${db.escape(fullname)},${db.escape(email)},${db.escape(password)},null,null,null,null,null,'user','unverified');`
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err)

      if (result.insertId) {
        let sqlGet = `select * from db_sepaket.users where id_user = ${result.insertId};`
        db.query(sqlGet, (err2, result2) => {
          if (err2) res.status(500).send(err2)
          console.log(result2)
          let { id_user, username, email, role, status } = result2[0]
          let token = createToken({ id_user, username, email, role, status })
          let mail = {
            from: 'Admin SEPAKET <sepaket.help@gmail.com>',
            to: `${email}`,
            subject: 'Account Verification',
            html: `<a href='http://localhost:3000/auth/${token}'>Click Here for Verification your account </a>`
          }
          console.log(mail)
          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) res.status(500).send({ message: "Registration Failed", success: false, err: errMail })
            res.status(200).send(result2)
          })
        })
      }
    })
  },
  verification: (req, res) => {
    let verificationQuery = `UPDATE db_sepaket.users set status='verified' where id_user = ${req.user.id_user};`
    db.query(verificationQuery, (err, result) => {
      if (err) res.status(500).send(err)
      res.status(200).send({ message: "Verified Account", success: true })
    })
  },
  changePassword: (req, res) => {
    let { oldPassword, newPassword } = req.body
    oldPassword = Crypto.createHmac("sha1", "hash123").update(oldPassword).digest("hex").toString()
    newPassword = Crypto.createHmac("sha1", "hash123").update(newPassword).digest("hex")
    
    let scriptQuery = `select * from db_sepaket.users where id_user = ${req.params.id_user};`
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err)

      if(result[0].password == oldPassword) {
        let updateQuery = `UPDATE db_sepaket.users set password='${newPassword}' where password = '${oldPassword}';`;
    
        db.query(updateQuery, (err, result2) => {
          if (err) {res.status(500).send(err)}
          res.status(200).send({message: "Password Updated"})
          }) 
      } else res.status(200).send({message: "Wrong Old Password"}) 
    })
  },
  resetPassword: (req, res) => {
    let {password } = req.body
    password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
    console.log(password)

    let updateQuery = `UPDATE db_sepaket.users set password='${password}' where email = '${req.params.email}';`;
    console.log(updateQuery)

    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);

      let mail = {
        from: 'Admin SEPAKET <sepaket.help@gmail.com>',
        to: `${req.params.email}`,
        subject: 'Reset Email',
        html: `<h3>here your new password => ${req.body.password} </h3>`
      }
      console.log(mail)
      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) res.status(500).send({ message: "Registration Failed", success: false, err: errMail })
        res.status(200).send(result)
      }) 
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
