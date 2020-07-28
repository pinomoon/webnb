var express= require("express");
var router= express.Router();
var createError= require('http-errors');
const { config } = require("../../db/config");
const { makeDb, withTransaction } = require("../../db/dbmiddleware");
const {configmail}= require('../../servermail/configmail');
var nodemailer = require('nodemailer');
let transport=nodemailer.createTransport(configmail);

/*Elenco prenotazioni */
router.post('/',elenco);

async function elenco(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            results = await db.query("SELECT id_prenotazione, data_inizio, data_fine, stato_prenotazione, nome_struttura, metodo_di_pagamento \
            FROM prenotazione p,camera c,struttura s \
            WHERE p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND p.id_utente=? AND\
            conferma=true\
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
            results = await db.query("SELECT stato_prenotazione,data_inizio,disdetta_gratuita,metodo_di_pagamento \
            FROM prenotazione p, camera c, struttura s  \
            WHERE p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND p.id_prenotazione=?",[req.body.id_prenotazione ])
                .catch(err=>{
                    throw err;
                });
            results_h=await db.query("SELECT utente.nome, utente.cognome, utente.email FROM utente, prenotazione,camera,struttura\
                WHERE utente.id_utente=struttura.id_utente AND struttura.id_struttura=camera.id_struttura\
                AND camera.id_camera=prenotazione.id_camera AND prenotazione.id_prenotazione=?"
                ,[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                });
            results_c=await db.query("SELECT utente.nome, utente.cognome, utente.email FROM utente,prenotazione\
                WHERE utente.id_utente=prenotazione.id_utente AND prenotazione.id_prenotazione=?"
                ,[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                });
            let datenow=new Date();
            console.log(req.body.id_prenotazione);
        if(results[0].stato_prenotazione=='confermata'){
            if((results[0].modalita_di_pagamento=='struttura') && (data_inizio.getTime()-datenow.getTime()<(results[0].disdetta_gratuita*86400000))){
                
                await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione='annullata', prenotazione.stato_pagamento=true \
                WHERE prenotazione.id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                });
                let mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results_h[0].email,
                    subject: 'Prenotazione annullata',
                    text: 'Ciao '+results_h[0].nome+' '+results_h[0].cognome+',\n'+'\nCon la presente email ti comunichiamo che un cliente ha annullato la prenotazione:'
                    +req.body.id_prenotazione+'\npresso una tua struttura\nVerrà effettuato il pagamento in quanto la disdetta è avvenuta dopo il periodo di disdetta gratuita da te indicato\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results_c[0].email,
                    subject: 'Prenotazione annullata',
                    text: 'Ciao '+results_c[0].nome+' '+results_c[0].cognome+',\n'+'\nCon la presente email ti comunichiamo che hai correttamente annullato la prenotazione:'
                    +req.body.id_prenotazione+'\nVerrà effettuato il pagamento in quanto la disdetta è avvenuta dopo il periodo di disdetta gratuita indicato dall host\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.send('1'); //Prenotazione annullata e pagamento effettuato
            }
            else if((results[0].modalita_di_pagamento=='carta') && (data_inizio.getTime()-datenow.getTime()>=(results[0].disdetta_gratuita*86400000))){
                /* effettua rimborso */
                await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione=annullata, prenotazione.stato_rimborso=true \
                WHERE prenotazione.id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                });
                 mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results_h[0].email,
                    subject: 'Prenotazione annullata',
                    text: 'Ciao '+results_h[0].nome+' '+results_h[0].cognome+',\n'+'\nCon la presente email ti comunichiamo che un cliente ha annullato la prenotazione:'
                    +req.body.id_prenotazione+'\npresso una tua struttura\nVerrà effettuato il rimborso in quanto il cliente ha pagato con carta e la disdetta è avvenuta durante il periodo di disdetta gratuita da te indicato\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                 mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results_c[0].email,
                    subject: 'Prenotazione annullata',
                    text: 'Ciao '+results_c[0].nome+' '+results_c[0].cognome+',\n'+'\nCon la presente email ti comunichiamo che hai correttamente annullato la prenotazione:'
                    +req.body.id_prenotazione+'\nVerrà effettuato il rimborso in quanto la disdetta è avvenuta durante il periodo di disdetta gratuita indicato dall host\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.send('2'); //prenotazione annullata e rimborso effettuato
            }
            else{
                await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione='annullata' \
                WHERE prenotazione.id_prenotazione=?"
                ,[
                    req.body.id_prenotazione
                ]).catch(err=>{
                    throw err;
                })
                res.send('3'); //prenotazione annullata//
            }
        }
        else if(results[0].stato_prenotazione=='in attesa di conferma'){
            result= await db.query("UPDATE prenotazione SET prenotazione.stato_prenotazione='annullata' \
                WHERE prenotazione.id_prenotazione=?"
                ,[
                    req.body.id_prenotazione
                ]).catch(err=>{
                    throw err;
                })
                res.send('3'); //prenotazione annullata
            }
        
        })
    }catch(err){
        console.log(err);
        res.send('4');//errore
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
            console.log(req.body.id_prenotazione);
            console.log(JSON.stringify(results));
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
