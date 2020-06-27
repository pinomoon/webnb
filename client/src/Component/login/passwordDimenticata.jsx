import React from 'react';
import axios from 'axios';
import BoxConfermaRecPass from "./boxconfermarecpass";
const PasswordDimenticata=()=>{
    const [openConferma, setOpenConferma]=React.useState(false);
    const [tipoRisposta, setTipoRisposta]=React.useState("");
    const [email, setEmail]=React.useState("");

    const handleOpenClickConfermaRecPass=()=>{
        setOpenConferma(true);
    };
    const handleClose=()=>{
      setOpenConferma(false);
      setTipoRisposta("");
    };
    const svuotaCampi=()=>{
      setEmail("");
    };
    const handleChangeEmail=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setEmail(valore);
        state.email=valore;
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("https://localhost:9000/accesso/recuperaCredenziali", state)
            .then((response)=>{
                if (response.data=="1"){
                    setTipoRisposta("1");
                    handleOpenClickConfermaRecPass();

                }
                else if(response.data=="2"){
                    setTipoRisposta("2");
                    handleOpenClickConfermaRecPass();
                    svuotaCampi();
                }
                else{
                    setTipoRisposta("3");
                    handleOpenClickConfermaRecPass();
                    svuotaCampi();
                }
            })
            .catch((error)=>{
                alert(error);
            });
    };
    const state={email};

    return(
        <div className="container mt-10">
            <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">
                <p className="lead text-uppercase mt-3">Inserisci E-Mail per Recupero Credenziali</p>

                    <label htmlFor="email">E-mail</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" value={state.email}
                           onChange={handleChangeEmail} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>
                <button name="invia" id="invia" type="submit" onClick={handleSubmit} className="btn btn-primary mt-3">Invia</button>
            </form>
        <BoxConfermaRecPass
            open={openConferma}
            onClose={handleClose}
            responseType={tipoRisposta}
            email={email}
        />
        </div>

    );

};
export default PasswordDimenticata;