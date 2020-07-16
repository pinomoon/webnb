import React, {useState} from 'react';
import villa from "../GestioneStrutture/villa.jpg";
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from 'axios';
import BoxEliminaPref from "./boxeliminapref";
import HotelIcon from '@material-ui/icons/Hotel';
import {Home} from "@material-ui/icons";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const ElencoPreferiti=()=> {
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [preferiti, setPreferiti]=useState([]);
    const [selectedPref, setSelectedPref]=useState("");
    const [openEliminaPref, setopenEliminaPref]= useState(false);

    const handleEliminaPref=(value)=>{
        setSelectedPref(value.id_struttura);
        setopenEliminaPref(true);
    };
    const handleCloseEliminaPref=()=>{
        setSelectedPref();
        setopenEliminaPref(false);
    };

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
    },[openEliminaPref]);

    return(

        <div className="container">
            <h5 style={{textAlign:"center"}}>I Miei Preferiti</h5>
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-sm-12 col-md-12 col-lg-10">
                    <div className="row">
                        {preferiti.map((value) =>{

                            return(
                                <div className="col-sm-6 col-md-4 col-lg-4">
                                    <section className="cards clearfix">
                                        <div className="card" style={{width:"100%",height:"100%"}}>
                                            <img className="card_image" src={villa}  alt=" Villa "/>
                                            <div className="card_copy">
                                                <h4>{value.nome_struttura}</h4>
                                                {value.tipo==="bnb" &&
                                                <div>
                                                    <p><HotelIcon/> Bed and Breakfast</p>
                                                </div>

                                                }
                                                {value.tipo==="casa_vacanze" &&
                                                <div>
                                                    <p><Home/> Casa Vacanze</p>
                                                </div>

                                                }
                                                <p style={{margin:0,whiteSpace:"nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"}}>{value.descrizione}
                                                </p>
                                                <p style={{margin:0,whiteSpace:"nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"}}>Indirizzo: {value.indirizzo_struttura}, {value.citta}, {value.regione}</p>
                                                <div>
                                                    <Button onClick={()=>handleEliminaPref(value)} style={{color:"#ff6300",margin:"auto",display:"block"}}><DeleteOutlineIcon/>Elimina</Button>
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

            <br></br>
            <BoxEliminaPref
                open={openEliminaPref}
                onClose={handleCloseEliminaPref}
                struttura={selectedPref}
            />

        </div>

    );

}

export default ElencoPreferiti;