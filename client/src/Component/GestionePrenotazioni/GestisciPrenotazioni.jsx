import React, {Component, useState} from 'react';
import Footer from "../footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@material-ui/core/Button";
import HeaderHost from "../header/HeaderHost";
import axios from "axios";
import {getSessionCookie} from "../../sessions";
import BoxAccettaPren from "./BoxAccettaPren";
import BoxRifiutaPren from "./BoxRifiutaPren";
import checkin from "../Check-in/checkin";



 const GestisciPrenotazioni=()=> {
 const[id_utente,setIdUtente]=useState(getSessionCookie().id);
 const[prenotazioni,setPrenotazione]=useState([]);
 const[selectedPrenotazione,setSelectedPrenotazione]=useState();
 const[openAccetta,setOpenAccetta]=useState(false);
 const[openRifiuta,setOpenRifiuta]=useState(false)

     React.useLayoutEffect(()=>{
         axios.post("https://localhost:9000/gestisciPrenotazioni",{id_utente})
             .then((response)=>{
                 /*****/
                 if(response.data[0]=="1"){
                     setPrenotazione(response.data[1]);
                 }
                 else{
                     alert("error")
                 }

             }).catch(err=>{

                 alert(err)
         })
     },[])


     const handleAccetta=(values)=>{
         setSelectedPrenotazione(values.id_prenotazione);
         setOpenAccetta(true);
     }
     const handleCloseAccetta=()=>{
         setSelectedPrenotazione();
         setOpenAccetta(false);
         window.location.reload();
     }
     const handleRifiuta=(values)=>{
         setSelectedPrenotazione(values.id_prenotazione);
         setOpenRifiuta(true);

     }
     const handleCloseRifiuta=()=>{
     setSelectedPrenotazione();
     setOpenRifiuta(false);
     window.location.reload();
     }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                <div style={{margin:"auto",width:"100%"}}>
                    <h3>Lista prenotazioni</h3>
                    <br/>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"><h5>Id:</h5></div>
                            <div className="col-5"> <h5> Stato:</h5></div>
                            <div className="col-3"></div>
                        </div>
                    </ListGroup.Item>
                    {prenotazioni.map((values)=>{
                        var href="/checkin?id_prenotazione="+values.id_prenotazione;
                        return(
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col-4"><h5>Id: {values.id_prenotazione}</h5></div>
                                    <div className="col-5"> <h5> Stato: {values.stato_prenotazione}</h5></div>
                                    <div className="col-3">
                                        { values.stato_prenotazione=="in attesa di conferma" &&
                                            <div>
                                        <Button color="inherit" onClick={()=>handleAccetta(values)} style={{color:"#ff6300"}}>Accetta</Button>
                                            <br/>
                                            <Button color="inherit" onClick={()=>handleRifiuta(values)}  style={{color:"#ff6300"}}>Rifiuta</Button>
                                            </div>
                                        }
                                        { values.stato_prenotazione=="confermata" &&
                                        <div>
                                            <Button color="inherit" href={href}  style={{color:"#ff6300"}}>check-in</Button>
                                        </div>
                                        }
                                        { values.stato_prenotazione=="soggiorno in corso" &&
                                        <div>
                                            <Button color="inherit" style={{color:"#ff6300"}}>check-out</Button>

                                        </div>
                                        }

                                    </div>
                                </div>
                            </ListGroup.Item>
                        )
                    })}

                </ListGroup>
                </div>
                    </div>


                    <div className="col">

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

            </div>


        );

}
export default GestisciPrenotazioni;