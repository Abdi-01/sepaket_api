const { db } = require ('../database')


module.exports = {
    getData: (req,res)=>{
        let scriptQuery = 'select * from db_sepaket.parcels;'
        if (req.query.id_parcel){
            scriptQuery = `select * from db_sepaket.parcels where id_parcel = ${db.escape(req.query.id_parcel)};`
        }else if (req.query.parcel_name){
            scriptQuery = `select * from db_sepaket.users where parcel_name = ${db.escape(req.query.parcel_name)};`
        }
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
    },
    addData: (req,res)=>{
        let {username, fullname, email, password} = req.body
        let scriptQuery = `insert into db_sepaket.users value (null, ${db.escape(username)}, ${db.escape(fullname)},${db.escape(email)},${db.escape(password)},null,null,null,null,null,'user');`
    
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from db_sepaket.users where username = ${db.escape(username)};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send(hasil)
            })
    
            // res.status(200).send(result)
        })
    },
    editData: (req,res)=>{

        let dataUpdate = []
        for (let prop in req.body){
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
    
        let updateQuery = `UPDATE db_sepaket.users set ${dataUpdate} where id_user = ${req.params.id_user};`
    
        db.query(updateQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from db_sepaket.users where id_user = ${req.params.id_user};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data user Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    },
    deleteData: (req,res)=>{
        let scriptQuery = `DELETE FROM db_sepaket.users where id_user = ${req.params.id_user};`
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from db_sepaket.users;`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data user Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    }
}