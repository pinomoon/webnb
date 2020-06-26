var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const {configmail}= require('../servermail/configmail');
var transport=nodemailer.createTransport(configmail);

const crypto = require('crypto');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

/** login */
router.post('/',autenticazione);




async function autenticazione(req,res, next){

    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {

            results = await db.query('SELECT id_utente,email,tipo,nome,cognome,sesso,data_di_nascita,indirizzo,citta,cap,titolare_carta,numero_carta,scadenza,cvc \
            FROM utente,carta_credito \
            WHERE carta_credito.email=utente.email AND email = ?', [
                req.body.email
            ]).catch(err => {
                    throw err;
                });

            if(results[0].conferma_account==false){
                console.log('Email non confermata');
                res.send("2");
            }
            else {
                let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                pwdhash.update(req.body.password); // cifriamo la password
                let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale

                if (encpwd != results[0].password) {

                    console.log('Password errata!');
                    res.send("3");
                    next(createError(403, 'Password errata'));
                } else {

                    await db.query('UPDATE `utente` SET `autenticazione`=true WHERE `utente`.id_utente = ?', [
                    results[0].id_utente,
                ])
                    .catch(err => {
                        throw err;
                    });
                    console.log('Utente autenticato');
                    console.log(results);
                   // res.send("Utente autenticato");

                    console.log('Dati utente:');
                    console.log(results[0]);
                    let utente=['1',results[0]];
                    res.send(utente);
                }
            }
        });
    } catch (err) {
        console.log('Utente non trovato!');
        res.send("4");
        next(createError(500));
    }

}

/** recupero credenziali */
router.post('/recuperaCredenziali', recupero);
router.post('/nuoveCredenziali', nuovecredenziali);
async function recupero(req,res, next){

    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {

            results = await db.query('SELECT * FROM `utente`WHERE email = ?', [
                req.body.email
            ])
                .catch(err => {
                    throw err;
                });
                let time= Date.now().toString(16).toString('hex');
                let token=crypto.randomBytes(16).toString('hex')+time ;
    
                console.log(token);
    
                results = await db.query("UPDATE `utente` SET token=? WHERE `utente`.email=?",[token,
                    req.body.email])
                    .catch(err => {
                        throw err;
                    })
               
                    var mailOptions = {
                    from: 'webnb-service@libero.it',
                    to: req.body.email,
                    subject: 'Recupera le tue credenziali WeB&B',
                    text: 'Ciao ti abbiamo inviato il link per modificare le credenziali del tuo account WeB&B' +
                        '\nclicca sul link  :\n https://localhost:3000/recuperaCredenziali?token='+token+'\n' +
                        '\n Saluti,\n\n lo Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
           
            
        })
    }catch (err) {
        console.log('Utente non trovato!');
        res.send("Utente non trovato!");
        next(createError(500));
    }
}



async function nuovecredenziali(req,res, next){

    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {
            let pwdhash = crypto.createHash('sha512');
            pwdhash.update(req.body.password);
            let encpsw= pwdhash.digest('hex');


            results = await db.query("UPDATE `utente` SET password=? WHERE `utente`.token=?",
                [encpsw,token])
                .catch(err => {
                     throw err;
                    
                });
            res.send('Password aggiornata correttamente, effettua il login')
            })
        }catch(err){
            console.log('Recupero credenziali fallito, riprova');
            res.send('Recupero credenziali fallito, riprova');
            next(createError(500));
        }
    }

    /**logout */
    router.post('/logout',logout);

    async function logout(req,res, next){

        const db = await makeDb(config);
        let results = {};
        try {
    
            await withTransaction(db, async() => {
                
                results = await db.query("UPDATE `utente` SET autenticazione=false WHERE `utente`.id_utente=?",
                [req.body.id_utente])
                .catch(err => {
                 throw err;
                });
                res.send("10");
            })
        }catch(err){
            console.log('Logout fallito, riprova');
            res.send('Logout fallito,riprova');
            next(createError(500));
        }
    }







module.exports = router;