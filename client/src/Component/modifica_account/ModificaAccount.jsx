import React, {Component, useState} from 'react';
import axios from "axios";
import {getSessionCookie, getUserCookie} from "../../sessions";
import BoxConferma from "../registrazione/boxconferma";
import BoxRifiuto from "../registrazione/boxrifiuto";



const ModificaAccount=()=>{
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const[openConferma, setOpenConferma]=React.useState(false);
    const[boxType, setBoxType]=React.useState("");
    const[nome, setNome]=React.useState(getUserCookie().nome);
    const[cognome, setCognome]=React.useState(getUserCookie().cognome);
    const[data_di_nascita, setData_di_nascita]=React.useState(getUserCookie().data_di_nascita);
    const[indirizzo, setIndirizzo]=React.useState(getUserCookie().indirizzo);
    const[sesso, setSesso]=React.useState(getUserCookie().sesso);
    const[citta,setCitta]=React.useState(getUserCookie().citta);
    const[cap,setCap]=React.useState(getUserCookie().cap);
    const [titolare_carta, setTitolareCarta]=React.useState(getUserCookie().titolare_carta);
    const[numero_carta,setNumeroCarta]=React.useState(getUserCookie().numero_carta);
    const[scadenza,setScadenza]=React.useState(getUserCookie().scadenza);
    const[cvc,setCvc]=React.useState(getUserCookie().cvc);
    const[email,setEmail]=React.useState(getUserCookie().email);





    const handleSubmit= async(event)=>{
        alert("sono stati inseriti dei campi:"+" "+JSON.stringify(state));
        event.preventDefault();
        let res = await axios.post('https://localhost:9000/modificaAccount/salvamodifiche', state)
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };

    const handleChangeNome=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNome(valore);
        state.nome=valore;
    };
    const handleChangeCognome=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCognome(valore);
        state.cognome=valore;
    };
    const handleChangeDataNascita=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setData_di_nascita(valore);
        state.data_di_nascita=valore;
    };
    const handleChangeIndirizzo=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setIndirizzo(valore);
        state.indirizzo=valore;
    };
    const handleChangeSesso=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setSesso(valore);
        state.sesso=valore;
    };


    const handleChangeCitta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCitta(valore);
        state.citta=valore;
    };
    const handleChangeCap=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCap(valore);
        state.cap=valore;
    };
    const handleChangeTitolareCarta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setTitolareCarta(valore);
        state.titolare_carta=valore;
    };
    const handleChangeNumeroCarta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNumeroCarta(valore);
        state.numero_carta=valore;
    };
    const handleChangeScadenza=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setScadenza(valore);
        state.scadenza=valore;
    };
    const handleChangeCvc=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCvc(valore);
        state.cvc=valore;
    };

    const state={id_utente, email, nome, cognome, data_di_nascita,sesso,indirizzo,citta,cap,titolare_carta,numero_carta,scadenza,cvc};



        return(

            <div className="container mt-10" >
                <form name="form" id="form"  className="container was-validated col-sm-8 mt-3" method="POST">

                    <p className="lead text-uppercase">Dati anagrafici</p>

                    <div className="form-group">
                        <label htmlFor="name">Nome *</label>
                        <input id="nome" name="nome" type="text" className="form-control" maxLength="40"
                               value={state.nome} onChange={handleChangeNome} required/>
                        <div className="invalid-feedback">
                            Inserire nome
                        </div>

                        <label htmlFor="surname">Cognome *</label>
                        <input id="cognome" name="cognome" type="text" className="form-control" maxLength="40"
                               value={state.cognome} onChange={handleChangeCognome} required/>
                        <div className="invalid-feedback">
                            Inserire cognome
                        </div>
                    </div>

                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input type="radio" className="custom-control-input" id="male" name="sesso" value="M"
                               onChange={handleChangeSesso} required/>
                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline mt-2">
                        <input type="radio" className="custom-control-input" id="female" name="sesso" value="F"
                               onChange={handleChangeSesso} required/>
                        <label className="custom-control-label" htmlFor="female">Donna</label>
                        <br></br>
                        <div className="invalid-feedback ml-2">
                            Inserire il genere
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Data di Nascita *</label>
                        <input name="data_di_nascita" id="birthdate" type="date" className="form-control"
                               value={state.data_di_nascita} onChange={handleChangeDataNascita} required/>
                        <div className="invalid-feedback">
                            Selezionare la data di nascita
                        </div>
                    </div>

                    <p className="lead text-uppercase mt-3">Indirizzo di Residenza</p>

                    <div className="form-group">
                        <div className="col-6">
                            <label htmlFor="name">Via/Piazza</label>
                            <input id="indirizzo" name="indirizzo" type="text" className="form-control"
                                   maxLength="40" value={state.indirizzo} onChange={handleChangeIndirizzo}
                                   required/>
                            <div className="invalid-feedback">
                                Inserire Via e Numero Civico
                            </div>
                        </div>

                        <div className="col-3">
                            <label htmlFor="name">Città</label>
                            <input id="citta" name="citta" type="text" className="form-control" maxLength="40"
                                   value={state.citta} onChange={handleChangeCitta} required/>
                            <div className="invalid-feedback">
                                Inserire Città
                            </div>
                        </div>

                        <div className="col-3">
                            <label htmlFor="name">CAP</label>
                            <input id="cap" name="cap" type="text" className="form-control" maxLength="40"
                                   value={state.cap} onChange={handleChangeCap} required/>
                            <div className="invalid-feedback">
                                Inserire CAP
                            </div>
                        </div>
                    </div>

                    <p className="lead text-uppercase mt-3">Dati di Pagamento</p>

                    <div className="form-group">
                        <div className="col-6">
                            <label htmlFor="credit-card">Titolare Carta di Credito</label>
                            <input name="titolare_carta" id="titolare_carta" type="name" className="form-control"
                                   size="32" maxLength="40"
                                   value={state.titolare_carta} onChange={handleChangeTitolareCarta}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="credit-card">Carta di Credito</label>
                            <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control"
                                   size="32" maxLength="40"
                                   value={state.numero_carta} onChange={handleChangeNumeroCarta}/>
                        </div>

                        <div className="col-3">
                            <label htmlFor="credit-card">Scadenza</label>
                            <input name="scadenza" id="scadenza" type="text" className="form-control"
                                   size="32" maxLength="40"
                                   value={state.scadenza} onChange={handleChangeScadenza}/>
                        </div>

                        <div className="col-3">
                            <label htmlFor="credit-card">CVC</label>
                            <input name="cvc" id="cvc" type="text" className="form-control"
                                   size="32" maxLength="40"
                                   value={state.cvc} onChange={handleChangeCvc}/>
                        </div>

                    </div>

                    <button name="ok" id="ok" type="submit" onClick={handleSubmit}
                            className="btn btn-primary mt-3">Invia
                    </button>
                </form>



            </div>


        );
};

export default ModificaAccount;