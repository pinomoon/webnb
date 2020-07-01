var express= require("express");
var router= express.Router();
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");
var nodemailer = require('nodemailer');
const {configmail}= require('../servermail/configmail');
var transport=nodemailer.createTransport(configmail);
var pdfmaker=require('pdfkit');
var fs=require('fs');


router.post('/ricercaStruttura', ricerca);

async function ricerca(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            let sql="";
            if((req.body.luogo==='') || (req.body.luogo===undefined)){
                req.body.luogo='%';
            }
            if(req.body.npl==='' || req.body.npl===undefined){
                req.body.npl='%';
            }
            if(req.body.tipo==='' || req.body.tipo===undefined){
                req.body.tipo='%';
            }
            if(req.body.disdetta_gratuita!==1){
                req.body.disdetta_gratuita='%';
            }
            if(req.body.modalita_di_pagamento==='' || req.body.modalita_di_pagamento===undefined){
                req.body.modalita_di_pagamento='%';
            }
            if(req.body.costo_camera==='' || req.body.costo_camera===undefined){
                req.body.costo_camera=100000;
            }
            if(req.body.colazione_inclusa!==1){
               req.body.colazione_inclusa='%';
            }

            results=await db.query("SELECT struttura.id_struttura,nome_struttura,tipo,indirizzo_struttura,citta,regione,stato,  tipo,immagine_1\
                FROM struttura, gallery_struttura,camera\
                WHERE struttura.id_struttura=gallery_struttura.id_struttura AND struttura.id_struttura=camera.id_struttura \
                AND struttura.id_struttura IN ((SELECT struttura.id_struttura FROM struttura , camera WHERE camera.id_struttura=struttura.id_struttura\
                AND (struttura.nome_struttura LIKE ? OR struttura.regione LIKE ? OR struttura.citta LIKE ? OR struttura.stato LIKE ?) AND camera.numero_posti_letto>=? AND struttura.tipo LIKE ? \
                AND struttura.disdetta_gratuita LIKE ? AND struttura.modalita_di_pagamento LIKE ? AND camera.costo_camera<=? AND camera.colazione_inclusa LIKE ? )\
                EXCEPT (SELECT camera.id_struttura FROM camera,prenotazione WHERE prenotazione.id_camera=camera.id_camera \
                AND (prenotazione.data_fine>? AND prenotazione.data_inizio<?))) GROUP BY struttura.id_struttura, nome_struttura, tipo, indirizzo_struttura, citta, regione, stato, tipo, immagine_1 ORDER BY nome_struttura ASC"
                , [
                    req.body.luogo,
                    req.body.luogo,
                    req.body.luogo,
                    req.body.luogo,
                    req.body.npl,
                    req.body.tipo,
                    req.body.disdetta_gratuita,
                    req.body.modalita_di_pagamento,
                    req.body.costo_camera,
                    req.body.colazione_inclusa,
                    req.body.data_inizio,
                    req.body.data_fine

                ])
                .catch(err=>{
                    throw err;
                });

                let i=0;
                for (i; i<results.length;i++) {
                    console.log(results[i]);
                    results[i].prezzo = ((await db.query("SELECT  MIN (camera.costo_camera) AS prezzo_struttura\
                FROM struttura, camera\
                WHERE struttura.id_struttura=camera.id_struttura AND struttura.id_struttura=? GROUP BY struttura.id_struttura"
                        , [
                            results[i].id_struttura
                        ]).catch(err => {
                        throw  err;
                    })))

                }

                var risultato=['1',results];
                console.log(risultato);
                //console.log(results_prezzo);
                res.send(risultato);
        })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}

/* esplora_struttura */
router.post('/esploraStruttura', esplora);

