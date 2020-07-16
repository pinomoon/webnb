import React, {useState} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from "axios";
import BoxAnnullaPren from "./boxannullapren";
import BoxRecensisci from "./boxrecensisci";



const ElencoPrenotazioni=()=>{
    const[id_utente,setIdUtente]=useState(getSessionCookie().id);
    const[prenotazioni,setPrenotazioni]=useState([]);
    const[selectedPrenotazione,setSelectedPrenotazione]=useState();
    const[openAnnullaPren, setOpenAnnullaPren]=useState(false);
    const[openRecensisci, setOpenRecensisci]=useState(false);

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/leMiePrenotazioni",{id_utente})
            .then((response)=>{
                if(response.data[0]=="1"){
                    setPrenotazioni(response.data[1]);
                }
                else{
                    alert("error")
                }

            }).catch(err=>{

            alert(err)
        })
    },[openAnnullaPren,openRecensisci]);

    const handleAnnullaPren=(value)=>{
        if(value.stato_prenotazione=="confermata"){
            var confirm1=window.confirm("Sei davvero sicuro di annullare la prenotazione? Se sei oltre la data di cancellazione gratuita, dovrai pagare ugualmente " +
                "l'intero importo del soggiorno, che verrà addebitato dalla tua carta di credito");
            if(confirm1==true){
                setSelectedPrenotazione(value.id_prenotazione);
                setOpenAnnullaPren(true);
            }
        }
        else{
            var confirm2=window.confirm("Sei davvero sicuro di voler annullare la prenotazione?");
            if(confirm2==true){
                setSelectedPrenotazione(value.id_prenotazione);
                setOpenAnnullaPren(true);
            }

        }


    }
    const handleCloseBoxAnnullaPren=()=>{
        setOpenAnnullaPren(false);
        setSelectedPrenotazione();
    };
    const handleRecensisci=(value)=>{
        setSelectedPrenotazione(value.id_prenotazione);
        setOpenRecensisci(true);
    }
    const handleCloseRecensisci=()=>{
        setOpenRecensisci(false);
        setSelectedPrenotazione();
    }

    return(

        <div className="container">
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div style={{margin:"auto",width:"100%"}}>
                        <h3>Lista prenotazioni</h3>
                        <br/>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col-sm-0 col-lg-1"><h5>Id:</h5></div>
                                    <div className="col-sm-0 col-lg-2"><h5>Struttura</h5></div>
                                    <div className="col-sm-0 col-lg-2"><h5>Data Inizio</h5></div>
                                    <div className="col-sm-0 col-lg-2"><h5>Data Fine</h5></div>
                                    <div className="col-sm-0 col-lg-3"> <h5> Stato:</h5></div>
                                    <div className="col-sm-0 col-lg-2"></div>
                                </div>
                            </ListGroup.Item>
                            {prenotazioni.map((value)=>{

                                return(
                                    <ListGroup.Item>
                                        <div className="row">
                                            <div className="col-sm-2 col-lg-1">{value.id_prenotazione}</div>
                                            <div className="col-sm-4 col-lg-2">{value.nome_struttura}</div>
                                            <div className="col-sm-4 col-lg-2">{value.data_inizio}</div>
                                            <div className="col-sm-4 col-lg-2">{value.data_fine}</div>
                                            <div className="col-sm-6 col-lg-3">
                                                {value.stato_prenotazione=="in attesa di conferma" &&
                                                <a >In attesa di conferma</a>
                                                }
                                                {value.stato_prenotazione=="confermata" &&
                                                <a style={{color: "#00ff55"}}>Confermata</a>
                                                }
                                                {value.stato_prenotazione=="soggiorno in corso"&&
                                                <a style={{color: "yellow"}}>Soggorno in corso</a>
                                                }
                                                {value.stato_prenotazione=="annullata"&&
                                                <a style={{color: "#ff0000"}}>Annullata</a>
                                                }
                                                {value.stato_prenotazione=="soggiorno concluso"&&
                                                <a >Soggiorno concluso</a>
                                                }
                                                {value.stato_prenotazione=="rifiutata"&&
                                                <a style={{color: "#ff0000"}}>Rifiutata</a>
                                                }
                                            </div>
                                            <div className="col-2">
                                                {(value.stato_prenotazione == "in attesa di conferma"||value.stato_prenotazione == "confermata") &&
                                                <Button color="inherit" onClick={()=>handleAnnullaPren(value)} style={{color: "#ff6300"}}>Annulla Prenotazione</Button>
                                                }
                                                {value.stato_prenotazione == "soggiorno concluso" &&
                                                <Button color="inherit" onClick={()=>handleRecensisci(value)}style={{color: "#ff6300"}}>Recensisci</Button>
                                                }
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                )}) }
                        </ListGroup>
                    </div>
                </div>


                <div className="col">

                </div>
            </div>
            <BoxAnnullaPren
                open={openAnnullaPren}
                onClose={handleCloseBoxAnnullaPren}
                prenotazione={selectedPrenotazione}
            />
            <BoxRecensisci
                open={openRecensisci}
                onClose={handleCloseRecensisci}
                prenotazione={selectedPrenotazione}
            />
        </div>



    );

}
export default ElencoPrenotazioni;