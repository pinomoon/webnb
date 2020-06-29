var express= require("express");
var router= express.Router();
var createError= require('http-errors');
const { config } = require("../../db/config");
const { makeDb, withTransaction } = require("../../db/dbmiddleware");



/*Elenco prenotazioni */
router.post('/',elenco);

async function elenco(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("SELECT *\
            FROM utente,prenotazione \
            WHERE prenotazione.id_utente=utente.id_utente \
            AND utente.id_utente=? AND prenotazione.conferma=1\
             ORDER BY stato_prenotazione ASC ,data_prenotazione DESC ",[req.body.id_utente])
                .catch(err=>{
                    throw err;
                });
            var risultato=['1',results]; //elenco prenotazioni inviato correttamente
            res.send(risultato);
        })

    }catch(err){
        console.log(err);
        res.send('2'); //errore nel recupero dell'elenco prenotazioni
        next(createError(500));
    }
}

/* Annulla prenotazione */

router.post('/annullaPrenotazione', annulla);

async function annulla(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("SELECT stato_prenotazione,data_inizio,disdetta_gratuita,modalita_di_pagamento \
            FROM prenotazione \
            WHERE prenotazione.id_prenotazione=?",[req.body.id_prenotazione ])
                .catch(err=>{
                    throw err;
                });
            let datenow=new Date();
        if(results[0].stato_prenotazione=='confermata'){
            if((results[0].modalita_di_pagamento=='struttura') && (data_inizio.getTime()-datenow.getTime()<(results[0].disdetta_gratuita*86400000))){
                /* effettua pagaemento */
                result= await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione=annullata AND prenotazione.stato_pagamento=true \
                WHERE prenotazione.id_prenotazione=",[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                })
                res.rend('1'); //Prenotazione annullata e pagamento effettuato
            }
            else if((results[0].modalita_di_pagamento=='carta') && (data_inizio.getTime()-datenow.getTime()>=(results[0].disdetta_gratuita*86400000))){
                /* effettua rimborso */
                result= await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione=annullata AND prenotazione.stato_rimborso=true \
                WHERE prenotazione.id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                })
                res.rend('2'); //prenotazione annullata e rimborso effettuato
            }
        }
        else if(results[0].stato_prenotazione=='in attesa di conferma'){
            result= await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione=annullata \
                WHERE prenotazione.id_prenotazione=?"
                ,[
                    req.body.id_prenotazione
                ]).catch(err=>{
                    throw err;
                })
                res.rend('3'); //prenotazione annullata//
            }
        
        })
    }catch(err){
        console.log(err);
        res.send('3'); 
        next(createError(500));
    }
}

/* recensisci struttura */
router.post('/recensisci', recensisci);
async function recensisci(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results= await db.query("SELECT id_struttura,id_utente FROM camera,prenotazione \
             WHERE prenotazione.id_camera=camera.id_camera AND prenotazione.id_prenotazione=?",[req.body.id_prenotazione])
                .catch(err=>{
                    throw err;
                });
            var idstruttura= results[0].id_struttura;
            var idutente= results[0].id_utente;
            results = await db.query("INSERT INTO recensione (id_utente,id_struttura,recensione) VALUES ?"
                ,[
                    [
                        [
                            idutente,
                            idstruttura,
                            req.body.recensione
                        ]
                    ]
                ])
                .catch(err=>{
                    throw err;
                });
            res.send('1'); //recensione effettuata correttamente
        })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}












module.exports = router;
