var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

router.post('/',autenticazione);

async function autenticazione(req,res, next){

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


                //next(createError(404, 'Utente non trovato'));

            if(results[0].conferma_account==false){
                console.log('Email non confermata');
                res.send('Email non confermata');
            }
            else {
                let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                pwdhash.update(req.body.password); // cifriamo la password
                let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale

                if (encpwd != results[0].password) {

                    console.log('Password errata!');
                    res.send("Password errata!");
                    //next(createError(403, 'Password errata'));
                } else {
                    let id_utente = results[0].id_utente;
                    results = await db.query('UPDATE `utente` SET `autenticazione`=true WHERE `utente`.id_utente = ?', [
                    id_utente
                ])
                    .catch(err => {
                        throw err;
                    });
                    console.log('Utente autenticato');
                    console.log(results);
                    res.send("Utente autenticato");






                    console.log('Dati utente:');
                    console.log(results[0]);
                    res.render('profile', {
                        title: 'Profilo Utente',
                        profile: {
                            user: req.body.email,
                            data: results[0]
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.log('Utente non trovato!');
        res.send("Utente non trovato!");
        next(createError(500));
    }

}















module.exports = router;