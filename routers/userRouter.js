const express = require('express')
const { userController } = require ('../controllers')
const routers = express.Router()

routers.get('/get', userController.getData)
routers.post('/add-user', userController.addData)
routers.patch('/edit-user/:id', userController.editData)
routers.delete('/delete-user/:id', userController.deleteData)

module.exports = routers
