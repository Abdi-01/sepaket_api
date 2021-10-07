const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  multipleStatements: true,
});

db.getConnection((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  }
  console.log("alhamdulillah mySQL nyambung");
});

module.exports = {
  db,
};
