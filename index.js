const express = require('express')
const cors = require('cors')

const PORT = 3300
const app = express()
const { userRouters } = require ('./routers')

app.use(cors()) // untuk memberikan hak akses
app.use(express.json()) // untuk membaca body dari front end
app.use('/user', userRouters)

app.listen(PORT, ()=> console.log('Api running :', PORT))
