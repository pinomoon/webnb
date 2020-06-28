import  * as React from "react";
import axios from 'axios';
import home from "./home.jpg"
import BoxAccesso from './boxconferma';
import {useContext} from "react";
import {UserContext} from "../../UserContext";
import {setSessionCookie, setUserCookie} from "../../sessions";
import Button from "@material-ui/core/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";




const Login =()=>{
    const {session}=useContext(UserContext);

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
            <div style={{margin:"auto",marginTop:"50px", border:"2px solid orange",borderRadius:"25px",width:"450px",height:"450px"}}>
                <img src={home} style={{marginLeft:"140px",marginTop:"30px",width:"160px",height:"80px"}}/>
            <div className="container mt-10">
            <div name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">


                <div className="form-group">

                    <label htmlFor="email">E-mail *</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" value={state.email}
                           onChange={handleChangeEmail} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>

                    <label htmlFor="pass">Password *</label>
                    <input name="password" id="pass" type="password" className="form-control"
                           title="Almeno 8 caratteri, una lettera maiuscola e un numero" value={state.password}
                          // pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$"
                        size="32" maxLength="40" required onChange={handleChangePassword}/>
                    <div className="invalid-feedback">
                        Almeno 8 caratteri di cui uno maiuscolo e un numero
                    </div>
                    <div className="valid-feedback text-warning">
                        Password media
                    </div>
                    <Button id="recupero"  href="https://localhost:3000/login/passwordDimenticata" style={{fontSize:"11px",marginLeft:"-10px",color:"#ff6300"}}><h7>Password dimenticata?</h7></Button>

                </div>


                <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"190px",color:"#ff6300"}}>Login</Button>





            </div>

                <BoxAccesso
                    open={openConferma}
                    onClose={handleCloseConferma}
                    responseType={tipoRisposta}
                />


            </div>
            </div>

        );

};
export default Login;