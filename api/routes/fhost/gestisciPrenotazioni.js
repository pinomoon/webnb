var express= require("express");
var router= express.Router();


const {config}= require('../../db/config');

const { makeDb, withTransaction } = require("../../db/dbmiddleware");

/*********gestisci prenotazioni*********/


router.post("/",gestisciPrenotazioni);

async function gestisciPrenotazioni(req,res,next){
    const db= makeDb(config);
    let results={};

    await withTransaction(db,async ()=>{
        results= (await db).query("SELECT nome_struttura,nome_camera,stato_prenotazione")
    })

}



module.exports=router