import React, {useState} from 'react';
import villa from "./villa.jpg"
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import AggiungiCamera from "../GestisciCamera/AggiungiCamera";
import BoxEliminaStruttura from "./boxeliminastruttura";
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

const GestisciStrutture=()=>{
    const id_utente=getSessionCookie().id;
    const [strutture, setStrutture]=useState([]);
    const [selectedStruttura,setSelectedStruttura]=useState();
    const [openElimina, setOpenElimina]=useState(false);
    const [openAggiungiCamera, setOpenAggiungiCamera]=useState(false);


    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/gestisciStrutture",{id_utente})
            .then((response)=>{
                setStrutture(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            })
    },[openAggiungiCamera, openElimina]);


    const handleElimina=(struttura)=>{
        setSelectedStruttura(struttura.id_struttura);
        setOpenElimina(true);
    };
    const handleCloseElimina=()=>{
        setSelectedStruttura();
        setOpenElimina(false);
    };

    const handleAggiungiCamera=(struttura)=>{
        setSelectedStruttura(struttura.id_struttura);
        setOpenAggiungiCamera(true);
    };
    const handleCloseAggiungiCamera=()=>{
        setSelectedStruttura();
        setOpenAggiungiCamera(false);
    };

    return(

        <div className="container">
            <div className="row">
                <div className="col">
                    <h2 style={{textAlign:"center",fontFamily:"Helvetica Neue"}}>Le mie strutture</h2>
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
                            console.log(value.immagine_1);
                            return(
                                <div key={value.id_struttura} className="col-sm-6 col-md-6 col-lg-4">
                                    <section className="cards clearfix">
                                        <div className="card" style={{width: "100%", height: "20%"}}>
                                            <img className="card_image" src={value.immagine_1} alt=" Villa "/>
                                            <div className="card_copy">
                                                <h6 style={{textAlign:"center"}}>{value.nome_struttura}</h6>
                                                <ul className="list-group list-group-flush" style={{height:"10%"}}>
                                                    <li className="list-group-item" style={{fontSize:"12px",margin:0,whiteSpace:"nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"}}>{value.descrizione}
                                                    </li>
                                                </ul>
                                                <div style={{margin: "auto"}}>
                                                    <Button href={href}  style={{color: "#ff6300"}}><BuildIcon/> Modifica Struttura</Button>
                                                    <Button onClick={()=>handleElimina(value)}style={{color: "#ff6300"}}><DeleteOutlineIcon/> Elimina Struttura</Button>
                                                    <Button onClick={()=>handleAggiungiCamera(value)}style={{color: "#ff6300"}}><AddIcon/> Aggiungi Camera</Button>
                                                    <Button href={href2}style={{color: "#ff6300"}}><DeleteIcon/> Elimina Camera</Button>

                                                </div>
                                            </div>

                                        </div>


                                    </section>

                                </div>
                            ) })}


                        <div className="col-3"></div>
                        {strutture[0] == null &&
                        <div className="row">
                            <div className="col-sm-3 col-md-2 col-lg-2">
                            </div>
                            <div className="col-sm-6 col-md-8 col-lg-8">
                        <h5 align="center"> Non è presente nessuna struttura!</h5>
                            </div>
                        </div>
                        }

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