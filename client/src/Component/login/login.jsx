import  * as React from "react";
import axios from 'axios';

import BoxAccesso from './boxconferma';
import {useContext} from "react";
import {UserContext} from "../../UserContext";




const Login =()=>{
    const {user, setUser}=React.useContext(UserContext);

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
        alert("sono stati inseriti dei campi: "+state.email+" "+state.password);
        event.preventDefault();
        axios.post('https://localhost:9000/accesso', state)
            .then((response)=>{
                if(response.data[0]=="1"){
                    setTipoRisposta("1");
                    setUser({id:response.data[1],
                             email:response.data[2],
                             tipo:response.data[3]});
                    setMessaggioBox("Accesso andato a buon fine! Clicca qui per andare alla tua HomePage!");
                    alert(messaggioBox+" "+response.data[0]+" "+response.data[1]+" "+response.data[2]+" "+response.data[3]);
                    handleClickOpenConferma();
                    alert(JSON.stringify(user));

                }
                else if(response.data=="2"){
                    setTipoRisposta("2");
                    setMessaggioBox("Email non ancora confermata, vai alla tua casella di posta per confermare");
                    alert(messaggioBox+" "+response.data);
                    handleClickOpenConferma();

                }
                else if(response.data=="3"){
                    setTipoRisposta("3");
                    setMessaggioBox("Password errata, riprova");
                    alert(messaggioBox+" "+response.data);
                    handleClickOpenConferma();
                    svuotaCampi();
                }
                else if(response.data=="4"){
                    setTipoRisposta("4");
                    setMessaggioBox("Utente non trovato, riprova");
                    alert(messaggioBox+" "+response.data);
                    handleClickOpenConferma();
                    svuotaCampi();
                }
                else{
                    alert("Errore generico");
                }
            })
            .catch(function(error){
                alert(error);
            });
    };
        return(
            <div class="container mt-10">
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




            </div>

        );

};
export default Login;