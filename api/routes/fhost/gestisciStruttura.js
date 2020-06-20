var express= require("express");
var router= express.Router();
var createError= require('http-errors');

let results={};
/****elenco delle strutture******/
router.post('/',elencoStrutture);

const {config}= require('../../db/config');

const { makeDb, withTransaction } = require("../../db/dbmiddleware");

async function elencoStrutture(req,res,next) {
    const db = await makeDb(config);
    try {


        await withTransaction(db, async () => {
            results = await db.query("SELECT id_struttura,nome_struttura, tipo, immagine_1 FROM strutture, gallery_strutture WHERE id_utente=?", [req.body.id_utente])
            res.send(results);
        }).catch(err => {
            throw err;
        })

    }catch (error) {
        res.send('siamo spiacenti si è verificato un errore inatteso');
    }
}

/******************modifica di una struttura************/


      /*****attributi da modificare****/

router.post('/modificaStruttura',modificaStruttura);

async function modificaStruttura(req,res,next){
    const db= await  makeDb(config);
    try {


        await withTransaction(db, async () => {
            results = await db.query("SELECT * FROM struttura,camera WHERE struttura.id_struttura=? AND struttura.id_struttura=camera.id_struttura", [req.body.id_struttura]);
            res.send(results);
        }).catch(err => {
            throw  err;

        });
        res.send("success");

    }catch (error) {
        res.send('spiacenti si è verificato un errore inatteso')

    }

}
/**********salvaModificheStruttura*****/
router.post('/salvaModifiche',salvaModificheStruttura);

async function salvaModificheStruttura(req,res,next) {
    const db = await makeDb(config);
    try {

        await withTransaction(db, async () => {
            await db.query("UPDATE struttura SET nome_struttura=?, indirizzo_struttura=? ,cap=? punti_di_interesse=?, citta=?, regione=?,\
                stato=? ,tipo=? ,disdetta_gratuita=? ,modalita_di_pagamento=? ,tassa_soggiorno=? ,servizi=?, ora_checkin=? ,ora_checkout=? WHERE  id_struttura=req.body.id_struttura)",
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
                req.body.ora_checkout

            ]).catch(err => {
                throw err;
            })
            res.send("success");
        })


    }catch (error) {
        res.send('error');
        throw error;
    }

}

/*****all'interno di modifica struttura abbiamo aggiungi camera ,modifica ed elimina ******/
        /*******aggiungi camera****/
router.post('/aggiungiCamera',aggiungiCamera);

async function aggiungiCamera(res,req,next){
    const db = await makeDb(config);
    try {

        await withTransaction(db, async () => {
            await db.query("INSERT INTO camera(id_struttura,nome_camera,numero_posti_letto,costo_camera,colazione_inclusa) VALUES ?", [
                [
                    [
                        req.body.id_stuttura,
                        req.body.nome_struttura,
                        req.body.numero_posti_letto,
                        req.body.costo_camera,
                        req.body.colazione_inclusa
                    ]
                ]
            ]).catch(err => {
                throw err;
            });
            res.send("success");
        })

    }catch(err) {
        res.send('error');
        throw error;
    }
}
/******************modifica_camera*************/

router.post("/modificaCamera",modificaCamera);

async function modificaCamera(res,req,next){
    const db= await makeDb(config);
    try{
        await withTransaction(db,async()=>{
            await db.query("UPDATE camera SET nome_camera=?, numero_posti_letto=?, costo_camera=?, colazione_inclusa=? WHERE id_camera=req.body.id_camera)",[
                req.body.nome_camera,
                req.body.numero_posti_letto,
                req.body.costo_camera,
                req.body.colazione_inclusa
            ]).catch(err=>{
                throw err;
            })
            res.send("success");
        })

    }catch (error) {
        res.send('error');
        throw error;
    }
}

/**************elimina camera***********/

router.post("/eliminaCamera",eliminaCamera);

async function eliminaCamera(req,res,next) {
    const db = makeDb(config);
    try {
        await withTransaction(db, async () => {
            await db.query("DELETE FROM `camera` WHERE `camera`.`id_camera` =?", [
                req.body.id_camera
            ]).catch(err => {
                throw err;
            })
            res.send("success");
        })

    }catch(err){
        res.send('error');
    }
}

/*****************************elimina struttura*********************************/

router.post("/eliminaStruttura",eliminaStruttura);

async function  eliminaStruttura(res,req,next){
    const db= makeDb(config);
    try{
        await withTransaction(db,async ()=>{
        await db.query("DELETE FROM `struttura` WHERE `struttura`.`id_struttura` =? ",[
            req.body.id_struttura
        ]).catch(err=>{
            throw err;
        })
        res.send("success");
        });
    }catch (error) {
        res.send("error");
        throw error;
    }
}

module.exports=router;