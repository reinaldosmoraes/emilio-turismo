const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = "<h3>Contato</h3><ul><li>Nome: " + 
                        req.body.name + 
                        "</li><li>Email: " + 
                        req.body.email + 
                        "</li><li>Data de partida: " + 
                        req.body.departureDate +
                        "</li></ul><h3>Mensagem</h3><p>" +
                        req.body.message + 
                        "</p>"

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: 'reinaldodevtest@gmail.com',
                pass: '01020321'
            }
        });
        
        let mailOptions = {
            from: 'test@testaccount.com',
            to: 'reinaldodevtest@gmail.com',
            replyTo: 'test@testaccount.com',
            subject: 'Nova Mensagem',
            text: req.body.message + 'nome: ' + req.body.name,
            html: htmlEmail
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Mensagem enviada: %s', info.message)
            console.log('URL da mensagem: %s', nodemailer.getTestMessageUrl(info))
        })
        
    })
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})