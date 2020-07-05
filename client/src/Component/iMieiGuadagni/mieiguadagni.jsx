import React, {useState} from 'react';
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import BoxGuadagni from "./boxguadagni";

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
              if(response.data[0]=="1"){//guadagni calcolati

                    setNumPrenotazioni(response.data[1].num_pren);
                    setGuadagno(response.data[1].guadagno);
                    handleClickOpenTotale();

              }
              else{   //guadagni non calcolati
                    handleClickOpenTotale();
              }
          })
          .catch((error)=>{
                alert(error);
      });
    };

    return(
        <div className="container mt-10">

            <div name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">

                <h5>Calcola qui i tuoi guadagni</h5>

                <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                       type="date"
                       name="data_iniziale"
                       id="data_iniziale"
                       placeholder="date placeholder"
                       value={state.data_iniziale}
                       onChange={handleChangeDataIniziale}
                />
                <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                       type="date"
                       name="data_finale"
                       id="data_finale"
                       placeholder="date placeholder"
                       value={state.data_finale}
                       onChange={handleChangeDataFinale}
                />
                <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"auto",color:"#ff6300",display:"block"}}>Calcola Guadagni</Button>
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
    );
};
export default MieiGuadagni;