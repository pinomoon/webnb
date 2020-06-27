var express= require("express");
var router= express.Router();
var createError= require('http-errors');
const { config } = require("../../db/config");
const { makeDb, withTransaction } = require("../../db/dbmiddleware");

/* Elenco preferiti */

router.post('/', elencoPref);

async function elencoPref(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("SELECT nome_struttura,regione,citta,indirizzo_struttura,tipo,immagine_1 \
            FROM preferiti,struttura,gallery_struttura WHERE preferiti.id_struttura=struttura.id_struttura \
            AND gallery_struttura.id_struttura=struttura.id_struttura AND preferiti.id_utente=? \
            ORDER BY nome_struttura ASC",[req.body.id_utente])
                .catch(err=>{
                    throw err;
                });
            var risultato=['1',results];
            res.send(risultato);
        })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}


/* aggiungi preferito */
router.post('/aggiungiPreferiti', aggiungiPref);

async function aggiungiPref(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("INSERT INTO preferiti (id_utente,id_struttura) VALUES ?"
                ,[
                    [
                        [
                            req.body.id_utente,
                            req.body.id_struttura
                        ]
                    ]
                ])
                .catch(err=>{
                    throw err;
                });
            res.send('1');
        })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}

/* elimina preferito */
router.post('/eliminaPreferiti', eliminaPref);

async function eliminaPref(req, res, next) {
    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("DELETE FROM preferiti WHERE preferiti.id_struttura=? AND preferiti.id_utente=?"
                ,[
                    req.body.id_struttura,
                    req.body.id_utente
                ]).catch(err=>{
                throw err;
            });
            res.send('1');
        })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}


module.exports = router;