var express = require('express');
var router = express.Router();
const { config } = require("../db/config");
const { makeDb, withTransaction } = require("../db/dbmiddleware");


router.post('/',modifica);
router.post('/salvamodifiche',salvamodifiche);

async function modifica(req, res, next) {

  const db = await makeDb(config);
  let results = {};
  try {
    await withTransaction(db, async() => {

      results = await db.query('SELECT nome,cognome,data_di_nascita,indirizzo,sesso,citta,cap,cellulare,titolare_carta,numero_carta,scadenza,cvc  FROM utente,carta_credito WHERE utente.email=carta_credito.email AND id_utente = ?', [
          req.body.id_utente
      ])
          .catch(err => {
              throw err;
          });
          var risultato=['1',results[0]];
          res.send(risultato);
    })
  }catch(err) {
    console.log(err);
    res.send("2");
    next(createError(500));
  }
}


async function salvamodifiche(req, res, next) {

  const db = await makeDb(config);
  let results = {};
  try {
    await withTransaction(db, async() => {
       
      if(req.body.repassword!=null){
        let pwdhash = crypto.createHash('sha512');
        pwdhash.update(req.body.password);
        let encpsw= pwdhash.digest('hex');
          results = await db.query("SELECT password FROM utente WHERE utente.id_utente=req.body.id_utente")
            .catch(err=>{
              throw err;
            });
            if(results==encpsw){
              let pwdhash = crypto.createHash('sha512');
              pwdhash.update(req.body.repassword);
              let encpsw= pwdhash.digest('hex');

              results = await db.query("UPDATE utente SET nome=?,cognome=?,data_di_nascita=?,indirizzo=?,sesso=?,password=?,citta=?,cap=?,cellulare=?) WHERE id_utente=req.body.id_utente"
               , 
                   
                     [
                      req.body.nome,
                      req.body.cognome,
                      req.body.data_di_nascita,
                      req.body.indirizzo,
                      req.body.sesso,
                      encpsw,
                      req.body.citta,
                      req.body.cap,
                      req.body.cellulare
                       ]
                     ).catch(err=>{
                        throw err;
                       });


                    
                        results= await db.query("UPDATE carta_credito SET titolare_carta=? numero_carta=?,scadenza=?,cvc=? WHERE carta_credito.email=req.body.email",
                        [
                         
                             req.body.titolare_carta,
                             req.body.numero_carta,
                             req.body.scadenza,
                             req.body.cvc
                        ])
                         .catch(err => {
                            res.send('inserimento carta fallito ');
                            throw err;
                          });
                res.send("Modifiche effettuate con successo");
            }
            else{
              res.send("La vecchia password inserita non è corretta, non è possibile aggiornare i dati");
            }
        

  }
  else{
   
      results = await db.query("UPDATE utente SET nome=?,cognome=?,data_di_nascita=?,indirizzo=?,sesso=?,citta=?,cap=?,cellulare=? WHERE utente.id_utente=req.body.id_utente"
        , 
            
             [
        req.body.nome,
        req.body.cognome,
        req.body.data_di_nascita,
        req.body.indirizzo,
        req.body.sesso,
        req.body.citta,
        req.body.cap,
        req.body.cellulare
            ]).catch(err=>{
        throw err;
    });


    
    results= await db.query("UPDATE carta_credito SET titolare_carta=?,numero_carta=?,scadenza=?,cvc=? WHERE carta_credito.email=req.body.email",
        [
            
            req.body.titolare_carta,    
            req.body.numero_carta,
            req.body.scadenza,
            req.body.cvc
            
        
            
        ])
        .catch(err => {
            res.send('inserimento carta fallito ');
            throw err;
        });

        res.send("Modifiche effettuate con successo");
  
  }
})
}catch (err) {
  console.log(err);
  res.send("Le modifiche non sono andate a buon fine,riprova");
  next(createError(500));
  }
}
 
module.exports = router;
