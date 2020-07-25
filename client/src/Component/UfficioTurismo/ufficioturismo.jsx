import React, {useState} from 'react';
import axios from 'axios';
import {getSessionCookie} from "../../sessions";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import BoxRispUfficio from "./boxrispufficio";
import t from "./t.jpg"

const UfficioTurismo=()=>{
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [data_trimestre, setDataTrimestre]=useState("");
    const [tipo_risposta, setTipoRisposta]=useState("");
    const [openRispUfficio, setOpenRispUfficio]=useState(false);
    const state={id_utente, data_trimestre};


    const handleChangeDataTrimestre=(event)=> {
        const target = event.target;
        const valore= target.value;
        setDataTrimestre(valore);
        state.data_trimestre=valore;
    };
    const handleOpenRispUfficio=()=>{
        setOpenRispUfficio(true);
    };
    const handleCloseRispUfficio=()=>{
        setOpenRispUfficio(false);
        setDataTrimestre("");
        setTipoRisposta("");
    };
    const handleSubmit=(event)=>{
        if(document.forms[0].checkValidity()===false){
            return;
        }
        event.preventDefault();
        axios.post("https://localhost:9000/documentiUfficioTurismo/",state)
            .then((response)=>{
                setTipoRisposta(response.data);
                handleOpenRispUfficio();
            })
            .catch((error)=>{
                alert(error);
            })

    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-lg-3">

                </div>
                <div className="col-sm-12 col-md-8 col-lg-6">



                    <div style={{marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                        <img src={t} style={{margin:"auto",marginTop:"30px",width:"30%",height:"auto%",display:"block"}}/>
                        <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">
                            <h2>Rendiconto Ufficio Turismo</h2>

                            <h6>Inserisci qui la data del periodo di fine trimestre per rendicontare le prenotazioni e le tasse all'ufficio turismo</h6>

                            <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                                   type="date"
                                   name="data_trimestre"
                                   id="data_trimestre"
                                   placeholder="date placeholder"
                                   value={state.data_trimestre}
                                   onChange={handleChangeDataTrimestre}
                                   required
                            />
                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"auto",color:"#ff6300",display:"block"}}>Calcola</Button>
                            <br/>
                        </form>
                        <BoxRispUfficio
                            open={openRispUfficio}
                            onClose={handleCloseRispUfficio}
                            responseType={tipo_risposta}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};
export default UfficioTurismo;