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

        <div>

            <h2 style={{textAlign:"center",fontFamily:"Helvetica Neue"}}>Le mie prenotazioni</h2>

            <div className="row" >
                <div className="col-2">
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="row">
                            {prenotazioni.map((value)=>{

                                return(
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <div className="card text-center" style={{width: "97%",height:"98%"}}>
                                            <div className="card-body">
                                                <h5 className="card-title"style={{fontWeight:"normal"}}>ID: {value.id_prenotazione}</h5>
                                                <hr style={{borderTop:" 2px solid #ff6300"}}/>
                                                <div className="card-text" style={{height:"50%"}}>
                                                    <ul className="list-group list-group-flush" style={{height:"10%",width:"100%"}}>
                                                        <li className="list-group-item"><b>{value.nome_struttura}</b></li>
                                                        <li className="list-group-item">{value.data_inizio.substr(0,10)}</li>
                                                        <li className="list-group-item">{value.data_fine.substr(0,10)}</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <hr style={{borderTop:" 2px solid #32508f"}}/>


                                                    {value.stato_prenotazione =="in attesa di conferma" &&

                                                    <p style={{color:"blue"}}> In attesa di conferma</p>



                                                    }
                                                    {value.stato_prenotazione =="confermata" &&
                                                    <div>
                                                        <p style={{color:"#00ff55"}}> Confermata</p>

                                                    </div>

                                                    }
                                                    {value.stato_prenotazione =="rifiutata" &&
                                                    <div>
                                                        <p style={{color:"red"}}> Rifiutata</p>

                                                    </div>

                                                    }
                                                    {value.stato_prenotazione =="soggiorno in corso" &&
                                                    <div>
                                                        <p style={{color:"#e6e600"}}> Soggiorno in corso</p>

                                                    </div>

                                                    }
                                                    {value.stato_prenotazione =="annullata" &&
                                                    <div>
                                                        <p style={{color:"red"}}> Annullata</p>

                                                    </div>

                                                    }

                                                    {value.stato_prenotazione == "soggiorno concluso" &&
                                                    <div>
                                                        <p style={{color: "#6B5B95"}}>Soggiorno Concluso</p>
                                                    </div>
                                                    }




                                                        <div className="col-sm-0 col-lg-12">
                                                {(value.stato_prenotazione == "in attesa di conferma"||value.stato_prenotazione == "confermata") &&
                                                <Button color="inherit" onClick={()=>handleAnnullaPren(value)} style={{color: "#ff6300"}}>Annulla Prenotazione</Button>
                                                }
                                                {value.stato_prenotazione == "soggiorno concluso" &&
                                                <Button color="inherit" onClick={()=>handleRecensisci(value)}style={{color: "#ff6300"}}>Recensisci</Button>
                                                }
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                )}) }
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
        </div>



    );

}
export default ElencoPrenotazioni;