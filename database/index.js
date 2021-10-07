const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kasino047314',
    database: 'db_sepaket',
    port: 3306,
    multipleStatements: true 
})

db.connect((err)=>{
    if(err){
        return console.error(`error : ${err.message}`)
    }
    console.log("alhamdulillah mySQL nyambung")
})

module.exports = {
    db
}