var express= require("express");
var router= express.Router();
var nodemailer = require('nodemailer');
const {configmail}= require('../../servermail/configmail');
var pdfmaker=require('pdfkit');
var fs=require('fs');


let transport=nodemailer.createTransport(configmail);


const {config}= require('../../db/config');

const { makeDb, withTransaction } = require("../../db/dbmiddleware");

/*********gestisci prenotazioni*********/


router.post("/",gestisciPrenotazioni);

async function gestisciPrenotazioni(req,res,next){
    const db= await makeDb(config);
    let results={};
try {
    await withTransaction(db, async () => {
        results = await db.query("SELECT nome_struttura,nome_camera,stato_prenotazione FROM utente AS u, camera AS c, struttura AS s ,prenotazione AS p\
            WHERE p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND s.id_utente=u.id_utente \
            AND u.id_utente=? AND p.conferma=1 \
            ORDER BY stato_prenotazione ASC ,data_prenotazione DESC " , [req.body.id_utente]).catch(err => {
            throw err;
        })
        var risultato=['1',results];
        res.send(risultato); //
    })
}catch (error) {
    res.send('2');
    throw error;
}

}

/***********conferma Prenotazione**************/

router.post('/confermaPrenotazione',confermaPrenotazione);

async function confermaPrenotazione(req,res,next){
    const db=  await makeDb(config);
    try{
        await  withTransaction(db,async()=>{
            (await db).query("UPDATE prenotazione SET stato_prenotazione='confermata' WHERE id_prenotazione=?",[
                req.body.id_prenotazione
            ]).catch(err=>{
                throw err;
            })
            let results=await db.query("SELECT email,nome,nome_struttura,p.metodo_di_pagamento AS metodo_pagamento FROM utente AS u, prenotazione AS p, camera AS c ,struttura AS s\
                WHERE  u.id_utente=p.id_utente AND p.id_prenotazione=?AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura",[req.body.id_prenotazione]);
            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:results[0].email,
                subject: 'Conferma prenotazione',
                text: 'Ciao '+results[0].nome+',\n'+'\nCon la presente mail ti confermiamo che la tua prenotazione n° : ' +
                   +req.body.id_prenotazione+'\npresso: '+results[0].nome_struttura +' è stata confermata\nVerrà effettuato il pagamento qualora avessi scelto di pagare con carta ' +
                    '\n Saluti,\n\n Staff WeB&B.'
            };
            transport.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            if (results[0].metodo_pagamento=='carta'){
                
                await  db.query("UPDATE prenotazione SET stato_pagamento=true WHERE id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{
                    throw err;
                })
                
                let mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results[0].email,
                    subject: 'Conferma Pagamento (completo)',
                    text: 'Ciao '+results[0].nome+',\n'+'\nCon la presente mail ti confermiamo che è stato effettuato il pagamento riguardo la prenotazione : ' +
                        +req.body.id_prenotazione+'\npresso: '+results[0].nome_struttura +'\n' +
                        '\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                
                
            }
            if (results[0].metodo_pagamento=="anticipo_carta"){
                let mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results[0].email,
                    subject: 'Conferma Pagamento (anticipo)',
                    text: 'Ciao '+results[0].nome+',\n'+"\nCon la presente mail ti confermiamo che: " +
                        " è stato effettuato il pagamento dell'anticipo riguardo la prenotazione : " +
                        +req.body.id_prenotazione+'\npresso: '+results[0].nome_struttura +'\n Ti ricordiamo che dovrai pagare la restante metà in struttura.' +
                        '\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                
            }
            
            
            res.send("1");
        })
    }catch(error){
        res.send('2');
        throw error;
    }
}



/**********rifiuta_prenotazione***********/

router.post('/rifiutaPrenotazione',rifiutaPrenotazione);

async function rifiutaPrenotazione(req,res,next){
    const db=await makeDb(config);
    try{
        let results={};
        
        await withTransaction(db,async ()=>{
            let now=Date.now();
            results= await db.query("SELECT email,nome, nome_struttura FROM  utente as u,prenotazione as p,camera as c,struttura as s \
            WHERE u.id_prenotazione=p.id_utente AND id_prenotazione=? AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura ",[req.body.id_prenotazione]).catch(err=>{
            throw err;
        })
            await db.query("UPDATE prenotazione SET stato_prenotazione='rifiutata',data_rifiuto=? WHERE id_prenotazione=?",[now,req.body.id_prenotazione]).catch(err=>{
                throw err;
            })
            
            
            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:results[0].email,
                subject: 'Prenotazione Rifiutata',
                text: 'Ciao '+results[0].nome+',\n'+"\nLa tua prenotazione : " +
                    req.body.id_prenotazione+'\npresso: '+results[0].nome_struttura +'  è stata rifiutata,\nvisita il nostro sito per trovare altre strutture per il tuo viaggio ' +
                    '\n Saluti,\n\n Staff WeB&B.'
            };
            transport.sendMail(mailOptions,function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
            res.send("1");
            
        })
        
    }catch (error) {
        res.send("2");
        throw error;
    }

}

