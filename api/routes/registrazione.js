var express = require('express');
var router = express.Router();
var createError= require('http-errors');
var nodemailer = require('nodemailer');


 var transport=nodemailer.createTransport({

    host:'smtp.libero.it',
     port:587,
     secure: false,
    auth:{
        user: 'webnb-service@libero.it',
        pass: 'webnb2020'
    },
    tls:{
        rejectUnauthorized: false
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
            ]).catch(err=>{
                res.send("E' già presente un account con questa email\n" +
                   "Effettua l'accesso con questo indirizzo di posta elettronica \nse lo hai confermato\n oppure clicca qui per ricevere la email di conferma\n o registrati con una nuova email ");

                throw err;
            });


            let email=req.body.email;
            results= await db.query("INSERT INTO carta_credito (numero_carta,scadenza,cvc,email) VALUES ?",
                [
                    [
                        [
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
            res.send("Registrazione Effettuata con successo!\n"+
                "Ti abbiamo inviato una email di conferma al tuo indirizzo: "+req.body.email +" di posta elettronica, assicurati di confermare il tuo accout prima di effettuare l'accesso ");



            let time= Date.now().toString(16).toString('hex');
            let token=crypto.randomBytes(16).toString('hex')+time ;

            console.log(token);

            results = await db.query("UPDATE `utente` SET token=? WHERE `utente`.email=?",[token,
                email])
                .catch(err => {
                    throw err;
                })
            var mailOptions = {
                from: 'webnb-service@libero.it',
                to:email,
                subject: 'Conferma il tuo account WeB&B',
                text: 'Ciao '+req.body.nome+',\n'+'\nTi abbiamo inviato il link di conferma del tuo account WeB&B' +
                    '\nclicca sul link per confermare :\n https://localhost:9000/accountConferma?token='+token+'\n' +
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