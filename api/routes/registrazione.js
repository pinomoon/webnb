var express = require('express');
var router = express.Router();
var createError= require('http-errors');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'webnbmail@gmail.com',
        pass: 'webnb2020'
    }
});

router.post('/',registrazione);



const crypto = require('crypto');
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");



async function registrazione(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {
            let pwdhash = crypto.createHash('sha512');
            pwdhash.update(req.body.password);
            let encpsw= pwdhash.digest('hex');

            results = await db.query('INSERT INTO `utente`(nome,cognome,tipo, data_di_nascita,indirizzo,sesso,password,email)'
       , [
                req.body.nome ,
                req.body.cognome,
                req.body.tipo,
                req.body.data_di_nascita,
                req.body.indirizzo,
                req.body.sesso ,
                encpsw,
                req.body.email
            ])
                .catch(err => {
                    throw err;
                });


            console.log(results);
            console.log(`Utente ${req.body.email} inserito!`);
            res.send('Registrazione effettuata ');

        });
    } catch (err) {
        console.log(err);
        res.send("E' già presente un account con questa email" +
            "Effettua l'accesso con questo indirizzo di posta elettronica o registrati con  un nuovo indirizzo ")
        next(createError(500));
    }
    var mailOptions = {
        from: 'webnbmail@gmail.com',
        to: req.body.email,
        subject: 'Conferma il tuo account WeB&B',
        text: 'Ciao baby sei bellissima!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(+
                "Ti abbiamo inviato una email di conferma al tuo indirizzo di posta elettronica, assicurati di confermare il tuo accout prima di effettuare l'accesso ")
        }
    });
}















module.exports = router;