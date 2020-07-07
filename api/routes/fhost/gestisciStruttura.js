var express= require("express");
var router= express.Router();
var createError= require('http-errors');


/****elenco delle strutture******/
router.post('/',elencoStrutture);

const {config}= require('../../db/config');

const { makeDb, withTransaction } = require("../../db/dbmiddleware");

async function elencoStrutture(req,res,next) {
    let results={};
    const db = await makeDb(config);
    try {


        await withTransaction(db, async () => {
            results = await db.query("SELECT s.id_struttura,s.nome_struttura,s.descrizione, s.tipo, g.immagine_1 \
            FROM struttura as s, gallery_struttura as g \
            WHERE s.id_struttura=g.id_struttura AND s.id_utente=?"
            , [
                req.body.id_utente
            ]).catch(err=>{
                throw err;
            });
            var risultato=['1',results];
            console.log("il risultato è:"+ risultato);
            res.send(risultato); //elenco strutture caricato correttamente
        })

    }catch(err) {
        res.send('2'); //'siamo spiacenti si è verificato un errore inatteso'
    }
}

/******************modifica di una struttura************/


      /*****attributi da modificare****/

router.post('/modificaStruttura',modificaStruttura);

async function modificaStruttura(req,res,next){
    const db= await  makeDb(config);
    let results={};
    try {


        await withTransaction(db, async () => {
            results = await db.query("SELECT * \
            FROM struttura \
            WHERE struttura.id_struttura=? "
            , [req.body.id_struttura])
            .catch(err => {
            throw  err;

        });
        var risultato=['1',results];
        console.log(risultato);
        res.send(risultato);
    })

    }catch (error) {
        res.send('2');//'spiacenti si è verificato un errore inatteso'

    }

}
/**********salvaModificheStruttura*****/
router.post('/salvaModifiche',salvaModificheStruttura);

async function salvaModificheStruttura(req,res,next) {
    const db = await makeDb(config);
    try {

        await withTransaction(db, async () => {
           var results= await db.query("UPDATE struttura SET nome_struttura=?, indirizzo_struttura=? ,cap=?, punti_di_interesse=?, citta=?, regione=?,\
                stato=? ,tipo=? ,disdetta_gratuita=? ,modalita_di_pagamento=? ,tassa_soggiorno=? ,servizi=?, ora_checkin=? ,ora_checkout=?, descrizione=? WHERE  id_struttura=?",
                [

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
                    req.body.descrizione,
                    req.body.id_struttura


            ]).catch(err => {
                throw err;
            })
            console.log(results);
            res.send("1"); //Modifiche apportate con successo
        })


    }catch (error) {
        res.send('2'); //Errore
        throw error;
    }

}

/*****all'interno di modifica struttura abbiamo aggiungi camera ,modifica ed elimina ******/
        /*******aggiungi camera****/
router.post('/aggiungiCamera',aggiungiCamera);

async function aggiungiCamera(req,res,next){
    const db = await makeDb(config);
    try {

        await withTransaction(db, async () => {
            await db.query("INSERT INTO camera(id_struttura,nome_camera,numero_posti_letto,costo_camera,colazione_inclusa) VALUES ?", [
                [
                    [
                        req.body.id_struttura,
                        req.body.nome_camera,
                        req.body.numero_posti_letto,
                        req.body.costo_camera,
                        req.body.colazione_inclusa
                    ]
                ]
            ]).catch(err => {
                throw err;
            });
            res.send("1");//  Camera aggiunta con successo
        })

    }catch(err) {
        res.send('2');
        throw error;
    }
}
/******************modifica_camera*************/

router.post("/mostraCamera",mostraCamera);

async function mostraCamera(req,res,next){
    const db= await makeDb(config);
    let results={};
    try{
        await withTransaction(db,async()=>{
            results=await db.query("SELECT * FROM camera WHERE camera.id_struttura=?",[
                req.body.id_struttura
            ]).catch(err=>{
                throw err;
            });
            console.log(req.body.id_struttura);
            var risultato=['1',results];
            console.log(risultato);
            res.send(risultato);// Camera modificata con successo
        })

    }catch (error) {
        res.send('2');
        throw error;
    }
}

/**************elimina camera***********/

router.post("/eliminaCamera",eliminaCamera);

async function eliminaCamera(req,res,next) {
    const db = await makeDb(config);
    try {
        await withTransaction(db, async () => {
            await db.query("DELETE FROM `camera` WHERE `camera`.`id_camera` =?", [
                req.body.id_camera
            ]).catch(err => {
                throw err;
            })
            console.log(req.body.id_camera);
            res.send("1"); //Camera eliminata
        })

    }catch(err){
        res.send('2');
    }
}

/*****************************elimina struttura*********************************/

router.post("/eliminaStruttura",eliminaStruttura);

async function  eliminaStruttura(req,res,next){
    const db= await makeDb(config);
    try{
        await withTransaction(db,async ()=>{
        await db.query("DELETE FROM `struttura` WHERE `struttura`.`id_struttura` =? ",[
            req.body.id_struttura
        ]).catch(err=>{
            throw err;
        })
            console.log(req.body.id_struttura);
        res.send("1"); // elimina struttura
        });
    }catch (error) {
        res.send("2"); //
        throw error;
    }
}

module.exports=router;