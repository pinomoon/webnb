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
    try {

        await withTransaction(db, async() => {
            var emailp=params['email'];
            results = await db.query("UPDATE `utente` SET conferma=true WHERE `utente`.email=?",[emailp])
                .catch(err => {
                    throw err;
                });


            console.log(results);
            console.log(`Utente ${req.body.email} inserito!`);
            res.send("Account confermato con successo! Vai alla HomePage per effettuare l'accesso");

        });
    } catch (err) {
        console.log(err);
        res.send("Siamo spiacenti si è verificato un errore imprevisto")
        next(createError(500));
    }
}





module.exports = router;