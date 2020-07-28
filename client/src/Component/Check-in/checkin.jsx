import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import BoxInserisciOspite from "./boxinserisciospite";
import BoxEliminaOspite from "./BoxEliminaOspite";
import BoxModificaOspite from "./BoxModificaOspite";
import BoxQuestura from "./boxquestura";

const Checkin=()=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    const id_prenotazione = getUrlVars()["id_prenotazione"];
    const [dati_ospiti, setDatiOspiti]=useState([]);
    const [openInserisci, setOpenInserisci]=useState(false);
    const [openModifica, setOpenModifica]=useState(false);
    const [openElimina,setOpenElimina]=useState(false);
    const [ospite,setOspite]=useState("");
    const [rispostaQuestura, setRispostaQuestura]=useState("");
    const [openQuestura, setOpenQuestura]=useState(false);




    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/gestisciPrenotazioni/checkIN",{id_prenotazione})
            .then((response)=>{
                if(response.data[0]=="1"){
                    setDatiOspiti(response.data[1]);
                }
                else{
                    alert("Errore");
                }
            })
            .catch((error)=>{
                alert(error);
            })
    },[openInserisci, openModifica, openElimina]);

    const handleInserisci=()=>{
        setOpenInserisci(true);
    };
    const handleCloseInserisci=()=>{
        setOpenInserisci(false);
    };
    const handleModifica=(value)=>{
        setOspite(value.id_dati_ospiti);
        setOpenModifica(true );
    };
    const handleCloseModifica=()=>{
        setOpenModifica(false);
    };

    const handleElimina=(value)=>{
        setOspite(value.id_dati_ospiti);
        setOpenElimina(true);
    };
    const handleCloseElimina=()=>{
        setOpenElimina(false);
    };
    const handleOpenQuestura=()=>{
        setOpenQuestura(true);
    };
    const handleCloseQuestura=()=>{
        setOpenQuestura(false);
        setRispostaQuestura("");
    };

    const handleInviaQuestura=()=>{
        var conf=window.confirm("Sei sicuro di voler inviare i dati degli ospiti alla questura?");
        if(conf==true) {
            axios.post("https://localhost:9000/gestisciPrenotazioni/checkinQuestura", {id_prenotazione})
                .then((response) => {
                    setRispostaQuestura(response.data);
                    handleOpenQuestura();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-sm-12 col-md-12 col-lg-10">
                    <div style={{margin:"auto",width:"100%"}}>
                        <h3>Lista Ospiti per la Prenotazione ID: {id_prenotazione}</h3>
                        <br/>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="row">
                                    <div className="col-4"><h6>Nome</h6></div>
                                    <div className="col-4"> <h6> Cognome</h6></div>
                                    <div className="col-4"></div>
                                </div>
                            </ListGroup.Item>
                            {dati_ospiti.map((value)=>{

                                return(
                                    <ListGroup.Item>
                                        <div className="row">
                                            <div className="col-4"><b>{value.nome_ospite}</b></div>
                                            <div className="col-4"> <b>{value.cognome_ospite}</b></div>
                                            <div className="col-4">
                                                <Button color="inherit" style={{color:"#ff6300"}} onClick={()=>handleModifica(value)}>Modifica</Button>
                                                <Button color="inherit" style={{color:"#ff6300"}} onClick={()=>handleElimina(value)}>Elimina</Button>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                )
                            })}

                        </ListGroup>
                        <br/>
                        <br/>
                        <Button color="inherit" style={{color:"#ff6300"}} onClick={handleInserisci}>Inserisci Ospite</Button>
                        <Button color="inherit" style={{color:"#ff6300"}} onClick={handleInviaQuestura}>Invia dati alla Questura</Button>
                    </div>
                </div>


                <div className="col">

                </div>
            </div>
            <BoxInserisciOspite
                open={openInserisci}
                onclose={handleCloseInserisci}
                prenotazione={id_prenotazione}
            />
            <BoxEliminaOspite
                open={openElimina}
                onclose={handleCloseElimina}
                id_ospite={ospite}
            />
            <BoxModificaOspite
                open={openModifica}
                onclose={handleCloseModifica}
                id_ospite={ospite}
            />
            <BoxQuestura
                open={openQuestura}
                onClose={handleCloseQuestura}
                responseType={rispostaQuestura}
            />
        </div>



    );

}
export default Checkin;