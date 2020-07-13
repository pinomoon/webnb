var express= require("express");
var router= express.Router();
var nodemailer = require('nodemailer');
const {configmail}= require('../../servermail/configmail');
var pdfmaker=require('pdfkit');
var fs=require('fs');
let transport=nodemailer.createTransport(configmail);


const {config}= require('../../db/config');

const { makeDb, withTransaction } = require("../../db/dbmiddleware");

/*******documentiturismo*********/

router.post("/",resocontoTrimestre);

async function resocontoTrimestre(req,res,next){
    try{
    const db = await makeDb(config);

    let results={};
    let data= new Date(req.body.data_trimestre);
    let totale_tasse={};
    let conv=new Date(data.getTime()-7889400000);
    console.log(conv);
    await withTransaction(db,async ()=>{
/**prendo tutti i dati delle prenotazioni e degli ospiti di tutte le prenotazioni che vanno dalla data che inserisce l'utente fino a 3 mesi prima ,
 *  così ottengo tutti i dati del trimestre sino a data_trimestre
 *  data_trimestre portata a timestamp e confrontata con data prenotazione, prendo solo le prenotazioni concluse */
        results= await db.query("SELECT p.data_prenotazione, nome_struttura,nome_camera, p.id_prenotazione,u.nome,u.cognome, nome_ospite,cognome_ospite,data_nascita,dat.sesso,residenza\
            FROM dati_ospiti AS dat ,prenotazione AS p,struttura AS s,camera AS c ,utente AS u\
            WHERE p.stato_prenotazione='soggiorno concluso'AND dat.id_prenotazione=p.id_prenotazione AND p.id_camera=c.id_camera AND c.id_struttura=s.id_struttura AND s.id_utente=u.id_utente  AND u.id_utente=? AND (?>=p.data_prenotazione)\
            \AND p.data_prenotazione>=?\
             ORDER BY nome_struttura DESC ",
            [
                req.body.id_utente,
                data,
                conv
            ]).catch(err=>{
                throw err;
        })
        if (results.length>0){
            totale_tasse= await db.query("SELECT SUM(p.tasse_soggiorno) AS totale_tasse_soggiorno FROM struttura AS s , prenotazione  AS p,camera AS c \
            WHERE p.stato_prenotazione='soggiorno concluso' AND s.id_utente=? AND p.id_camera=c.id_camera  AND c.id_struttura=s.id_struttura AND (?-p.data_prenotazione)<=7889400000",
                [req.body.id_utente,
                    data.getTime()]).catch(err=>{
                throw err;
            })
            let tax=JSON.stringify(totale_tasse);
            results.foto_documento=null;
            let doctext=JSON.stringify(results);
            let filename='trimestre'+req.body.data_trimestre+'.pdf'
            let mydoc=new pdfmaker;
            mydoc.pipe(fs.createWriteStream(filename));
            mydoc.font('Times-Roman');
            mydoc.fontSize("12");
            mydoc.text(doctext+tax,100,100);
            mydoc.end();


            let mailOptions = {
                from: 'webnb-service@libero.it',
                to:'lucalb10@gmail.com',
                subject: 'DATI UFFICIO TURISMO',
                text: 'Si inoltrano con la presente i dati del resoconto trimestrale del periodo : '+conv.toUTCString()+' '+data.toUTCString()+"\n"+
                    "Relativi all'host: " +results[0].nome+" "+results[0].cognome,
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
        }else{
            res.send('3');
            console.log("nessun dato presente");
        }



        res.send('1');
    })

}catch(err){
        res.send('2');
    throw err;
}
}


module.exports=router