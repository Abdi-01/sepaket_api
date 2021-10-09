const express = require('express')
const { parcelController } = require ('../controllers')
const routers = express.Router()

routers.get('/get', parcelController.getData)
routers.post('/add-parcel', parcelController.addData)
routers.patch('/edit-user/:id_parcel', parcelController.editData)
routers.delete('/delete-user/:id_parcel', parcelController.deleteData)

module.exports = routers
