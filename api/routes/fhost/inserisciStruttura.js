var express = require('express');
var router = express.Router();
var multer= require('multer');
var createError= require('http-errors');
const { config } = require("../../db/config");
const { makeDb, withTransaction } = require("../../db/dbmiddleware");

var img;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/immaginiStrutture')
    },
    filename: function (req, file, cb) {
        img=Date.now()+'_'+file.originalname;
        cb(null, img )
    }

});

var upload=multer({storage:storage}).single('file');

router.post('/caricaImg',function(req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.send("2");
            return res.status(500).json(err)
        } else if (err) {
            res.send("2");
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

/***inserimento struttura*****/

router.post('/',inserisciStruttura);

async function inserisciStruttura(req,res,next) {
    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {


            await db.query("INSERT INTO struttura (id_utente,nome_struttura,indirizzo_struttura,cap,punti_di_interesse,citta,regione,stato,tipo,disdetta_gratuita,modalita_di_pagamento,tassa_soggiorno,servizi,ora_checkin,ora_checkout,descrizione) VALUES ?"
                , [
                    [
                        [
                            req.body.id_utente,
                            req.body.nome_struttura,
                            req.body.indirizzo_struttura,
                            req.body.cap,
                            req.body.punti_di_interesse,
                            req.body.citta,
                            req.body.regione,
                            req.body.stato,
                            req.body.tipo,
                            req.body.disdetta_gratuita,
                            req.body.modalita_di_pagamento,
                            req.body.tassa_soggiorno,
                            req.body.servizi,
                            req.body.ora_checkin,
                            req.body.ora_checkout,
                            req.body.descrizione
                        ]
                    ]
                ]).catch(err=>{

                     throw err;
            });
            results= await db.query("SELECT id_struttura FROM struttura WHERE id_utente=? AND nome_struttura=? AND indirizzo_struttura=?",
                [
                    req.body.id_utente,
                    req.body.nome_struttura,
                    req.body.indirizzo_struttura
                ]).catch(err=>{
                    throw err;
                });
            let ids=results[0].id_struttura;
            console.log(req.body.nomeImg1)
            await db.query("INSERT INTO gallery_struttura(id_struttura,immagine_1,immagine_2,immagine_3) VALUES ?",[
                [
                    [
                        ids,
                        req.body.nomeImg1,
                        req.body.nomeImg2,
                        req.body.nomeImg3
                    ]
                ]
            ]).catch(err=>{
                throw  err;
            });


            await db.query("INSERT INTO camera(id_struttura,nome_camera,numero_posti_letto,costo_camera,colazione_inclusa) VALUES ?",[
                    [
                        [
                            ids,
                            req.body.nome_camera,
                            req.body.numero_posti_letto,
                            req.body.costo_camera,
                            req.body.colazione_inclusa
                        ]
                    ]
                ]).catch(err=>{
                    throw err;
                });
            res.send("1"); //"Struttura aggiunta correttamente;
            })


}catch (err) {
            console.log(err);
            res.send("2");
            next(createError(500));
        }

}

module.exports = router;