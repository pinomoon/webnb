import React, {useState} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import DialogActions from "@material-ui/core/DialogActions";



const EliminaCamera=(props)=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    const id_struttura = getUrlVars()["id_struttura"];
    const [camere, setCamere]=useState([]);
    const [selectedCamera, setSelectedCamera]=useState();
    React.useLayoutEffect(()=>{
        alert(id_struttura);
        axios.post("https://localhost:9000/gestisciStrutture/mostraCamera", {id_struttura})
            .then((response) => {
                if (response.data[0] == "1") {
                    console.log(JSON.stringify(response.data[1]));
                    setCamere(response.data[1]);
                    console.log(camere);
                } else {
                    alert("Errore generico");
                }

            })
            .catch((error) => {
                alert(error);
            })
    },[]);
    const handleClose=()=>{
    }
    const handleElimina=(camera)=>{
        setSelectedCamera(camera.id_camera);
        axios.post("https://localhost:9000/gestisciStrutture/eliminaCamera",{id_camera:camera.id_camera})
            .then((response)=>{
                if(response.data=="1"){
                    alert("Struttura Eliminata");
                }
                else alert("Errore");
            })
            .catch((error)=>{
                alert(error);
            })
        window.location.reload();
    }

    return(
        <div>
            <h5>Elenco camere</h5>
            <br/>
            {camere.map(camera=>{
                console.log(camera.id_camera);
                return(
                    <div >
                        <p>Nome Camera:{camera.nome_camera}</p>
                        <p>Numero Posti Letto: {camera.numero_posti_letto}</p>
                        <p>Costo Camera: {camera.costo_camera}</p>
                        <p>Colazione Inclusa: {camera.colazione_inclusa}</p>
                        <Button onClick={()=>handleElimina(camera)}>Elimina</Button>
                        <br/>
                    </div>


                );
            })}

        </div>
    );

};
export default EliminaCamera;