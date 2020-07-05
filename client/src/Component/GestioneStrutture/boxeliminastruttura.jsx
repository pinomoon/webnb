import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import Slide from "@material-ui/core/Slide/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxEliminaStruttura=(props)=>{
    const{open, onClose, id_struttura}=props;
    const [tipoRisposta, setTipoRisposta]=useState("");

    const handleClose=()=>{
        onClose();
    };

    const handleElimina=()=>{
        console.log(id_struttura);
        axios.post("https://localhost:9000/gestisciStrutture/eliminaStruttura",{id_struttura})
            .then((response)=>{
                    setTipoRisposta(response.data);
                    if(response.data=="1"){
                        alert("Struttura eliminata con successo");
                        handleClose();
                    }
                    else{
                        alert("Errore nell'eliminazione della struttura");
                        handleClose();
                    }

            })
            .catch((error)=>{
                alert(error);
            })
    }

    return (
        <div class="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Elimina Struttura"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       <p>SEI SICURO DI VOLER ELIMINARE QUESTA STRUTTURA?</p>

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    < Button onClick={handleElimina}color="primary">Elimina Struttura</Button>
                    < Button onClick={handleClose} color="primary">Chiudi</Button>

                </DialogActions>
            </Dialog>
        </div>


    );
};
export default BoxEliminaStruttura;