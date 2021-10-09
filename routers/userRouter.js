const express = require('express')
const { userController } = require ('../controllers')
const routers = express.Router()

routers.get('/get', userController.getData)
routers.post('/add-user', userController.addData)
routers.patch('/edit-user/:id_user', userController.editData)
routers.delete('/delete-user/:id_user', userController.deleteData)

module.exports = routers
