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

            if (results.affectedRows == 0) {
                console.log('Utente non trovato!');
                next(createError(404, 'Utente non trovato'));
            } else {
                let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                pwdhash.update(req.body.password); // cifriamo la password
                let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale

                if (encpwd != results[0].password) {

                    console.log('Password errata!');
                    next(createError(403, 'Password errata'));
                } else {
                    console.log('Utente autenticato');
                    console.log(results);

                    let id_utente = results[0].id_utente;


                    results = await db.query('SELECT `utente`.nome, `utente`.cognome,\
                        DATE_FORMAT(`utente`.data_di_nascita,"%d/%m/%Y") AS data_nascita, `utente`.indirizzo, \
                        utente.sesso\
                        FROM `utente`\
                        WHERE `utente`.id = ?', [
                        id_utente
                    ])
                        .catch(err => {
                            throw err;
                        });

                    console.log('Dati utente:');
                    console.log(results[0]);
                    res.send('Profilo', {
                        title: 'Profilo Utente',
                        profilo: {
                            user: req.body.email,
                            data: results[0]
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        router.send('Siamo spiecenti si è verificato un errore imprevisto')
        next(createError(500));
    }

}















module.exports = router;