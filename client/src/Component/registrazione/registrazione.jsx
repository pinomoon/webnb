import * as React from "react";
import {Component} from 'react'
import axios from 'axios';
import BoxConferma from './boxconferma';
import BoxRifiuto from "./boxrifiuto";
import personale from "../GestioneStrutture/personale1.jpg";
import Button from "@material-ui/core/Button";
import user from "./user.png"


const Registrazione=()=>{
    const[openConferma, setOpenConferma]=React.useState(false);
    const[openRifiuto,setOpenRifiuto]=React.useState(false);
    const[boxType, setBoxType]=React.useState("");
    const[nome, setNome]=React.useState("");
    const[cognome, setCognome]=React.useState("");
    const[tipo, setTipo]=React.useState("");
    const[data_di_nascita, setData_di_nascita]=React.useState("");
    const[indirizzo, setIndirizzo]=React.useState("");
    const[sesso, setSesso]=React.useState("");
    const[password,setPassword]=React.useState("");
    const[email,setEmail]=React.useState("");
    const[citta,setCitta]=React.useState("");
    const[cap,setCap]=React.useState("");
    const [titolare_carta, setTitolareCarta]=React.useState("");
    const[numero_carta,setNumeroCarta]=React.useState("");
    const[scadenza,setScadenza]=React.useState("");
    const[cvc,setCvc]=React.useState("");
    const[repass,setRepass]=React.useState("");
    const[cellulare,setCellulare]=React.useState("");
    const handleClickOpenConferma = () => {
        setOpenConferma(true);
        };
    const handleCloseConferma = () => {
        setOpenConferma(false);
        setBoxType("");
    };

    const handleClickOpenRifiuta = () => {
        setOpenRifiuto(true);
    };
    const handleCloseRifiuta = () => {
        setOpenRifiuto(false);
        setBoxType("");
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
    const handleChangeTipo=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setTipo(valore);
        state.tipo=valore;
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
    const handleChangePassword=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setPassword(valore);
        state.password=valore;
    };
    const handleChangeRepass=(event)=> {
        const target = event.target;
        const valore = target.value;
        setRepass(valore);
    };
    const handleChangeEmail=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setEmail(valore);
        state.email=valore;
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
    const handleChangeCellulare=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCellulare(valore);
        state.cellulare=valore;
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
    const state={nome, cognome, tipo, data_di_nascita,indirizzo,sesso,password,email,citta,cap,cellulare,titolare_carta,numero_carta,scadenza,cvc};
    const svuotaCampi=()=>{
        setEmail("");
        setPassword("");
        setRepass("");
    };


    const handleSubmit=(event) =>{
        if(document.forms[0].checkValidity()===false){
            return;
        }
        if(repass!==state.password){
            alert("Il campo Password e Reinserisci password devono coincidere"); //da fare con il box
            svuotaCampi();
            return;
        }
        event.preventDefault();
        alert(JSON.stringify(state));
        axios.post('https://localhost:9000/registrazione', state)
            .then((response)=>{
                alert(response.data);
                if(response.data=="1"){     //email già presente
                    /*
                    resetto i campi del form
                     */
                    setBoxType(response.data);
                    handleClickOpenRifiuta();
                    svuotaCampi();



                }
                else if (response.data=="2"){ //utente registrato correttamente
                    setBoxType(response.data);
                    handleClickOpenConferma();

                }
                else{                          //generico
                    alert("Errore");
                }
            })
            .catch(function(error){
                alert(error);
            });



    };



        return(
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-8">
            <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                <img src={user} style={{margin:"auto",marginTop:"30px",width:"30%",height:"30%",display:"block"}}/>

            <div  className="container mt-10" >

                <form  name="cita" id="form"  className="container was-validated col-sm-8 mt-3">
                    <h5>Per cominciare, sei un ...</h5>

                    <div className="row" style={{marginLeft:"auto",display:"block"}}>

                            <div className="custom-control custom-radio custom-control-inline mt-2">
                            <input type="radio" className="custom-control-input" id="host" name="tipo"
                                   value="0" onChange={handleChangeTipo} required/>
                            <label className="custom-control-label" htmlFor="host">Host</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mt-2">
                            <input type="radio" className="custom-control-input" id="cliente" name="tipo"
                                   value="1" onChange={handleChangeTipo}  required/>
                            <label className="custom-control-label" htmlFor="cliente">Cliente</label>

                        </div>

                        </div>
                        <br/>
                        <h5>Dati anagrafici</h5>

                        <div className="form-group">
                            <label htmlFor="nome">Nome *</label>
                            <input id="nome" name="nome" type="text" className="form-control" maxLength="40"
                                    onChange={handleChangeNome} required/>
                            <div className="invalid-feedback">
                                Inserire nome
                            </div>
                        </div>

                        <div className="form-group">
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
                            <div class="col-6">
                                <label htmlFor="name">Via/Piazza</label>
                                <input id="indirizzo" name="indirizzo" type="text" className="form-control"
                                       maxLength="40" value={state.indirizzo} onChange={handleChangeIndirizzo}
                                       required/>
                                <div className="invalid-feedback">
                                    Inserire Via e Numero Civico
                                </div>
                            </div>

                            <div class="col-6">
                                <label htmlFor="name">Città</label>
                                <input id="citta" name="citta" type="text" className="form-control" maxLength="40"
                                       value={state.citta} onChange={handleChangeCitta} required/>
                                <div className="invalid-feedback">
                                    Inserire Città
                                </div>
                            </div>
                            </div>
                            <div className="row">

                            <div class="col-5">
                                <label htmlFor="name">CAP</label>
                                <input id="cap" name="cap" type="text" className="form-control" maxLength="40"
                                       value={state.cap} onChange={handleChangeCap} pattern="^[0-9]{5,5}$" />
                                <div className="invalid-feedback">
                                    Inserire CAP
                                </div>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-9">
                                <label htmlFor="numtel">N. telefonico</label>
                                <input id="cellulare" name="cellulare" type="text" className="form-control" maxLength="40"
                                       value={state.cellulare} onChange={handleChangeCellulare} pattern="(^[+]{1,1}[0-9]{12,12}$)|(^[0-9]{10,10}$)|(^[0-9]{9,9}$)" required/>
                                <div className="invalid-feedback" >
                                    Inserire N. telefonico
                                </div>
                                </div>
                            </div>
                        </div>

                        <h5 >Dati di Pagamento</h5>

                        <div className="form-group">
                            <div className="row">
                            <div className="col-6">
                                <label htmlFor="credit-card">Titolare</label>
                                <input name="titolare_carta" id="titolare_carta" type="name" className="form-control"
                                       size="32" maxLength="40"
                                       value={state.titolare_carta} onChange={handleChangeTitolareCarta}/>
                            </div>
                            <div class="col-6">
                                <label htmlFor="credit-card">Numero</label>
                                <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control"
                                       size="32" maxLength="40" pattern="[0-9]{13,16}"
                                       value={state.numero_carta} onChange={handleChangeNumeroCarta}/>
                            </div>
                            </div>
                            <br/>
                            <div className="row">
                            <div className="col-4">
                                <label htmlFor="credit-card">Scadenza</label>
                                <input name="scadenza" id="scadenza" type="text" className="form-control"
                                       size="32" maxLength="40" placeholder="MM/AA" pattern="(^[0][1-9]\/[0][1-9]$)|(^[1-2][0-9]\/[0][1-9]$)|(^[0][1-9]\/[1][0-2]$)|(^[1-2][0-9]\/[1][0-2]$)|(^[3][0-1]\/[0][1-9]$)|(^[3][0-1]\/[1][0-2]$)"
                                       value={state.scadenza} onChange={handleChangeScadenza}/>
                            </div>


                            <div className="col-4">
                                <label htmlFor="credit-card">CVC</label>
                                <input name="cvc" id="cvc" type="text" className="form-control"
                                       size="32" maxLength="40" placeholder="123" pattern="^[0-9]{3,3}$"
                                       value={state.cvc} onChange={handleChangeCvc}/>
                            </div>
                            </div>

                        </div>

                        <p className="lead text-uppercase mt-3">Autenticazione</p>

                        <div className="form-group">
                            <label htmlFor="email">E-mail *</label>
                            <input name="email" id="email" type="email" className="form-control" size="32"
                            placeholder="casa.vacanze@bnb.our"
                            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                   maxLength="40"
                                   value={state.email} onChange={handleChangeEmail} required/>
                            <div className="invalid-feedback">
                                Inserire indirizzo e-mail
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="pass">Password *</label>
                            <input name="password" id="pass" type="password" className="form-control"
                                   title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                                   pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                                   size="32" maxLength="40" value={state.password} onChange={handleChangePassword}
                                   required/>
                            <div className="invalid-feedback">
                                Almeno 8 caratteri di cui uno maiusciolo e un numero. Sono ammessi caratteri speciali
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="repass">Reinserisci password *</label>
                            <input name="repass" id="repass" type="password" className="form-control" size="32"
                                   maxLength="40" pattern={state.password}
                                   value={repass}
                                   onChange={handleChangeRepass} required/>
                            <div className="invalid-feedback">
                                Le password devono coincidere
                            </div>
                        </div>


                    <div className="row">
                        <div className="col-1">
                            <Button name="ok" id="ok"  href="/" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                        </div>
                        <div className="col-9">
                        </div>
                        <div className="col-1">
                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Invia</Button>
                        </div>
                    </div>

                </form>
                    <BoxConferma
                        open={openConferma}
                        onClose={handleCloseConferma}
                    />
                    <BoxRifiuto
                        open={openRifiuto}
                        onClose={handleCloseRifiuta}
                    />



                </div>
            </div>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>

                    );


};
export default Registrazione;
