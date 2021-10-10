const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sepaket.help@gmail.com',
        pass: 'axhvhgltrwovxkoy'
    },
    tls:{
        rejectUnauthorized: false
    }
})

module.exports = transporter