/************rifiuta prenotazione Automatica************/

var rejecPrenotazioneAutomatica= setInterval(rifiutaPrenotazioneAutomatica,3600000);

async function rifiutaPrenotazioneAutomatica(){

    const db= await makeDb(config);
    let results={};
    try {
        await withTransaction(db, async () => {

            let now = Date.now();

            await db.query("UPDATE prenotazione SET stato_prenotazione='rifiutata' , data_rifiuto=? WHERE (?-data_prenotazione)<=86400000", [now,now]).catch(err => {
                throw err;
            })
            results= await db.query("SELECT id_prenotazione,email,nome, nome_struttura FROM  utente AS u,prenotazione AS p,camera AS c,struttura AS s \
            WHERE u.id_utente=p.id_utente  AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND data_rifiuto=?",[now]).catch(err=>{
                throw err;
            })

            for (let i=0;i<results.length;i++){

                let mailOptions = {
                    from: 'webnb-service@libero.it',
                    to:results[i].email,
                    subject: 'Prenotazione Rifiutata automaticamente',
                    text: 'Ciao '+results[0].nome+',\n'+"\nLa tua prenotazione : " +
                        results[i].id_prenotazione+'\npresso: '+results[i].nome_struttura +'  è stata rifiutata automaticamente,\nvisita il nostro sito per trovare altre strutture per il tuo viaggio ' +
                        '\n Saluti,\n\n Staff WeB&B.'
                };
                transport.sendMail(mailOptions,function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                })
            }
        console.log("rifiuto automatico effettuato con successo !...")
        });
    }catch(error){
        throw error;
    }
}
/*********check-in**********/

/***invio dati alla questura****/

router.post('/checkinQuestura',checkinQuestura);

async function checkinQuestura(req,res,next){
    const db= await makeDb(config);
    let results={};
    try {
        await withTransaction(db,async ()=>{
            results= await db.query("SELECT nome,cognome,nome_struttura,nome_camera dati_ospiti.*\
                                            FROM utente AS u, dati_ospiti AS dat,prenotazione AS p, camera AS c,struttura AS s \
                                             WHERE id_prenotazione=? AND u.id_utente=dat.id_utente AND dat.id_prenotazione=p.id_prenotazione AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura",
                [req.body.id_prenotazione])
                .catch(err=>{
                    throw err;
            })
            let filename=results[0].id_utente.toString()+'.pdf'
            let mydoc=new pdfmaker;
            mydoc.pipe(fs.createWriteStream(filename));
            mydoc.font('Times-Roman');
            mydoc.fontSize("12");
            mydoc.text(results,100,100);
            mydoc.end();


            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:'lucalb10@gmail.com',
                subject: 'DATI QUESTURA',
                text: 'Si inoltrano con la presente i dati della prenotazione:\n '+results[0].id_prenotazione+
                    "Relativi alla sturttura : "+results[0].nome_struttura+"\ndell'host: "+results[0].nome+" "+results[0].cognome,
                attachments:[
                    {   filename: filename,
                        path: './'+filename
                    }
                ]

            };
            transport.sendMail(mailOptions,function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    fs.unlinkSync(filename);
                    console.log('File deleted!: '+filename);
                    console.log('Email sent: ' + info.response);
                }
            }).catch(err=>{
                throw  err;
            })

            await db.query("UPDATE prenotazione SET stato_prenotazione='soggiorno in corso' WHERE id_prenotazione=?",[
                req.body.id_prenotazione
            ])

            res.send("1");

        })
    }catch(error){
        res.send("2");
        throw error;
    }
}

/**********inserisci-dati-ospiti***********/

router.post('/inserisciOspiti',inserisciOspiti);

