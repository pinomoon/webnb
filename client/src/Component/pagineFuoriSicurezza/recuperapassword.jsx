import React from 'react';
import querystring from 'querystring';
import url from 'url';
import axios from "axios";
import BoxConfermaRecupero from "./boxconfermarecupero";


const RecuperaPassword=()=>{
   /* var params=querystring.parse(url.parse(url).query);
    const token=params('token');

    */

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var token = getUrlVars()["token"];
    console.log(token);
    const [openConferma, setOpenConferma]=React.useState(false);
    const [password, setPassword]=React.useState("");
    const [repass, setRepass]=React.useState("");
    const[tipoRisposta, setTipoRisposta]=React.useState("");

    const handleOpenClickConferma=()=>{
        setOpenConferma(true);
    };
    const handleCloseConferma=()=>{
      setOpenConferma(false);
      setTipoRisposta("");
    };

    const handleChangePassword=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setPassword(valore);
        state.password=valore;
    };
    const handleChangeRepass=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setRepass(valore);
    };

    const svuotaCampi=()=>{
        setPassword("");
        setRepass("");
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post('https://localhost:9000/accesso/nuoveCredenziali', state)
            .then((response)=>{
               if(response.data=="1"){
                   setTipoRisposta("1");
                   handleOpenClickConferma();
               }
               else if(response.data=="2"){
                   setTipoRisposta("2");
                   handleOpenClickConferma();
                   svuotaCampi();
               }
               else{
                   setTipoRisposta("3");
                   handleOpenClickConferma();
                   svuotaCampi();
               }
            })
            .catch(function(error){
                alert(error);
            });

    };
    const state={token, password};

    return(
        <div className="container mt-10">
            <form name="form" id="form"  className="container was-validated col-sm-8 mt-3" method="POST">
                <p className="lead text-uppercase">Recupero Credenziali</p>
                <div className="form-group">

                    <label htmlFor="pass">Nuova Password</label>
                    <input name="password" id="password" type="password" className="form-control"
                           title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                        //pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$"
                           size="32" maxLength="40" value={state.password} onChange={handleChangePassword}
                           required/>
                    <div className="invalid-feedback">
                        Almeno 8 caratteri di cui uno maiuscolo e un numero
                    </div>
                    <div className="valid-feedback text-warning">
                        Password media
                    </div>

                    <label htmlFor="repass">Reinserisci Nuova Password </label>
                    <input name="repass" id="repass" type="password" className="form-control" size="32"
                           maxLength="40" value={repass}
                           onChange={handleChangeRepass} required/>
                    <div className="invalid-feedback">
                        Le password devono coincidere
                    </div>
                </div>
                <button name="ok" id="ok" type="submit"  onClick={handleSubmit} className="btn btn-primary mt-3">Invia</button>
            </form>
            <BoxConfermaRecupero
                open={openConferma}
                onClose={handleCloseConferma}
                responseType={tipoRisposta}
            />
        </div>

    );

};

export default RecuperaPassword;