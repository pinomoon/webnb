import React from 'react';
import ma from "../modifica_account/ma.png";
import Button from "@material-ui/core/Button";
import BoxConfermaModifica from "../modifica_account/boxconfermamodifica";
import {getSessionCookie, getUserCookie} from "../../sessions";
import {Component} from "react";
import bk from "./bk.jpg"
import axios from 'axios';


const Prenotazione =()=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    const id_camera = getUrlVars()["id_camera"];
    const data_inizio=getUrlVars()["data_inizio"];
    const data_fine=getUrlVars()["data_fine"];
    const numero_posti_letto=getUrlVars()["numero_posti_letto"];


    const[id_utente, setIdUtente]=React.useState(getSessionCookie().id);
    const[nome, setNome]=React.useState("");
    const[cognome, setCognome]=React.useState("");
    const[data_di_nascita, setData_di_nascita]=React.useState("");
    const[indirizzo, setIndirizzo]=React.useState("");
    const[sesso, setSesso]=React.useState("");
    const[citta,setCitta]=React.useState("");
    const[cap,setCap]=React.useState("");
    const[email, setEmail]=React.useState("");
    const[cellulare, setCellulare]=React.useState("");
    const[titolare_carta, setTitolareCarta]=React.useState("");
    const[numero_carta,setNumeroCarta]=React.useState("");
    const[scadenza,setScadenza]=React.useState("");
    const[cvc,setCvc]=React.useState("");

    const state={id_utente,  nome, cognome, data_di_nascita,sesso,indirizzo,citta,cap,cellulare,email,titolare_carta,numero_carta,scadenza,cvc};
    const state2={id_utente, id_camera,data_inizio,data_fine};

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/prenotazione/datiPrenotazione",state2)
            .then((response)=>{
                if(response.data[0]=="1"){
                    setNome(response.data[1].nome);
                    setCognome(response.data[1].cognome);
                    setData_di_nascita(response.data[1].data_di_nascita);
                    setSesso(response.data[1].sesso);
                    setIndirizzo(response.data[1].indirizzo);
                    setCitta(response.data[1].citta);
                    setCap(response.data[1].cap);
                    setCellulare(response.data[1].cellulare);
                    setEmail(response.data[1].email);
                    setTitolareCarta(response.data[1].titolare_carta);
                    setNumeroCarta(response.data[1].numero_carta);
                    setScadenza(response.data[1].scadenza);
                    setCvc(response.data[1].cvc);
                }
                else alert("Errore");

            })
            .catch((error)=>{
                alert(error);
            })
    },[]);


    const svuotaCampi=()=>{
        setNome("");
        setCognome("");
        setData_di_nascita("");
        setIndirizzo("");
        setSesso("");
        setCitta("");
        setCap("");
        setCellulare("");
        setTitolareCarta("");
        setNumeroCarta("");
        setScadenza("");
        setCvc("");
        setEmail("");
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
    const handleChangeCellulare=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCellulare(valore);
        state.cellulare=valore;
    };
    const handleChangeEmail=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setEmail(valore);
        state.email=valore;
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
    const handleSubmit=()=>{};




    return(

        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-6">
                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>

                        <img src={bk} style={{margin:"auto",marginTop:"30px",height:"30%",width:"40%",display:"block"}}/>
                        <div className="container mt-10" >
                            <form name="form" id="form"  className="container was-validated col-sm-8 mt-3" method="POST">

                                <h5>Dati anagrafici per la Prenotazione</h5>

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
                                    <br/>

                                    <label htmlFor="birthdate">Data di Nascita *</label>
                                    <input name="data_di_nascita" id="birthdate" type="date" className="form-control"
                                           value={state.data_di_nascita} onChange={handleChangeDataNascita} required/>
                                    <div className="invalid-feedback">
                                        Selezionare la data di nascita
                                    </div>
                                </div>
                                <h5>Indirizzo di Residenza</h5>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="name">Via/Piazza</label>
                                            <input id="indirizzo" name="indirizzo" type="text" className="form-control"
                                                   maxLength="40" value={state.indirizzo} onChange={handleChangeIndirizzo}
                                                   required/>
                                            <div className="invalid-feedback">
                                                Inserire Via e Numero Civico
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="name">Città</label>
                                            <input id="citta" name="citta" type="text" className="form-control" maxLength="40"
                                                   value={state.citta} onChange={handleChangeCitta} required/>
                                            <div className="invalid-feedback">
                                                Inserire Città
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <label htmlFor="name">CAP</label>
                                            <input id="cap" name="cap" type="text" className="form-control" maxLength="40"
                                                   value={state.cap} onChange={handleChangeCap} required/>
                                            <div className="invalid-feedback">
                                                Inserire CAP
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <br/>
                                    <label htmlFor="email">E-mail *</label>
                                    <input name="email" id="email" type="email" className="form-control" size="32"
                                           maxLength="40"
                                           value={state.email} onChange={handleChangeEmail} required/>
                                    <div className="invalid-feedback">
                                        Inserire indirizzo e-mail
                                    </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <br/>
                                            <label htmlFor="cellulare">Numero Cellulare</label>
                                            <input id="cellulare" name="cellulare" type="text" className="form-control" maxLength="40"
                                                   value={state.cellulare} onChange={handleChangeCellulare} required/>
                                            <div className="invalid-feedback">
                                                Inserire cellulare
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h5>Dati di Pagamento</h5>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="credit-card">Titolare </label>
                                            <input name="titolare_carta" id="titolare_carta" type="name" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.titolare_carta} onChange={handleChangeTitolareCarta}/>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="credit-card">Numero</label>
                                            <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.numero_carta} onChange={handleChangeNumeroCarta}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="credit-card">Scadenza</label>

                                            <input name="scadenza" id="scadenza" type="date" className="form-control"
                                                   size="32" maxLength="40" placeholder="scad"
                                                   value={state.scadenza} onChange={handleChangeScadenza}/>
                                        </div>


                                        <div className="col-4">
                                            <label htmlFor="credit-card">CVC</label>
                                            <input name="cvc" id="cvc" type="text" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.cvc} onChange={handleChangeCvc}/>
                                        </div>
                                    </div>
                                    <br/>

                                </div>

                                <br></br>

                                <div className="row">
                                    <div className="col-sm-3 col-md-2 col-lg-1">
                                        <Button href="/" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                                    </div>
                                    <div className="col-sm-6 col-md-8 col-lg-9">
                                    </div>
                                    <div className="col-sm-3 col-md-2 col-lg-1">
                                        <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Prenota</Button>
                                    </div>
                                    <div className="row">
                                        <br/>

                                    </div>
                                </div>
                                <br></br>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col">

                </div>
            </div>

        </div>


    );

};
export default Prenotazione;