async function inserisciOspiti(req,res,next){
    const db= await makeDb(config);
    let results= {};
    try{
        await withTransaction(db,async ()=>{
            await db.query("INSERT INTO dati_ospiti(id_prenotazione, id_utente, nome_ospite, cognome_ospite, data_nascita, sesso, residenza, n_documento, foto_documento) VALUES?",
                [
                [
                    [
                    req.body.id_prenotazione,
                req.body.id_utente,
                req.body.nome_ospite,
                req.body.cognome_ospite,
                req.body.data_nascita,
                req.body.sesso,
                req.body.residenza,
                req.body.n_documento,
                req.body.foto_documento
                    ]
                ]
        ]).catch(err=>{
                throw err;
            });


            res.send("1");
        })
    }catch (error) {
        res.send("2");
        throw error
    }
}

/*******elimina ospite*********/


router.post("/eliminaOspiti",eliminaOspiti);

async function eliminaOspiti(req,res,next){
     const db =await makeDb(config);
     try{ await withTransaction(db,async ()=>{


         await db.query("DELETE FROM dati_ospiti WHERE id_dati_ospiti=?",[req.body.id_dati_ospiti]).catch(err=>{
             throw err;
         }).catch(err=>{
             throw err;
         })
         res.send('1'); // Ospite eliminato
     });
     }catch(err){
         res.send("2");
         throw err;}
}

/******modifica dati ospiti**********/

router.post("/modificaDatiOspiti",modificaDatiOspiti);

async function modificaDatiOspiti(req,res,next){
    const db= await makeDb(config);

    try{
        await  withTransaction(db,async ()=>{
            await db.query("UPDATE dati_ospiti SET id_dati_ospiti=? ,id_prenotazione=?, \
                id_utente=?, nome_ospitet=?, cognome_ospite=?, data_nascita=?,sesso=?,residenza=?,n_documento=? foto_documento=?",[
                req.body.id_prenotazione,
                req.body.id_utente,
                req.body.nome_ospite,
                req.body.cognome_ospite,
                req.body.data_nascita,
                req.body.sesso,
                req.body.residenza,
                req.body.n_documento,
                req.body.foto_documento
            ]).catch(err=>{
                throw err;
            })
            res.send("1");
        })

    }catch(err){
        res.send("2");
    }
}

/**********clicca su checkin********/

router.post("/checkIN",checkIN);

async function checkIN(req,res,next){
    const db=await makeDb(config);
    let results={};
    try {
        results= await withTransaction(db,async ()=>{
            (await db).query("SELECT * FROM dati_ospiti WHERE id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{throw err;})
        })
        var risultato=['1',results];
        res.send(risultato);
    }catch (error) {
        res.send("2");
        throw error;

    }
}


/*********** checkout automatico*************/



let rejectcheckoutAutomatico= setInterval(checkoutAutomatico, 86400000);


async function checkoutAutomatico(req,res,next){
    const db= await makeDb(config);
    let results={};
    let now=new Date();
    try{
        await withTransaction(db,async ()=>{
           results = await db.query("SELECT id_prenotazione,email,nome_struttura,nome_camera,nome\
               FROM prenotazione AS p ,camera AS c,struttura AS s, utente AS u \
               WHERE data_fine<=? AND stato_prenotazione='soggiorno in corso'AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND s.id_utente=u.id_utente",[now]);
        }).catch(err=>{
            throw err;
        })
        for(let i=0;i<results.length;i++){
            await db.query("UPDATE prenotazione SET stato_prenotazione='soggiorno concluso'").catch(err=>{
                throw err;
            })
            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:results[i].email,
                subject: 'Check-ou automatico',
                text: 'Ciao '+results[i].nome+',\n'+"\n Eseguito check-out automatico per la tua prenotazione : " +
                    results[i].id_prenotazione+'\npresso: '+results[i].nome_struttura+" : "+results[i].nome_camera+
                    '\n Saluti,\n\n Staff WeB&B.'
            };
            transport.sendMail(mailOptions,function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })

        }
        res.send("1");

    }catch (error) {
        res.send('2');
    }

}


/*********checkoutManuale******/

router.post("/checkoutManuale",checkoutManuale);

async function checkoutManuale(req,res,next){
    const db= await makeDb(config);

    try{
        await withTransaction(db,async ()=>{
            await db.query("UPDATE prenotazione SET stato_prenotazione='soggiorno concluso' WHERE id_prenotazione=?",[req.body.id_prenotazione]).catch(err=>{
                throw err;
            })
            res.send("1");
        })
    }catch(error){
        res.send('2');
    }
}


module.exports=router;