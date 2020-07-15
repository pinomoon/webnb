import React, {useState} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



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

        <h5 style={{textAlign:"center"}}>Elenco camere</h5>

                    <div className="row" >
                        <div className="col-2">
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="row">
                                {camere.map(camera=>{
                                    console.log(camera.id_camera);
                                    return(

                        <div className="col-sm-12 col-md-6 col-lg-4">
                        <div className="card text-center" style={{width: "97%"}}>
                            <div className="card-body">
                                <h5 className="card-title">{camera.nome_camera}</h5>
                                <div className="card-text">
                                    <ul className="list-group list-group-flush" style={{height:"10%"}}>
                                    <li className="list-group-item">Numero Posti Letto: {camera.numero_posti_letto}</li>
                                    <li className= "list-group-item">Costo Camera: {camera.costo_camera}</li>
                                    <li className= "list-group-item">Colazione Inclusa: {camera.colazione_inclusa}</li>
                                    </ul>

                                </div>
                                <Button onClick={()=>handleElimina(camera)} style={{color:"#ff6300"}}> <DeleteOutlineIcon/> Elimina</Button>
                            </div>
                        </div>
                        </div>


                        ); })}
                    </div>





        </div>
                    </div>
        </div>
    );

};
export default EliminaCamera;