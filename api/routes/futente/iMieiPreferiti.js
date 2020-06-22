var express= require("express");
var router= express.Router();
var createError= require('http-errors');
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");

/* Elenco preferiti */

router.post('/', elencoPref);

async function elenco(req, res, next) {

    const db = await makeDb(config);
    let results = {};
    try {
        
    }catch(err){
        console.log(err);
        res.send('2');
        next(createError(500));
    }
}






module.exports = router;