var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require("cors");

var indexRouter= require('./routes/index');


var registrazioneRouter = require('./routes/registrazione');
var prenotazioneRouter = require ('./routes/prenotazione');
var hostRouter = require('./routes/fhost/inserisciStruttura');
var accessoRouter = require('./routes/accesso');
var accountConfermaRouter= require('./routes/accountConferma');
var iMieiPreferitiRouter =require('./routes/futente/iMieiPreferiti');
var leMiePrenotazioniRouter =require('./routes/futente/leMiePrenotazioni');
var gestisciStruttureRouter=require('./routes/fhost/gestisciStruttura');
var inserisciStrutturaRouter=require('./routes/fhost/inserisciStruttura');
var gestisciPrenotazioniRouter=require('./routes/fhost/gestisciPrenotazioni');
var modificaAccountRouter= require('./routes/modificaAccount');
var guadagniRouter= require('./routes/fhost/guadagni');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/',indexRouter);
app.use('/iMieiPreferiti', iMieiPreferitiRouter);
app.use('/leMiePrenotazioni',leMiePrenotazioniRouter);
app.use('/registrazione',registrazioneRouter);
app.use('/prenotazione',prenotazioneRouter);
app.use('/host',hostRouter);
app.use('/accesso',accessoRouter);
app.use('/accountConferma', accountConfermaRouter);
app.use('/utente',utenteRouter);
app.use('/gestisciStrutture',gestisciStruttureRouter);
app.use('/inserisciStruttura',inserisciStrutturaRouter);
app.use('/gestisciPrenotazioni',gestisciPrenotazioniRouter);
app.use('/modificaAccount',modificaAccountRouter);
app.use('/guadagni',guadagniRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
