import React, {Component, useState} from 'react';
import villa from "../GestioneStrutture/villa.jpg";
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import BoxEliminaPref from "./boxeliminapref";



const ElencoPreferiti=()=> {
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [preferiti, setPreferiti]=useState([]);
    const [selectedPref, setSelectedPref]=useState("");
    const [openEliminaPref, setopenEliminaPref]= useState(false);

    const handleEliminaPref=(value)=>{
        setSelectedPref(value.id_struttura);
        setopenEliminaPref(true);
    }
    const handleCloseEliminaPref=()=>{
        setSelectedPref();
        setopenEliminaPref(false);
        window.location.reload();
    }

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/iMieiPreferiti", {id_utente})
            .then((response)=>{
                if(response.data[0]=="1") {
                    setPreferiti(response.data[1]);
                }
                else{
                    alert("errore");
                }
            })
            .catch((error)=>{
                alert(error);
            })
    },[]);

        return(

            <div className="container">
                <h5>I Miei Preferiti</h5>
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                        <div className="row">
                            {preferiti.map((value) =>{

                                return(
                                    <div className="col-sm-6 col-md-4 col-lg-5">
                                        <section className="cards clearfix">
                                            <div className="card" style={{width:"auto"}}>
                                                <img className="card_image" src={villa}  alt=" Villa "/>
                                                <div className="card_copy">
                                                    <h4>{value.nome_struttura}</h4>
                                                    <p>Tipo: {value.tipo}</p>
                                                    <p>Descrizione: {value.descrizione}</p>
                                                    <p>Indirizzo: {value.indirizzo_struttura}, {value.citta}, {value.regione}</p>
                                                    <div style={{margin:"auto"}}>
                                                        <Button onClick={()=>handleEliminaPref(value)} style={{color:"#ff6300"}}>Elimina</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                );
                            })

                            }


                            <div className="col-3"></div>

                        </div>


                    </div>
                    <div className="col-1">

                    </div>
                </div>
                <BoxEliminaPref
                    open={openEliminaPref}
                    onClose={handleCloseEliminaPref}
                    struttura={selectedPref}
                />

            </div>

        );

}

export default ElencoPreferiti;