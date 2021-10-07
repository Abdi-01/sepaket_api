const { db } = require ('../database')


module.exports = {
    getData: (req,res)=>{
        let scriptQuery = 'select * from user;'
        if (req.query.nama){
            scriptQuery = `select * from user where nama = ${db.escape(req.query.nama)};`
        }
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
    },
    addData: (req,res)=>{
        let {nama, usia,email,berat, kota,tahun,posisi} = req.body
        let scriptQuery = `insert into user value (null,${db.escape(nama)},${db.escape(usia)},${db.escape(email)},${db.escape(berat)},${db.escape(kota)},${db.escape(tahun)},${db.escape(posisi)});`
    
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user where nama = ${db.escape(nama)};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Penambaham Kuser Berhasil", data: hasil})
            })
    
            // res.status(200).send(result)
        })
    },
    editData: (req,res)=>{

        let dataUpdate = []
        for (let prop in req.body){
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
    
        let updateQuery = `UPDATE user set ${dataUpdate} where no = ${req.params.id};`
    
        db.query(updateQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user where no = ${req.params.id};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data Kuser Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    },
    deleteData: (req,res)=>{
        let scriptQuery = `DELETE FROM user where no = ${req.params.id};`
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user;`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data Kuser Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    }
}