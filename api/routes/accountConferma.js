var express = require('express');
var router = express.Router();
var createError= require('http-errors');
var querystring=require('querystring');
var url=require('url');
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");

router.get('/',confermacc);


async function confermacc(req,res,next){
    var params=querystring.parse(url.parse(req.url).query);
    const db = await makeDb(config);
    let results = {};

    var emailp=params['email'];
    try {

        await withTransaction(db, async() => {
            results=await  db.query("SELECT conferma_account FROM utente WHERE utente.email=?",[emailp])
            if(results[0].conferma_account==true){
                res.send("La ta email è già stata verificata, effettua l'accesso")
            }else{
                results = await db.query("UPDATE `utente` SET conferma_account=true WHERE `utente`.email=?",[emailp])
                .catch(err => {
                    throw err;
                });
            }



            console.log(results);
            console.log(`Utente ${req.body.email} inserito!`);
            res.send("Account confermato con successo! Vai alla HomePage per effettuare l'accesso");

        });
    } catch (err) {

        console.log(err);
        res.send("Siamo spiacenti si è verificato un errore imprevisto: "+emailp)
        next(createError(500));
    }
}





module.exports = router;