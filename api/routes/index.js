var express= require("express");
var router= express.Router();
var fs= require('fs');
var path= require('path');
var createError= require('http-errors');
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");

var dir=path.join(__dirname,'public/immaginiStrutture');
var mime={
    jpg:'image/jpg',
    png:'image/png',
    gif:'image/gif'
}


router.post('/getImg',async function (req,res,next) {
    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {

            results = await db.query('SELECT * \
            FROM  gallery_struttura as g\
            WHERE g.id_struttura = ? ', [
                req.body.id_struttura
            ]).catch(err => {
                throw err;
            });

            console.log(JSON.stringify(results));
            if(results[0]){
                var immagine=results[0].immagine_1;
                console.log(results[0])
                console.log(immagine);
                console.log(dir);
                var file = path.join(dir, immagine);
                console.log(file.indexOf(dir+path.sep))
               // res.sendFile('../public/immaginiStrutture'+immagine, {root: __dirname, dotfiles:"allow"});
                if (file.indexOf(dir + path.sep) !== 0) {
                    console.log('1');
                    return res.status(403).end('Forbidden');
                }
                var type = mime[path.extname(file).slice(1)] || 'text/plain';
                console.log(type);
                var s = fs.createReadStream(file);
                console.log('s1------------------------')
                console.log(s);
                s.on('open', function () {
                    console.log('sono 1')
                    res.set('Content-Type', type);
                    s.pipe(res);
                });
                console.log('s2 ...........................')
                console.log(s)
                s.on('error', function () {
                    console.log('sono 2')
                    res.set('Content-Type', 'text/plain');
                    res.status(404).end('Not found');
                });

            }

        });
    } catch (err) {
        console.log(err);
        res.send("4");
        next(createError(500));
    }

})



module.exports=router