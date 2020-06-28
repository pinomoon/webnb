var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const { config } = require('../../db/config');
const { makeDb, withTransaction } = require('../../db/dbmiddleware');


router.post('/', guadagni);

async function guadagni(req,res, next){

    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {

            results = await db.query('SELECT SUM(importo) AS guadagno \
             FROM prenotazione,camera,struttura \
              WHERE prenotazione.id_camera=camera.id_camera \
              AND camera.id_struttura=struttura.id_struttura AND \
              struttura.id_utente=? AND data_fine<=? AND data_fine>=? AND stato_pagamento=true \
              AND stato_rimborso=false'
            ,  [
                req.body.id_utente,
                req.body.datafinale,
                req.body.datainiziale,
            ]
               ).catch(err => {
                    throw err;
                });
                var risultato=['1',results];
                console.log('Guadagni calcolati correttamente');
                res.send(risultato);
        })
    }catch(err){
        console.log('Comunicazione con il database fallita riprova!');
        res.send('2'); //'Comunicazione con il database fallita riprova!'
        next(createError(500));
    }
}
        




module.exports = router;