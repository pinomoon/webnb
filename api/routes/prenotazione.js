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
            await db.query("DECLARE @sql nvarchar(MAX);")
                .catch(err=>{
                    throw err;
                });
            results=await db.quaery("SELECT id_struttura,nome_struttura,tipo,indirizzo_struttura,citta,regione,stato, \
            tipo,immagine_1 \
            FROM struttura, gallery_struttura\
            WHERE struttura.id_struttura=gallery_struttura.id_struttura \
            AND id_struttura=(SELECT @sql='SELECT id_struttura \
            FROM struttura AS s,camera AS c, \
            WHERE c.id_struttura=s.id_struttura\
            AND c.id_camera NOT IN(SELECT id_camera FROM camera,prenotazione \
                WHERE prenotazione.id_camera=camera.id_camera AND (prenotazione.data_fine>? AND \
                prenotazione.data_inizio<?))'\
            IF @req.body.regione IS NOT NULL SELECT @sql+=' AND s.regione=@req.body.regione' \
            IF @req.body.stato IS NOT NULL SELECT @sql+=' AND s.stato=@req.body.stato'  \
            IF @req.body.citta IS NOT NULL SELECT @sql+=' AND s.citta=@req.body.citta' \
            IF @req.body.npl IS NOT NULL SELECT @sql+=' AND c.numero_posti_letto>=@req.body.npl' \
            IF @req.body.tipo IS NOT NULL SELECT @sql+=' AND s.tipo=@req.body.tipo'  \
            IF @req.body.disdetta_gratuita IS NOT NULL SELECT @sql+=' AND s.disdetta_gratuita>0' \
            IF @req.body.modalita_di_pagamento IS NOT NULL SELECT @sql+=' AND s.modalità_di_pagamento=@req.body.modalita_di_pagamento' \
            IF @req.body.costo_camera IS NOT NULL SELECT @sql+=' AND c.costo_camera<=@req.body.costo_camera'\
            IF @req.body.colazione_inclusa IS NOT NULL SELECT @sql+=' AND c.colazione_inclusa==@req.body.colazione_inclusa'\
                GROUP BY id_struttura\
                EXEC sp_executesql @sql) ORDER BY nome_struttura ASC "
                , [
                    req.body.data_inizio,
                    req.body.data_fine

                ])
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