async function esplora(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
                results=await db.query("SELECT nome_struttura,indirizzo_struttura,cap,punti_di_interesse,\
                citta,regione,stato,tipo, disdetta_gratuita, modalita_di_pagamento, tassa_soggiorno, servizi,\
                ora_checkin,ora_checkout,descrizione,immagine_1,immagine_2,immagine_3,id_camera,nome_camera,\
                numero_posti_letto, costo_camera, colazione_inclusa,recensione \
                FROM struttura,camera,gallery_struttura,recensione \
                WHERE camera.id_struttura=struttura.id_struttura \
                AND gallery_struttura.id_struttura=struttura.id_struttura \
                 AND struttura.id_struttura=recensione.id_struttura AND struttura.id_struttura=?"
                    ,[req.body.id_struttura])
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

/* prenota */

router.post('/datiPrenotazione', dati);

async function dati(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        results=await db.query("INSERT INTO prenotazione(id_utente,id_camera,data_inizio,data_fine) VALUES ?"
        ,[
            req.body.id_utente,
            req.body.id_camera,
            req.body.data_inizio,
            req.body.data_fine

        ] ).catch(err=>{
            throw err;
        });
        await withTransaction(db, async() => {
            results=await db.query("SELECT nome,cognome,data_di_nascita,sesso,indirizzo,citta,cap,cellulare,email,titolare_carta,numero_carta,scadenza,cvc \
            FROM utente, carta_credito \
            WHERE utente.email=carta_credito.email AND utente.id_utente=? ",[req.body.id_utente])
                .catch(err=>{
                    throw err;
                });
                var risultato=['1',results[0]];
                res.send(risultato);
    })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}

router.post('/',prenota);

async function prenota(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        let date= new Date();
        year=date.getFullYear();
        await withTransaction(db, async() => {
           
            results=await db.query("SELECT SUM(data_fine-data_inizio) AS giorni_soggiorno \
            FROM prenotazione,camera \
            WHERE (data_inizio>=year-01-01 AND data_fine<=year-12-31) AND prenotazione.id_camera=camera.id_camera AND prenotazione.id_utente=? AND camera.id_struttura=? ",
                [
                    req.body.id_utente,
                    req.body.id_struttura
                ])
                .catch(err=>{
                    throw err;
                });
                let gsog=results[0].giorni_soggiorno;
                if(gsog+(req.body.data_fine-req.body.data_inizio)>28){
                    console.log('28 giorni superati');
                    var risultato=['2',gsog];
                    res.send(risultato);
                    next(createError(403, '28 giorni superata'));
                }
            await db.query("UPDATE carta_credito SET titolare_carta=?,numero_carta=?,scadenza=?,cvc=? WHERE email=?",
                [
                    req.body.email,
                    req.body.titolare_carta,
                    req.body.numero_carta,
                    req.body.scadenza,
                    req.body.cvc
                ]).catch(err=>{
                    throw err;
                });
                
                
                let now= new Date();
                now=Date.now();
                
                
            await db.query("UPDATE prenotazione SET data_prenotazione=?, \
                metodo_di_pagamento=?,importo=?, tasse_soggiorno=?,stato_pagamento=?, stato_rimborso=?,conferma=?)"
                ,[
                    [
                        [
                            now,
                            req.body.metodo_di_pagamento,
                            req.body.importo,
                            req.body.tasse_soggiorno,
                            0,
                            0,
                            1
                        ]
                    ]
                ]).catch(err=>{
                    throw err;
                });
            let filename='riepilogoPrenotazione'+req.body.id_utente+'.pdf';
                let testo="RIEPILOGO PRENOTAZIONE \n\n\n\
                DATI STRUTTURA:\n\
                nome struttura:"+req.body.nome_struttura+"\n tipo:"+req.bod.tipo+"\n"+req.body.immagine_1+"\n nome camera:"+req.body.nome_camera+"\
                \n numero posti letto:"+req.body.npl+"\n\n\n\
                DATI PRENOTAZIONE:\n\
                data richiesta prenotazione:"+now+"\n data inizio soggiorno:"+req.body.data_inizio+"\n data fine soggiorno:"+req.body.data_fine+"\n metodo pagamento:"+req.body.metodo_di_pagamento;                let mydoc=new pdfmaker;
                mydoc.pipe(fs.createWriteStream(filename));
                mydoc.font('Times-Roman');
                mydoc.fontSize("12");
                mydoc.text(testo,100,100);
                mydoc.end();
                
                let mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:    req.body.email,
                    subject: 'Conferma di invio richiesta prenotazione',
                    text: "Hai effettuato una richiesta di prenotazione su WeB&B, ricorda che puoi, effettuando l'accesso, in qualsiasi momento\
                    controllare l'elenco delle tua prenotazioni e il loro stato nel nostro sito alla voce LeMiePrenotazioni.\
                    Riceverai una mail quando il proprietario della struttura accetterà o rifiuterà la tua prenotazione.\
                        '\n Saluti,\n\n Staff WeB&B.",
                        attachments:[
                            {   filename: filename,
                                path: './'+filename
                            }
                        ]
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        fs.unlinkSync(filename);
                        console.log('File deleted!: '+filename);
                        console.log('Email sent: ' + info.response);

                    }
    
                });
            
            results= await db.query("SELECT email FROM utente,struttura WHERE struttura.id_utente=utente.id_utente\
            AND struttura.id_struttura=?",
            [
                req.body.id_struttura
            ])
            .catch(err=>{
                throw err;
            });
            mailOptions = {
                from: 'webnb-service@libero.it',
                to:    results,
                subject: 'Prenotazione effettuata nella sua struttura',
                text: "E' stata effettuata una prenotazione presso una tua struttura.\
                Puoi in qualsiasi momento, effettuando l'accesso, \
                gestire le prenotazioni effettuate presso le tue strutture alla voce Gestisci Prenotazioni\
                Ricorda che dopo 48 ore la richiesta di prenotazione verrà rifiutata in automatico. \
                    '\n Saluti,\n\n Staff WeB&B.",
                    attachments:[
                        {   filename: filename,
                            path: './'+filename
                        }
                    ]
            };
            transport.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    fs.unlinkSync(filename);
                    console.log('File deleted!: '+filename);
                    console.log('Email sent: ' + info.response);

                }

            });
            res.send('1'); //Prenotazione effettuata con successo! Email inviate
    })
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}
module.exports=router