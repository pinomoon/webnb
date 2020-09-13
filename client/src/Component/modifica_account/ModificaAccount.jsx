import React, {useState} from 'react';
import axios from "axios";
import {getSessionCookie, getUserCookie, setUserCookie} from "../../sessions";
import BoxConfermaModifica from "./boxconfermamodifica";
import Button from "@material-ui/core/Button";
import ma from "./ma.png"

const ModificaAccount=()=>{
    const[tipoRisposta, setTipoRisposta]=React.useState("");
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const[openConferma, setOpenConferma]=React.useState(false);
    const[nome, setNome]=React.useState("");
    const[cognome, setCognome]=React.useState("");
    const[data_di_nascita, setData_di_nascita]=React.useState("");
    const[indirizzo, setIndirizzo]=React.useState("");
    const[sesso, setSesso]=React.useState("");
    const[citta,setCitta]=React.useState("");
    const[cap,setCap]=React.useState("");
    const [titolare_carta, setTitolareCarta]=React.useState("");
    const[numero_carta,setNumeroCarta]=React.useState("");
    const[scadenza,setScadenza]=React.useState("");
    const[cvc,setCvc]=React.useState("");
    const[email,setEmail]=React.useState(getSessionCookie().email);
    const[password, setPassword]=React.useState("");
    const[repassword,setRepassword]=React.useState("");
    let check_repass="";
    const[cellulare,setCellulare]=React.useState("");

    React.useLayoutEffect(()=>{
        async function fetchData(){
            await axios.post("https://localhost:9000/modificaAccount",{id_utente})
                .then((response)=>{
                    if(response.data[0]=="1"){
                        setNome(response.data[1][0].nome);
                        setCognome(response.data[1][0].cognome);
                        setIndirizzo(response.data[1][0].indirizzo);
                        setSesso(response.data[1][0].sesso)
                        setCitta(response.data[1][0].citta);
                        setCap(response.data[1][0].cap);
                        setCellulare(response.data[1][0].cellulare);
                        setTitolareCarta(response.data[1][0].titolare_carta);
                        setNumeroCarta(response.data[1][0].numero_carta);
                        setScadenza(response.data[1][0].scadenza);
                        setCvc(response.data[1][0].cvc);
                        if(response.data[1][0].sesso==="M"){
                            window.document.getElementById('male').setAttribute('checked','true');
                        }
                        else{
                            window.document.getElementById('female').setAttribute('checked','true');
                        }
                    }
                    else alert("Errore");

                })
                .catch((error)=>{
                    alert(error);
                })
        }
        fetchData();
    },[]);


    const handleClickOpenConferma=()=>{
        setOpenConferma(true);
    };
    const handleCloseConferma=()=>{
        setOpenConferma(false);
        setTipoRisposta("");
    };
    const svuotaCampi=()=>{
        setPassword("");
        setRepassword("");
        check_repass="";

    };
    const handleSubmit= async(event)=>{

        if(document.forms[0].checkValidity()===false){
            return;
        }
        event.preventDefault();
        let res = await axios.post('https://localhost:9000/modificaAccount/salvamodifiche', state)
            .then(function(response){
                if(response.data=="1"){
                    setTipoRisposta("1");
                    handleClickOpenConferma();
                }
                else if(response.data=="2"){
                    setTipoRisposta("2");
                    svuotaCampi();
                    handleClickOpenConferma();
                }
                else if(response.data=="3"){
                    setTipoRisposta("3");
                    handleClickOpenConferma();
                    svuotaCampi();
                }
                else{
                    setTipoRisposta("4");
                    handleClickOpenConferma();
                    svuotaCampi();
                }

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
    const handleChangeCellulare=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCellulare(valore);
        state.cellulare=valore;
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
    const handleChangePassword=(event)=>{
        const target=event.target;
        const valore=  target.value;

        if(valore!==""){
            window.document.getElementById('password').setAttribute('required','true');
            window.document.getElementById('repassword').setAttribute('required','true');
            window.document.getElementById('check_repass').setAttribute('required','true');
        }
        setPassword(valore);
        state.password=valore;
        if(state.password=='' && state.repassword=='' && check_repass==''){
            window.document.getElementById('password').removeAttribute('required');
            window.document.getElementById('repassword').removeAttribute('required');
            window.document.getElementById('check_repass').removeAttribute('required');
        }
    };

    const handleChangeRepassword=(event)=>{
        const target=event.target;
        const valore=  target.value;
        if(valore!==""){
            window.document.getElementById('password').setAttribute('required','true');
            window.document.getElementById('repassword').setAttribute('required','true');
            window.document.getElementById('check_repass').setAttribute('required','true');
        }
        setRepassword(valore);
        state.repassword=valore;
        if(state.password=='' && state.repassword=='' && check_repass==''){
            window.document.getElementById('password').removeAttribute('required');
            window.document.getElementById('repassword').removeAttribute('required');
            window.document.getElementById('check_repass').removeAttribute('required');
        }
    };
    const handleChangeCheckRepass=(event)=>{
        const target=event.target;
        const valore= target.value;
        if(valore!==""){
            window.document.getElementById('password').setAttribute('required','true');
            window.document.getElementById('repassword').setAttribute('required','true');
            window.document.getElementById('check_repass').setAttribute('required','true');
        }
        check_repass=valore;
        if(state.password=='' && state.repassword=='' && check_repass==''){
            window.document.getElementById('password').removeAttribute('required');
            window.document.getElementById('repassword').removeAttribute('required');
            window.document.getElementById('check_repass').removeAttribute('required');
        }

    };

    const state={id_utente, email, nome, cognome, data_di_nascita,sesso,indirizzo,citta,cap,cellulare,titolare_carta,numero_carta,scadenza,cvc, password, repassword};



    return(

        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-8">
                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>

                        <img src={ma} style={{margin:"auto",marginTop:"30px",height:"30%",width:"40%",display:"block"}}/>
                        <div className="container mt-10" >
                            <form name="form" id="form"  className="container was-validated col-sm-8 mt-3" method="POST">

                                <h5>Modfica dati anagrafici</h5>

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
                                        <div className="col-8">
                                            <label htmlFor="name">Numero Cellulare</label>
                                            <input id="cellulare" name="cellulare" type="text" className="form-control" maxLength="40"
                                                   value={state.cellulare} onChange={handleChangeCellulare} pattern="(^[+]{1,1}[0-9]{12,12}$)|(^[0-9]{10,10}$)|(^[0-9]{9,9}$)" required />
                                            <div className="invalid-feedback">
                                                Inserire cellulare
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <label htmlFor="name">CAP</label>
                                            <input id="cap" name="cap" type="text" className="form-control" maxLength="40"
                                                   value={state.cap} onChange={handleChangeCap} pattern="^[0-9]{5,5}$" />
                                            <div className="invalid-feedback">
                                                Inserire CAP
                                            </div>

                                        </div>
                                    </div>


                                </div>

                                <h5>Dati di Pagamento</h5>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-9">
                                            <label htmlFor="credit-card">Titolare </label>
                                            <input name="titolare_carta" id="titolare_carta" type="name" className="form-control"
                                                   size="32" maxLength="40"
                                                   value={state.titolare_carta} onChange={handleChangeTitolareCarta}/>
                                        </div>
                                        <div className="col-9">
                                            <label htmlFor="credit-card">Numero Carta</label>
                                            <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control"
                                                   size="32" maxLength="40" pattern="[0-9]{13,16}"
                                                   value={state.numero_carta} onChange={handleChangeNumeroCarta} placeholder="XXXX-XXXX-XXXX-XXXX"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="credit-card">Scadenza</label>
                                            <input name="scadenza" id="scadenza" type="text" className="form-control"
                                                   size="32" maxLength="40"  pattern="(^[0][1-9]\/[0][1-9]$)|(^[1-2][0-9]\/[0][1-9]$)|(^[0][1-9]\/[1][0-2]$)|(^[1-2][0-9]\/[1][0-2]$)|(^[3][0-1]\/[0][1-9]$)|(^[3][0-1]\/[1][0-2]$)"
                                                   value={state.scadenza} onChange={handleChangeScadenza} placeholder="MM/AA"/>
                                        </div>


                                        <div className="col-6">
                                            <label htmlFor="credit-card">CVC</label>
                                            <input name="cvc" id="cvc" type="text" className="form-control"
                                                   size="32" maxLength="40" pattern="^[0-9]{3,3}$"
                                                   value={state.cvc} onChange={handleChangeCvc} placeholder="123"/>
                                        </div>
                                    </div>
                                    <br/>

                                </div>
                                <h5>Modifica Password</h5>

                                <div id="io" className="form-group">
                                    <label htmlFor="password">Vecchia Password </label>
                                    <input class="password" id="password" type="password" className="form-control" size="32"
                                           maxLength="40" 
                                           onChange={handleChangePassword} />

                                    <label htmlFor="repassword">Nuova Password </label>
                                    <input  class="repassword" id="repassword" type="password" className="form-control"
                                            title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                                            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                            size="32" maxLength="40" onChange={handleChangeRepassword}
                                    />
                                    <div className="invalid-feedback">
                                        Almeno 8 caratteri di cui uno maiuscolo e un numero
                                    </div>


                                    <label htmlFor="check_repass">Reinserisci Nuova Password </label>
                                    <input class="check_repass" id="check_repass" type="password" className="form-control" size="32"
                                           maxLength="40" pattern={state.repassword} title="Il campo Nuova Password e Reinserisci Nuova Password devono coincidere"
                                           onChange={handleChangeCheckRepass} />
                                    <div className="invalid-feedback">
                                        Le password devono coincidere
                                    </div>
                                </div>



                                <br></br>

                                <div className="row">
                                    <div className="col-1">
                                        <Button name="close" id="close"  href={"/"} style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                                    </div>
                                    <div className="col-9">
                                    </div>
                                    <div className="col-1">
                                        <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Invia</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <BoxConfermaModifica
                            open={openConferma}
                            onClose={handleCloseConferma}
                            responseType={tipoRisposta}
                        />


                    </div>
                </div>
                <div className="col">

                </div>
            </div>

        </div>


    );
};

export default ModificaAccount;