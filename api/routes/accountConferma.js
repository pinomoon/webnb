var express = require('express');
var router = express.Router();
var createError= require('http-errors');

const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");

router.post('/',confermacc);


async function confermacc(req,res,next){

    const db = await makeDb(config);
    let results = {};


    try {

        await withTransaction(db, async() => {
            results=await  db.query("SELECT conferma_account FROM utente WHERE utente.token=?"
            ,[req.body.token]).catch(err=>{});
            if(results[0].conferma_account==true){
                res.send("3"); //La tua email è già stata verificata, effettua l'accesso
            }else{
                results = await db.query("UPDATE `utente` SET conferma_account=true WHERE `utente`.token=?"
                ,[req.body.token])
                .catch(err => {
                    throw err;
                });
            }
            console.log(results);

            res.send("1");  //"Account confermato con successo! Vai alla HomePage per effettuare l'accesso"

        });
    } catch (err) {

        console.log(err);
        res.send("2");  //Siamo spiacenti si è verificato un errore imprevisto:
        next(createError(500));
    }
}

module.exports = router;