var express = require('express');
var router = express.Router();
const { config }= require('../db/config')
var mysql = require('mysql');
var connection= mysql.createConnection(config);
/* GET users listing. */
router.get('/', function(req, res) {
let sql='SELECT * FROM utente';
connection.query(sql,function (err,rows,fields){
    if(err){
        console.log('error in query...');

    }else
    {
        console.log('query done...');
        res.send(rows[0]);
    }
});

});

module.exports = router;
