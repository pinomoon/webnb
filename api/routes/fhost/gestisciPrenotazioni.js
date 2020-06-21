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
    const db= makeDb(config);
    let results={};
try {
    await withTransaction(db, async () => {
        results = (await db).query("SELECT nome_struttura,nome_camera,stato_prenotazione FROM utente AS u, camera AS c, struttura AS s ,prenotazione AS p\
            WHERE p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND s.id_utente=u.id_utente \
            AND u.id_utente=? ORDER BY stato_prenotazione ASC ,data_prenotazione DESC " , [req.body.id_utente]).catch(err => {
            throw err;
        })
        res.send(results);
    })
}catch (error) {
    res.send('error');
    throw error;
}

}

/***********conferma Prenotazione**************/

router.post('/confermaPrenotazione',confermaPrenotazione);

async function confermaPrenotazione(res,req,next){
    const db= makeDb(config);
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
            
            
            res.send("success");
        })
    }catch(error){
        res.send('error');
        throw error;
    }
}



/**********rifiuta_prenotazione***********/

router.post('/rifiutaPrenotazione',rifiutaPrenotazione);

async function rifiutaPrenotazione(req,res,next){
    const db=makeDb(config);
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
            res.send("success");
            
        })
        
    }catch (error) {
        res.send("error");
        throw error;
    }

}

/************rifiuta prenotazione Automatica************/

var rejecPrenotazioneAutomatica= setInterval(rifiutaPrenotazioneAutomatica,3600000);

async function rifiutaPrenotazioneAutomatica(){

    const db= makeDb(config);
    let results={};
    try {
        await withTransaction(db, async () => {

            let now = Date.now();

            await db.query("UPDATE prenotazione SET stato_prenotazione='rifiutata' , data_rifiuto=? WHERE (?-data_prenotazione)<=86400000", [now,now]).catch(err => {
                throw err;
            })
            results= await db.query("SELECT id_prenotazione,email,nome, nome_struttura FROM  utente AS u,prenotazione AS p,camera AS c,struttura AS s \
            WHERE u.id_prenotazione=p.id_utente  AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND data_rifiuto=?",[now]).catch(err=>{
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

router.post('/checkinQuestura',checkinQuestura);

async function checkinQuestura(res,req,next){
    const db= makeDb(config);
    let results={};
    try {
        await withTransaction(db,async ()=>{
            results= (await db).query("SELECT nome,cognome,nome_struttura,nome_camera dati_ospiti.*\
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
            })

            res.send("success");

        })
    }catch(error){
        res.send("error");
        throw error;
    }
}







module.exports=router