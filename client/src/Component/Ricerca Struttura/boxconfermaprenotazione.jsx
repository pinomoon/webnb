import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxConfermaPrenotazione=(props)=> {
    const{open, onClose, responseType}=props;

    const handleClose=()=>{
        onClose();
    };

    return (
        <div class="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Esito Prenotazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <div>
                            <p style={{color:"#ff6300"}}>Prenotazione Effettuata correttamente!</p>
                            <p style={{color:"#ff6300"}}>Ti è stata inviata una e-mail al tuo indirizzo con i dettagli della prenotazione</p>
                            <p style={{color:"#ff6300"}}>Ricorda che il proprietario della struttura deve confermare la prenotazione</p>
                        </div>
                        }
                        {responseType=="2"&&
                        <div>
                            <p style={{color:"#ff6300"}}>Errore imprevisto nell'inserimento della prenotazione,</p>
                            <p style={{color:"#ff6300"}}>Riprova</p>
                        </div>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType=="1"&&
                    < Button href="/" style={{color: "#ff6300"}}>HomePage</Button>
                    }
                    {responseType=="2"&&
                    < Button onClick={handleClose} style={{color: "#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaPrenotazione;