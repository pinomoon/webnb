import React from 'react';
import axios from 'axios';
import BoxConfermaRecPass from "./boxconfermarecpass";
import user from "../registrazione/user.png";
import Button from "@material-ui/core/Button";
import ops from "./ops.png"
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
        if(document.forms[0].checkValidity()===false){
            return;
        }
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
        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-6">
        <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>

            <img src={ops} style={{margin:"auto",marginTop:"30px",height:"20%",width:"20%",display:"block"}}/>
        <div className="container mt-10">
            <form name="form" id="form" className="container was-validated col-sm-8 mt-3">
                <h5 >Inserisci E-Mail per Recupero Credenziali</h5>

                    <label htmlFor="email">E-mail</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" value={state.email}
                          pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={handleChangeEmail} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>
                <div className="row">
                    <div className="col-1">
                        <Button name="ok" id="ok"  href="/login" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                    </div>
                    <div className="col-9">
                    </div>
                    <div className="col-1">
                        <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Invia</Button>
                    </div>
                </div>
                <br></br>
                <br></br>
            </form>
        </div>
        <BoxConfermaRecPass
            open={openConferma}
            onClose={handleClose}
            responseType={tipoRisposta}
            email={email}
        />
        </div>
                </div>
                <div className="col">

                </div>
            </div>

        </div>

    );

};
export default PasswordDimenticata;