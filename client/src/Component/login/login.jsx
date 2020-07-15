import  * as React from "react";
import axios from 'axios';
import cliente from "./home.jpg";
import BoxAccesso from './boxconferma';
import {setSessionCookie, setUserCookie} from "../../sessions";
import Button from "@material-ui/core/Button";

const Login =()=>{
    const[tipoRisposta,setTipoRisposta]=React.useState("");
    const[messaggioBox, setMessaggioBox]=React.useState("");
    const[openConferma, setOpenConferma]=React.useState(false);
    const[email, setEmail]=React.useState("");
    const[password, setPassword]=React.useState("");
    const state={email,password};

    const handleChangeEmail=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setEmail(valore);
        state.email=valore;
    };

    const handleChangePassword=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setPassword(valore);
        state.password=valore;
    };

    const handleCloseConferma = () => {
        setOpenConferma(false);
        setTipoRisposta("");
    };
    const handleClickOpenConferma = () => {
        setOpenConferma(true);
    };

    const svuotaCampi=()=>{
        setEmail("");
        setPassword("");
    };
    const handleSubmit=(event)=>{
        if(document.forms[0].checkValidity()===false){
            return;
        }
        event.preventDefault();
        axios.post('https://localhost:9000/accesso', state)
            .then((response)=>{
                if(response.data[0]=="1"){
                    setTipoRisposta("1");
                    handleClickOpenConferma();
                    setSessionCookie({id:response.data[1].id_utente,email:response.data[1].email,tipo:response.data[1].tipo});
                    setUserCookie({ id:response.data[1].id_utente,
                        email:response.data[1].email,
                        tipo:response.data[1].tipo,
                        nome:response.data[1].nome,
                        cognome:response.data[1].cognome,
                        sesso:response.data[1].sesso,
                        data_di_nascita:response.data[1].data_di_nascita,
                        indirizzo:response.data[1].indirizzo,
                        citta:response.data[1].citta,
                        cap:response.data[1].cap,
                        cellulare:response.data[1].cellulare,
                        titolare_carta:response.data[1].titolare_carta,
                        numero_carta:response.data[1].numero_carta,
                        scadenza:response.data[1].scadenza,
                        cvc:response.data[1].cvc
                    });

                }
                else if(response.data=="2"){
                    setTipoRisposta("2");
                    handleClickOpenConferma();

                }
                else if(response.data=="3"){
                    setTipoRisposta("3");
                    handleClickOpenConferma();
                    svuotaCampi();
                }
                else if(response.data=="4"){
                    setTipoRisposta("4");
                    handleClickOpenConferma();
                    svuotaCampi();
                }
                else{
                    alert("Errore generico");
                    handleClickOpenConferma();
                    setTipoRisposta("0");
                    setMessaggioBox("errore");
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
                <div className="col-sm-12 col-md-9 col-lg-6">
                    <div style={{marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                        <img src={cliente} style={{margin:"auto",marginTop:"30px",width:"30%",height:"auto%",display:"block"}}/>

                        <div className="container mt-10">
                            <form name="form" id="form" className="container was-validated col-sm-8 mt-3">


                                <div className="form-group">

                                    <label htmlFor="email">E-mail *</label>
                                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" value={state.email}
                                           pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={handleChangeEmail} required/>
                                    <div className="invalid-feedback">
                                        Inserire indirizzo e-mail
                                    </div>

                                    <label htmlFor="pass">Password *</label>
                                    <input name="password" id="pass" type="password" className="form-control"
                                           value={state.password}

                                           size="32" maxLength="40" required onChange={handleChangePassword}/>
                                    <div className="invalid-feedback">
                                        Inserire password
                                    </div>

                                    <Button id="recupero"  href="https://localhost:3000/login/passwordDimenticata" style={{fontSize:"11px",marginLeft:"-10px",color:"#ff6300"}}><h7>Password dimenticata?</h7></Button>
                                    <div className="row">
                                        <div className="col-1">
                                            <Button href="/" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                                        </div>
                                        <div className="col-9">
                                        </div>
                                        <div className="col-1">
                                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Invia</Button>
                                        </div>
                                    </div>


                                </div>



                            </form>

                            <BoxAccesso
                                open={openConferma}
                                onClose={handleCloseConferma}
                                responseType={tipoRisposta}
                            />


                        </div>
                        <br/>
                    </div>
                </div>
                <div className="col">

                </div>
            </div>
        </div>


    );

};
export default Login;