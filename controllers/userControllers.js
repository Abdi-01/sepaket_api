const { db } = require ('../database')


module.exports = {
    getData: (req,res)=>{
        let scriptQuery = 'select * from user;'
        if (req.query.username){
            scriptQuery = `select * from user where username = ${db.escape(req.query.username)};`
        }
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            res.status(200).send(result)
        })
    },
    addData: (req,res)=>{
        let {fullname, username, email, password} = req.body
        let scriptQuery = `insert into user value (null,${db.escape(fullname)},${db.escape(username)},${db.escape(email)},${db.escape(password)},null,null,null,null,null,'user');`
    
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user where username = ${db.escape(username)};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Penambaham user Berhasil", data: hasil})
            })
    
            // res.status(200).send(result)
        })
    },
    editData: (req,res)=>{

        let dataUpdate = []
        for (let prop in req.body){
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }
    
        let updateQuery = `UPDATE user set ${dataUpdate} where id = ${req.params.id};`
    
        db.query(updateQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user where id = ${req.params.id};`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data user Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    },
    deleteData: (req,res)=>{
        let scriptQuery = `DELETE FROM user where id = ${req.params.id};`
        db.query(scriptQuery, (err, result)=>{
            if(err) res.status(500).send(err)
            
            db.query(`select * from user;`,(err,hasil)=>{
                if(err) res.status(500).send(err)
                res.status(200).send({message: "Edit Data user Berhasil", data: hasil})
            })
            
            // res.status(200).send(result)
        })
    }
}