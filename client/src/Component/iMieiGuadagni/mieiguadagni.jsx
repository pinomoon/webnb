import React, {useState} from 'react';
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import BoxGuadagni from "./boxguadagni";
import money from "./m.PNG";

const MieiGuadagni=()=>{
    const [openTotale, setOpenTotale]=useState(false);
    const [tipoRisposta, setTipoRisposta]=useState("");
    const [guadagno, setGuadagno]=useState(0);
    const [num_prenotazioni, setNumPrenotazioni]=useState(null);
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [data_iniziale, setDataIniziale]=useState(null);
    const [data_finale, setDataFinale]=useState(null);
    const state={id_utente, data_iniziale,data_finale};

    const handleClickOpenTotale=()=>{
        setOpenTotale(true);
    };
    const handleCloseTotale=()=>{
        setOpenTotale(false);
        setTipoRisposta("");
        svuotaCampi();
    };
    const handleChangeDataIniziale=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataIniziale(valore);
        state.data_iniziale=valore;
    };
    const handleChangeDataFinale=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataFinale(valore);
        state.data_finale=valore;
    };
    const svuotaCampi=()=>{
        setDataIniziale("");
        setDataFinale("");
    };


    const handleSubmit=async (event)=>{
        event.preventDefault();
        await axios.post('https://localhost:9000/guadagni', state)
            .then((response)=>{
                setTipoRisposta(response.data[0]);
                if(response.data[0]=="1"){
                    setNumPrenotazioni(response.data[1].num_pren);
                    setGuadagno(response.data[1].guadagno);
                    handleClickOpenTotale();

                }
                else{
                    handleClickOpenTotale();
                }
            })
            .catch((error)=>{
                alert(error);
            });
    };

    return(

        <div className="container">
            <div className="row">
                <div className="col-md-2 col-lg-3">

                </div>
                <div className="col-sm-12 col-md-8 col-lg-6">



                    <div style={{marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                        <img src={money} style={{margin:"auto",marginTop:"30px",width:"30%",height:"auto%",display:"block"}}/>

                        <div name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">

                            <h5>Calcola qui i tuoi guadagni</h5>

                            <Input style={{width:"47%",backgroundColor:"white",marginTop:"9px"}}
                                   type="date"
                                   name="data_iniziale"
                                   id="data_iniziale"
                                   placeholder="date placeholder"
                                   value={state.data_iniziale}
                                   onChange={handleChangeDataIniziale}
                            />
                            &nbsp;
                            &nbsp;
                            <Input style={{width:"47%",backgroundColor:"white",marginTop:"9px"}}
                                   type="date"
                                   name="data_finale"
                                   id="data_finale"
                                   placeholder="date placeholder"
                                   value={state.data_finale}
                                   onChange={handleChangeDataFinale}
                            />
                            <br/>
                            <br/>
                            <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"auto",color:"#ff6300",display:"block"}}>Calcola Guadagni</Button>
                            <br/>
                        </div>

                        <BoxGuadagni
                            open={openTotale}
                            onClose={handleCloseTotale}
                            responseType={tipoRisposta}
                            data_iniziale={data_iniziale}
                            data_finale={data_finale}
                            num_prenotazioni={num_prenotazioni}
                            guadagni={guadagno}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
export default MieiGuadagni;