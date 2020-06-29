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
        <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"650px",height:"auto"}}>

            <img src={ops} style={{marginLeft:"290px",marginTop:"30px",height:"200px",width:"80px"}}/>
        <div className="container mt-10">
            <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">
                <h5 >Inserisci E-Mail per Recupero Credenziali</h5>

                    <label htmlFor="email">E-mail</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40" value={state.email}
                           onChange={handleChangeEmail} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>
                <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"400px",color:"#ff6300"}}>Invia</Button>
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

    );

};
export default PasswordDimenticata;