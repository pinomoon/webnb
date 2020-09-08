import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {getSessionCookie} from "../../sessions";
import BoxAccettaPren from "./BoxAccettaPren";
import BoxRifiutaPren from "./BoxRifiutaPren";
import Checkout from "../Check-out/Checkout";

const GestisciPrenotazioni=()=> {
    const[id_utente,setIdUtente]=useState(getSessionCookie().id);
    const[prenotazioni,setPrenotazione]=useState([]);
    const[selectedPrenotazione,setSelectedPrenotazione]=useState();
    const[openAccetta,setOpenAccetta]=useState(false);
    const[openRifiuta,setOpenRifiuta]=useState(false);
    const[openCheckout,setOpenCheckout]=useState(false);

    React.useLayoutEffect(()=>{
        axios.post("/gestisciPrenotazioni",{id_utente})
            .then((response)=>{
                if(response.data[0]=="1"){
                    setPrenotazione(response.data[1]);
                }
                else{
                    alert("error")
                }

            }).catch(err=>{

            alert(err)
        })
    },[openAccetta,openRifiuta,openCheckout]);


    const handleAccetta=(values)=>{
        setSelectedPrenotazione(values.id_prenotazione);
        setOpenAccetta(true);
    };
    const handleCloseAccetta=()=>{
        setSelectedPrenotazione();
        setOpenAccetta(false);
    };
    const handleRifiuta=(values)=>{
        setSelectedPrenotazione(values.id_prenotazione);
        setOpenRifiuta(true);

    };
    const handleCloseRifiuta=()=>{
        setSelectedPrenotazione();
        setOpenRifiuta(false);
    };
    const handleCheckout=(values)=>{
        setSelectedPrenotazione(values.id_prenotazione);
        setOpenCheckout(true);

    }
    const handleCloseCheckout=(values)=>{
        setOpenCheckout(false);

    }
    return(
        <div>

            <h2 style={{textAlign:"center",fontFamily:"Helvetica Neue"}}>Prenotazioni</h2>

            <div className="row" >
                <div className="col-2">
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="row">


                            {prenotazioni.map((values)=>{
                                var href="/checkin?id_prenotazione="+values.id_prenotazione;
                                return(
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <div className="card text-center" style={{width: "97%",height:"98%"}}>
                                            <div className="card-body">
                                                <h5 className="card-title"><h5 style={{fontWeight:"normal"}}>ID: {values.id_prenotazione}: </h5>{values.nome} {values.cognome}</h5>
                                                <hr style={{borderTop:" 2px solid #ff6300"}}/>
                                                <div className="card-text" style={{height:"50%"}}>
                                                    <ul className="list-group list-group-flush" style={{height:"10%",width:"100%"}}>
                                                        <li className="list-group-item" > <b>{values.nome_struttura}</b></li>
                                                        <li className="list-group-item"><b>{values.nome_camera}</b></li>
                                                        <li className="list-group-item">{values.data_inizio}</li>
                                                        <li className="list-group-item">{values.data_fine}</li>

                                                    </ul>


                                                </div>
                                                <div className="card-text">
                                                    <hr style={{borderTop:" 2px solid #32508f"}}/>



                                                    {values.stato_prenotazione =="in attesa di conferma" &&

                                                    <p style={{color:"blue"}}> In attesa di conferma</p>



                                                    }
                                                {values.stato_prenotazione =="confermata" &&
                                                    <div>
                                                    <p style={{color:"#00ff55"}}> Confermata</p>

                                                    </div>

                                                }
                                                {values.stato_prenotazione =="rifiutata" &&
                                                    <div>
                                                    <p style={{color:"red"}}> Rifiutata</p>

                                                    </div>

                                                }
                                                {values.stato_prenotazione =="soggiorno in corso" &&
                                                    <div>
                                                <p style={{color:"#e6e600"}}> Soggiorno in corso</p>

                                                    </div>

                                                }
                                                {values.stato_prenotazione =="annullata" &&
                                                    <div>
                                                    <p style={{color:"red"}}> Annullata</p>

                                                    </div>

                                                }

                                                {values.stato_prenotazione =="soggiorno concluso" &&
                                                    <div>
                                                    <p style={{color:"#6B5B95"}}>Soggiorno Concluso</p>


                                                    </div>

                                                }
                                                    <br/>





                                            <div className="col-sm-0 col-lg-12">
                                                { values.stato_prenotazione=="in attesa di conferma" &&
                                                <div className="row">
                                                    <div className="col-6">
                                                    <Button color="inherit" onClick={()=>handleAccetta(values)} style={{color:"#ff6300"}}>Accetta</Button>
                                                    </div>
                                                    <div className="col-6">
                                                    <Button color="inherit" onClick={()=>handleRifiuta(values)}  style={{color:"#ff6300"}}>Rifiuta</Button>
                                                    </div>
                                                </div>
                                                }
                                                { values.stato_prenotazione=="confermata" &&
                                                <div>
                                                    <Button color="inherit" href={href}  style={{color:"#ff6300"}}>check-in</Button>
                                                </div>
                                                }
                                                { values.stato_prenotazione=="soggiorno in corso" &&
                                                <div>
                                                    <Button color="inherit" onClick={()=>handleCheckout(values)} style={{color:"#ff6300"}}>check-out</Button>

                                                </div>
                                                }
                                            </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}

                    </div>



            </div>
            <BoxAccettaPren
                open={openAccetta}
                onClose={handleCloseAccetta}
                prenotazione={selectedPrenotazione}
            />
            <BoxRifiutaPren
                open={openRifiuta}
                onClose={handleCloseRifiuta}
                prenotazione={selectedPrenotazione}
            />
            <Checkout
                open={openCheckout}
                onClose={handleCloseCheckout}
                prenotazione = {selectedPrenotazione}
                />


        </div>
        </div>


    );

}
export default GestisciPrenotazioni;