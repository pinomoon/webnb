import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxAnnullaPren=(props)=> {
    const {open, onClose, prenotazione}=props;
    const [tipoRisposta, setTipoRisposta]=useState("");
    const state={id_prenotazione:prenotazione};


    const handleClose=()=>{
        onClose();
    };
    const handleLoad=()=>{
        axios.post("https://localhost:9000/leMiePrenotazioni/annullaPrenotazione",state)
            .then((response)=>{
                setTipoRisposta(response.data);
            })
            .catch((error)=>{
                alert(error);
            })
    };

    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                onEnter={handleLoad}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Annulla Prenotazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {tipoRisposta=="1"&&
                        <div>
                            <p>Prenotazione Annullata con Successo e Addebito su Carta di Credito Effettuato</p>
                            <p>Ti è stata inviata una mail al tuo indirizzo con i dettagli dell'annullamento</p>
                        </div>
                        }
                        {tipoRisposta=="2"&&
                        <div>
                            <p>Prenotazione Annullata con Successo e Rimborso su Carta di Credito Effettuato</p>
                            <p>Ti è stata inviata una mail al tuo indirizzo con i dettagli dell'annullamento</p>
                        </div>
                        }
                        {tipoRisposta=="3" &&
                        <div>
                            <p>Prenotazione Annullata con Successo!</p>
                        </div>
                        }
                        {tipoRisposta=="4"&&
                        <div>
                            <p>Errore in fase di annullamento della prenotazione</p>
                            <p>Riprova più tardi</p>
                        </div>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions id="action">
                    <Button name="ok" id="ok" onClick={handleClose}
                            style={{marginLeft: "-10px", color: "#ff6300"}}>Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxAnnullaPren;