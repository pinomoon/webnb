var express = require('express');
var router = express.Router();
var createError= require('http-errors');
var nodemailer = require('nodemailer');
const {configmail}= require('../servermail/configmail');





 var transport=nodemailer.createTransport(configmail);

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

            results = await db.query("INSERT INTO utente (nome,cognome,tipo,data_di_nascita,indirizzo,sesso,password,email,citta,cap) VALUES ?"
       , [
           [
           [
                req.body.nome,
                req.body.cognome,
                req.body.tipo,
                req.body.data_di_nascita,
                req.body.indirizzo,
                req.body.sesso,
                encpsw,
                req.body.email,
                req.body.citta,
                req.body.cap
                    ]
           ]
            ]).catch(()=>{


                throw res.send("1");
            });


            let email=req.body.email;
            results= await db.query("INSERT INTO carta_credito (titolare_carta,numero_carta,scadenza,cvc,email) VALUES ?",
                [
                    [
                        [
                    req.body.titolare_carta,
                    req.body.numero_carta,
                    req.body.scadenza,
                    req.body.cvc,
                    email
                ]
                    ]
                ])
                .catch(err => {
                    res.send('inserimento carta fallito ');
                    throw err;
                });


            console.log(results);
            console.log(`Utente ${req.body.email} inserito!`);
            res.send("2");



            let time= Date.now().toString(16).toString('hex');
            let token=crypto.randomBytes(16).toString('hex')+time ;

            console.log(token);

            results = await db.query("UPDATE `utente` SET token=? WHERE `utente`.email=?",[token,
                email])
                .catch(err => {
                    throw err;
                })

            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:email,
                subject: 'Conferma il tuo account WeB&B',
                text: 'Ciao '+req.body.nome+',\n'+'\nTi abbiamo inviato il link di conferma del tuo account WeB&B' +
                    '\nclicca sul link per confermare :\n https://localhost:3000/accountConferma?token='+token+'\n' +
                    '\n Saluti,\n\n Staff WeB&B.'

            };
            transport.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {


                    console.log('Email sent: ' + info.response);
                }

            });

        });
    } catch (err) {
        console.log(err);
        res.send("Registrazione fallita");
        next(createError(500));
    }
}

















module.exports = router;