import  * as React from "react";
import axios from 'axios';
import BoxAccesso from './boxconferma';
import {useContext} from "react";
import {UserContext} from "../../UserContext";
import {setSessionCookie, setUserCookie} from "../../sessions";




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
                    setSessionCookie({id:response.data[1],email:response.data[2],tipo:response.data[3]});
                    setUserCookie({ id:response.data[1],
                                    email:response.data[2],
                                    tipo:response.data[3],
                                    nome:response.data[4],
                                    cognome:response.data[5],
                                    sesso:response.data[6],
                                    data_di_nascita:response.data[6],
                                    indirizzo:response.data[7],
                                    citta:response.data[8],
                                    cap:response.data[9],
                                    titolare_carta:response.data[10],
                                    numero_carta:response.data[11],
                                    scadenza:response.data[12],
                                    cvc:response.data[13]
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

            <div className="container mt-10">
            <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">

                <p className="lead text-uppercase mt-3">Autenticazione</p>
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
                </div>

                <button name="ok" id="ok" type="submit" onClick={handleSubmit}className="btn btn-primary mt-3">Login</button>
            </form>
                <BoxAccesso
                    open={openConferma}
                    onClose={handleCloseConferma}
                    responseType={tipoRisposta}
                />



            </div>


        );

};
export default Login;