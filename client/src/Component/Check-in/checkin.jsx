import React, {Component, useState} from 'react';
import Form from "react-bootstrap/Form";
import Header from "../header/HeaderHost";
import Footer from "../footer/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import user from "../registrazione/user.png";
import BoxConferma from "../registrazione/boxconferma";
import BoxRifiuto from "../registrazione/boxrifiuto";
import {getSessionCookie} from "../../sessions";

const  Checkin=()=>{
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [id_prenotazione, setIdPrenotazione]=useState(1);
    const [nome_ospite, setNomeOspite]=useState("");
    const [cognome_ospite,setCognomeOspite]=useState("");
    const [data_nascita, setDataNascita]=useState("");
    const [sesso, setSesso]=useState("");
    const [indirizzo, setIndirizzo]=useState("");
    const [citta, setCitta]=useState("");
    const [cap, setCap]=useState("");
    const [residenza, setResidenza]=useState("");
    const [n_documento, setNDocumento]=useState("");
    const [foto_documento, setFotoDocumento]=useState("");
    const state={id_utente,id_prenotazione, nome_ospite, cognome_ospite, data_nascita, sesso, residenza, n_documento, foto_documento };

    const handleSubmit=(event)=>{
        state.residenza=indirizzo+" "+citta+" "+" "+cap;
        alert("Campi inseriti: "+nome_ospite+" "+cognome_ospite+" "+data_nascita+" "+sesso+" "+indirizzo+" "+citta+" "+cap+" "+n_documento);
        event.preventDefault();
        axios.post("https://localhost:9000/gestisciPrenotazioni/inserisciOspiti", state)
            .then((response)=>{
                alert(response.data);
            })
            .catch((error)=>{
                alert(error);
            });

    };

    const handleChangeNome=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNomeOspite(valore);
        state.nome_ospite=valore;
    };
    const handleChangeCognome=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCognomeOspite(valore);
        state.cognome_ospite=valore;
    };
    const handleChangeDataNascita=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataNascita(valore);
        state.data_nascita=valore;
    };
    const handleChangeSesso=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setSesso(valore);
        state.sesso=valore;
    };
    const handleChangeIndirizzo=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setIndirizzo(valore);
    };
    const handleChangeCitta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCitta(valore);
    };
    const handleChangeCap=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCap(valore);
    };
    const handleChangeNDoc=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNDocumento(valore);
        state.n_documento=valore;
    };
    const handleChangeFotoDoc=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setFotoDocumento(valore);
        state.foto_documento=valore;
    };

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">

                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-6">
                        <div style={{
                            margin: "auto",
                            marginTop: "50px",
                            border: "2px solid #ff6300",
                            borderRadius: "25px",
                            width: "100%",
                            height: "auto"
                        }}>
                            <img src={user} style={{
                                margin: "auto",
                                marginTop: "30px",
                                width: "30%",
                                height: "30%",
                                display: "block"
                            }}/>

                            <div className="container mt-10">

                                <form name="form" id="form" className="container was-validated col-sm-8 mt-3"
                                      method="POST">
                                    <h5>Dati anagrafici dell'Ospite</h5>

                                    <div className="form-group">
                                        <label htmlFor="name">Nome *</label>
                                        <input id="nome" name="nome" type="text" className="form-control" maxLength="40"
                                               value={state.nome_ospite} onChange={handleChangeNome} required/>
                                        <div className="invalid-feedback">
                                            Inserire nome
                                        </div>

                                        <label htmlFor="surname">Cognome *</label>
                                        <input id="cognome" name="cognome" type="text" className="form-control"
                                               maxLength="40"
                                               value={state.cognome_ospite} onChange={handleChangeCognome} required/>
                                        <div className="invalid-feedback">
                                            Inserire cognome
                                        </div>
                                    </div>

                                    <div className="custom-control custom-radio custom-control-inline mt-2">
                                        <input type="radio" className="custom-control-input" id="male" name="sesso"
                                               value="M"
                                               onChange={handleChangeSesso} required/>
                                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mt-2">
                                        <input type="radio" className="custom-control-input" id="female" name="sesso"
                                               value="F"
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
                                        <input name="data_di_nascita" id="birthdate" type="date"
                                               className="form-control"
                                               value={state.data_nascita} onChange={handleChangeDataNascita}
                                               required/>
                                        <div className="invalid-feedback">
                                            Selezionare la data di nascita
                                        </div>
                                    </div>

                                    <h5>Indirizzo di Residenza</h5>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="name">Via/Piazza</label>
                                                <input id="indirizzo" name="indirizzo" type="text"
                                                       className="form-control"
                                                       maxLength="40" value={indirizzo}
                                                       onChange={handleChangeIndirizzo}
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Inserire Via e Numero Civico
                                                </div>
                                            </div>

                                            <div className="col-3">
                                                <label htmlFor="name">Città</label>
                                                <input id="citta" name="citta" type="text" className="form-control"
                                                       maxLength="40"
                                                       value={citta} onChange={handleChangeCitta} required/>
                                                <div className="invalid-feedback">
                                                    Inserire Città
                                                </div>
                                            </div>

                                            <div className="col-3">
                                                <label htmlFor="name">CAP</label>
                                                <input id="cap" name="cap" type="text" className="form-control"
                                                       maxLength="40"
                                                       value={cap} onChange={handleChangeCap} required/>
                                                <div className="invalid-feedback">
                                                    Inserire CAP
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h5>Dati Documento di Identità</h5>

                                    <div className="form-group">
                                        <label htmlFor="n_documento">Numero Documento</label>
                                        <input id="n_documento" name="n_documento" type="text" className="form-control" maxLength="40"
                                               value={state.n_documento} onChange={handleChangeNDoc} required/>
                                        <div className="invalid-feedback">
                                            Inserire numero documento
                                        </div>

                                        <label htmlFor="foto_documento">Foto Documento</label>
                                        <input id="foto_documento" name="foto_documento" type="file" className="form-control"
                                               maxLength="40"
                                               value={state.foto_documento} onChange={handleChangeFotoDoc} required/>
                                        <div className="invalid-feedback">
                                            Inserire foto documento
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-1">
                                            <Button name="ok" id="ok" onClick={handleSubmit}
                                                    style={{marginLeft: "-10px", color: "#ff6300"}}>Indietro</Button>
                                        </div>
                                        <div className="col-9">
                                        </div>
                                        <div className="col-1">
                                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit}
                                                    style={{marginLeft: "-10px", color: "#ff6300"}}>Invia</Button>
                                        </div>
                                    </div>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );

};
export default Checkin;