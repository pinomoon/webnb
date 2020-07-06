import React, {useState} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EliminaCamera=(props)=>{
    const {open, onClose, id_struttura}=props;
    const [camere, setCamere]=useState([]);
    const [selectedCamera, setSelectedCamera]=useState();
    const loadData=async()=> {
        alert(id_struttura);
        await axios.post("https://localhost:9000/gestisciStrutture/mostraCamera", {id_struttura})
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
    };
    const handleClose=()=>{
        onClose();
    }
    const handleElimina=(camera)=>{
        setSelectedCamera(camera.id_camera);
        axios.post("https://localhost:9000/gestisciStrutture/eliminaCamera",{id_camera:selectedCamera})
            .then((response)=>{
                if(response.data=="1"){
                    alert("Struttura Eliminata");
                }
                else alert("Errore");
            })
            .catch((error)=>{
                alert(error);
            })
    }

    return(
        <div>
            <Dialog
                onEntering={loadData}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Elimina Camera"}</DialogTitle>
                <DialogContent>
            <h5>Elenco camere</h5>
            <br/>
            {camere.map(camera=>{
                console.log(camera.nome_camera);
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};
export default EliminaCamera;