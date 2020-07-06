import React, {Component, useState} from 'react';
import HeaderHost from "../header/HeaderHost";
import Footer from "../footer/Footer";
import villa from "./villa.jpg"
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import ModificaStruttura from "./modificastruttura";
import BoxConfermaModifica from "../modifica_account/boxconfermamodifica";
import AggiungiCamera from "../GestisciCamera/AggiungiCamera";
import BoxEliminaStruttura from "./boxeliminastruttura";
import EliminaCamera from "../GestisciCamera/eliminacamera";


const id_utente=getSessionCookie().id;

const GestisciStrutture=()=>{
    const [strutture, setStrutture]=useState([]);
    const [selectedStruttura,setSelectedStruttura]=useState();
    const [openModifica, setOpenModifica]=useState(false);
    const [openElimina, setOpenElimina]=useState(false);
    const [openAggiungiCamera, setOpenAggiungiCamera]=useState(false);
    const [openEliminaCamera, setOpenEliminaCamera]=useState(false);

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/gestisciStrutture",{id_utente})
            .then((response)=>{
                console.log(response.data);
                setStrutture(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            })
    },[]);

    const handleModifica=(struttura)=>{
        setSelectedStruttura(struttura);
        setOpenModifica(true);
    }

    const handleElimina=(struttura)=>{
        setSelectedStruttura(struttura.id_struttura);
        setOpenElimina(true);
        console.log(struttura);

    };
    const handleCloseElimina=()=>{
      setSelectedStruttura();
      setOpenElimina(false);
      window.location.reload();
    };

    const handleAggiungiCamera=(struttura)=>{
      setSelectedStruttura(struttura.id_struttura);
      setOpenAggiungiCamera(true);
    };
    const handleCloseAggiungiCamera=()=>{
        setSelectedStruttura();
        setOpenAggiungiCamera(false);
    };
    const handleEliminaCamera=(struttura)=>{
      setSelectedStruttura(struttura.id_struttura);
      setOpenEliminaCamera(true);
    };
    const handleCloseEliminaCamera=()=>{
      setSelectedStruttura();
      setOpenEliminaCamera(false);
    };





        return(

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 style={{textAlign:"center"}}>Le mie strutture</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                        <div className="row">
                            {strutture.map(value => {

                                var href="/modificaStruttura?id_struttura="+value.id_struttura;
                                var href2="/eliminaCamera?id_struttura="+value.id_struttura;
                                return(
                                <div key={value.id_struttura} className="col-sm-6 col-md-4 col-lg-3">
                                    <section className="cards clearfix">
                                        <div className="card" style={{width: "auto", height: "20%"}}>
                                            <img className="card_image" src={villa} alt=" Villa "/>
                                            <div className="card_copy">
                                                <h6 style={{textAlign:"center"}}>{value.nome_struttura}</h6>
                                                <p>{value.descrizione} </p>
                                                <div style={{margin: "auto"}}>
                                                    <Button href={href}  style={{color: "#ff6300"}}>Modifica Struttura</Button>
                                                    <Button onClick={()=>handleElimina(value)}style={{color: "#ff6300"}}>Elimina Struttura</Button>
                                                    <Button onClick={()=>handleAggiungiCamera(value)}style={{color: "#ff6300"}}>Aggiungi Camera</Button>
                                                    <Button href={href2}style={{color: "#ff6300"}}>Elimina Camera</Button>

                                                </div>
                                            </div>

                                        </div>


                                    </section>

                                </div>
                                ) })}

                            <div className="col-3"></div>

                        </div>
                    </div>

                    <div className="col-1">

                    </div>
                </div>
                <BoxEliminaStruttura
                    open={openElimina}
                    onClose={handleCloseElimina}
                    id_struttura={selectedStruttura}
                />
                <AggiungiCamera
                    open={openAggiungiCamera}
                    onClose={handleCloseAggiungiCamera}
                    id_struttura={selectedStruttura}
                />





            </div>


        );


}

export default GestisciStrutture