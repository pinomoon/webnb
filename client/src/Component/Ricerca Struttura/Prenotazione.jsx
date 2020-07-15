import React, {useState} from 'react';
import ma from "../modifica_account/ma.png";
import Button from "@material-ui/core/Button";
import BoxConfermaModifica from "../modifica_account/boxconfermamodifica";
import {getSessionCookie, getUserCookie} from "../../sessions";
import {Component} from "react";
import bk from "./bk.jpg"
import axios from 'axios';
import Divider from "@material-ui/core/Divider";
import BoxConfermaPrenotazione from "./boxconfermaprenotazione";


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
    const[modalita_pagamento, setModalitaPagamento]=useState("");
    const[n18, setN18]=useState();
    const[viaggio_lavoro, setViaggioLavoro]=useState("0");
    const [struttura, setStruttura]=useState([]);
    const [pagamento_accettato, setPagamentoAccettato]=useState("");
    const [costo_camera, setCostoCamera]=useState();
    const [tassa_soggiorno, setTassaSoggiorno]=useState();
    const [importi, setImporti]=useState([]);
    const [importo_calcolato, setImportoCalcolato]=useState(false);
    const [id_struttura, setIdStruttura]=useState("");
    const [openConferma, setOpenConferma]=useState(false);
    const [tipoRisposta, setTipoRisposta]=useState("");

    const state={id_utente,id_struttura,data_fine, data_inizio, modalita_pagamento,importi, n18, viaggio_lavoro,  nome, cognome, data_di_nascita,sesso,indirizzo,citta,cap,cellulare,email,titolare_carta,numero_carta,scadenza,cvc};
    const state2={id_utente, id_camera,data_inizio,data_fine};
    const state3={costo_camera, data_inizio, data_fine, viaggio_lavoro,tassa_soggiorno,n18};
    //costo_camera, data fine e inizio, lavoro,tassa soggiorno, n18
    React.useLayoutEffect(()=>{
        alert(id_utente);
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
                    setStruttura(response.data[2]);
                    setPagamentoAccettato(response.data[2][0].modalita_di_pagamento);
                    setCostoCamera(response.data[2][0].costo_camera);
                    setTassaSoggiorno(response.data[2][0].tassa_soggiorno);
                    setIdStruttura(response.data[2][0].id_struttura);
                    console.log(response.data[2][0].modalita_di_pagamento);
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
    const handleChangeModalitaPagamento=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setModalitaPagamento(valore);
        state.modalita_pagamento=valore;
    };
    const handleChangeViaggioLavoro=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setViaggioLavoro(valore);
        state.viaggio_lavoro=valore;
    };
    const handleChangeN18=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setN18(valore);
        state.n18=valore;
    };
    const handleOpenConferma=()=>{
        setOpenConferma(true);
    };
    const handleCloseConferma=()=>{
        setTipoRisposta("");
        setOpenConferma(false);
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("https://localhost:9000/prenotazione",state)
            .then((response)=>{
                    setTipoRisposta(response.data);
                    handleOpenConferma();
            })
            .catch((error)=>{
                alert(error);
            })

    };

    const handleCalcolaImporti=(event)=>{
        event.preventDefault();
        axios.post("https://localhost:9000/prenotazione/calcoloImporti",state3)
            .then((response)=>{
                if(response.data[0]=="1"){
                    setImporti([response.data[1],response.data[2]]);
                    setImportoCalcolato(true);
                }
                else{
                    alert("Errore nel calcolo dell'importo, impossibile procedere");
                }
            })
            .catch((error)=>{
                alert(error);
            })
    }




    return(

        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-6">
                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>

                        <img src={bk} style={{margin:"auto",marginTop:"30px",height:"30%",width:"40%",display:"block"}}/>
                        <div className="container mt-10" >
                            <h5>Dati anagrafici per la Prenotazione</h5>
                            <p>Nome: {nome}</p>
                            <p>Cognome: {cognome}</p>
                            <p>Sesso: {sesso}</p>
                            <p>Data di Nascita: {data_di_nascita}</p>
                            <br/>
                            <h5>Indirizzo di Residenza</h5>
                            <p>Via: {indirizzo}</p>
                            <p>Città: {citta}</p>
                            <p>Cap: {cap}</p>
                            <br/>
                            <h5>Dati Account</h5>
                            <p>E-Mail: {email}</p>
                            <p>Cellulare: {cellulare}</p>
                            <br/>
                            <h5>Riepilogo Dati Struttura</h5>
                            {struttura.map(value=>{

                            return(
                                <div>
                            <p>Nome Struttura: {value.nome_struttura}</p>
                            <p>Indirizzo Struttura: {value.indirizzo_struttura}, {value.citta} {value.cap}, {value.regione}, {value.stato}</p>
                            <p>Tipo Struttura: {value.tipo}</p>
                            <br/>

                            <h5>Riepilogo Dati Camera</h5>
                            <p>Nome Camera: {value.nome_camera}</p>
                            <p>Numero Posti Letto: {value.numero_posti_letto}</p>
                            <p>Colazione Inclusa: {value.colazione_inclusa}</p>
                            <br/>
                                </div>
                                );
                               } )
                            }
                            <form  name="form" id="form"  className="container was-validated col-sm-8 mt-3">
                                <h5>Dati di Pagamento</h5>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="credit-card">Titolare </label>
                                            <input name="titolare_carta" id="titolare_carta" type="name" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.titolare_carta} onChange={handleChangeTitolareCarta} required/>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="credit-card">Numero Carta</label>
                                            <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.numero_carta} onChange={handleChangeNumeroCarta} required/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="scadenza">Scadenza</label>
                                            <input name="scadenza" id="scadenza" type="text" className="form-control"
                                                   size="32" maxLength="40" placeholder="MM/AA" pattern="(^[0][1-9]\/[0][1-9]$)|(^[1-2][0-9]\/[0][1-9]$)|(^[0][1-9]\/[1][0-2]$)|(^[1-2][0-9]\/[1][0-2]$)|(^[3][0-1]\/[0][1-9]$)|(^[3][0-1]\/[1][0-2]$)"
                                                   value={state.scadenza} onChange={handleChangeScadenza}/>
                                        </div>


                                        <div className="col-4">
                                            <label htmlFor="credit-card">CVC</label>
                                            <input name="cvc" id="cvc" type="text" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.cvc} onChange={handleChangeCvc} required/>
                                        </div>
                                    </div>
                                    <br/>

                                </div>

                                <br></br>
                                <div className="form-group">
                                    <h5>Tipo Viaggio e Numero Adulti</h5>
                                    <div className="row">
                                        <br/>
                                        <div className="col-1">
                                        </div>
                                        <div className="col-1">
                                            <input className="form-check-input" type="checkbox" id="lavoro" name="lavoro" value="1" onChange={handleChangeViaggioLavoro}/>
                                        </div>
                                        <div className="col-8">
                                            <label className="form-check-label " htmlFor="lavoro" >Viaggi per Lavoro?</label>
                                        </div>
                                        <br/>
                                        <label htmlFor="n18">Numero Adulti*</label>
                                        <input id="n18" name="n18" type='number' min="0" max={numero_posti_letto} className="form-control" maxLength="40"
                                               value={state.n18} onChange={handleChangeN18} required/>
                                        <br/>
                                        <br/>
                                        <h5>Scegli la Modalità di Pagamento</h5>
                                        {pagamento_accettato == "carta,struttura,anticipo_carta" &&
                                                <div>
                                                    <div className="custom-control custom-radio custom-control-inline mt-2">
                                                        <input type="radio" className="custom-control-input" id="carta"
                                                               name="modalita_di_pagamento"
                                                               value="carta" onChange={handleChangeModalitaPagamento}
                                                               required/>
                                                        <label className="custom-control-label" htmlFor="carta">Carta di
                                                            Credito</label>
                                                    </div>
                                                    <div
                                                        className="custom-control custom-radio custom-control-inline mt-2">
                                                        <input type="radio" className="custom-control-input"
                                                               id="struttura" name="modalita_di_pagamento"
                                                               value="struttura"
                                                               onChange={handleChangeModalitaPagamento} required/>
                                                        <label className="custom-control-label" htmlFor="struttura">Pagamento
                                                            in Struttura</label>

                                                    </div>
                                                    <div
                                                        className="custom-control custom-radio custom-control-inline mt-2">
                                                        <input type="radio" className="custom-control-input"
                                                               id="anticipo_carta" name="modalita_di_pagamento"
                                                               value="anticipo_carta"
                                                               onChange={handleChangeModalitaPagamento} required/>
                                                        <label className="custom-control-label"
                                                               htmlFor="anticipo_carta">Acconto con Carta di
                                                            Credito</label>

                                                    </div>
                                                </div>
                                        }
                                        {pagamento_accettato=="carta,struttura,"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="carta" name="modalita_di_pagamento"
                                            value="carta" onChange={handleChangeModalitaPagamento} required/>
                                            <label className="custom-control-label" htmlFor="carta">Carta di Credito</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="struttura" name="modalita_di_pagamento"
                                            value="struttura" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="struttura">Pagamento in Struttura</label>

                                            </div>
                                            </div>
                                        }
                                        {pagamento_accettato=="carta,,anticipo_carta"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="carta" name="modalita_di_pagamento"
                                            value="carta" onChange={handleChangeModalitaPagamento} required/>
                                            <label className="custom-control-label" htmlFor="carta">Carta di Credito</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="anticipo_carta" name="modalita_di_pagamento"
                                            value="anticipo_carta" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="anticipo_carta">Acconto con Carta di Credito</label>

                                            </div>
                                            </div>
                                        }
                                        {pagamento_accettato==",struttura,anticipo_carta"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="struttura" name="modalita_di_pagamento"
                                            value="struttura" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="struttura">Pagamento in Struttura</label>

                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="anticipo_carta" name="modalita_di_pagamento"
                                            value="anticipo_carta" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="anticipo_carta">Acconto con Carta di Credito</label>

                                            </div>
                                            </div>
                                        }
                                        {pagamento_accettato=="carta,,"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="carta" name="modalita_di_pagamento"
                                            value="carta" onChange={handleChangeModalitaPagamento} required/>
                                            <label className="custom-control-label" htmlFor="carta">Carta di Credito</label>
                                            </div>

                                            </div>
                                        }
                                        {pagamento_accettato==",struttura,"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="struttura" name="modalita_di_pagamento"
                                            value="struttura" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="struttura">Pagamento in Struttura</label>
                                            </div>
                                            </div>
                                        }
                                        {pagamento_accettato==",,anticipo_carta"&&
                                            <div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="anticipo_carta" name="modalita_di_pagamento"
                                            value="anticipo_carta" onChange={handleChangeModalitaPagamento}  required/>
                                            <label className="custom-control-label" htmlFor="anticipo_carta">Acconto con Carta di Credito</label>
                                            </div>
                                            </div>
                                        }
                                        <br/>
                                        <Divider/>
                                        {importo_calcolato==true &&
                                        <div>
                                            <h5>Importi Totali della Prenotazione </h5>
                                            <br/>
                                            <p>Data Check-In: {data_inizio}</p>
                                            <p>Data Check-Out: {data_fine}</p>
                                            <p>Numero Ospiti Adulti: {n18}</p>
                                            <p>Numero Bambini: {numero_posti_letto-n18}</p>
                                            <br/>
                                            <p>Prezzo Camera a Notte: {costo_camera}</p>
                                            <p>Totale Tasse di Soggiorno: {importi[1]}</p>
                                            <p>Totale Costo Camera: {importi[0]}</p>
                                            <h5>Totale Prenotazione: {importi[0]+importi[1]}</h5>
                                        </div>
                                        }

                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-sm-3 col-md-2 col-lg-1">
                                        <Button href="/" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                                    </div>
                                    <div className="col-sm-6 col-md-8 col-lg-9">
                                    </div>
                                    {importo_calcolato==false?(
                                        <div className="col-sm-3 col-md-2 col-lg-1">
                                            <Button name="ok" id="ok"  onClick={handleCalcolaImporti}
                                                    style={{marginLeft: "-10px", color: "#ff6300"}}>Calcola Importo Totale</Button>
                                        </div>
                                        ):(


                                        <div className="col-sm-3 col-md-2 col-lg-1">
                                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit}
                                                    style={{marginLeft: "-10px", color: "#ff6300"}}>Prenota</Button>
                                        </div>
                                    )
                                    }
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
                <BoxConfermaPrenotazione
                    open={openConferma}
                    onClose={handleCloseConferma}
                    responseType={tipoRisposta}
                />
        </div>


    );

};
export default Prenotazione;