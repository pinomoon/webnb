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

const BoxConfermaRecPass=(props)=> {
    const{open, onClose, responseType, email}=props;

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
                <DialogTitle id="alert-dialog-slide-title">{"Recupero Credenziali"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <p style={{color:"#ff6300"}}>Ti è stata inviata una e-mail all'indirizzo {email}, segui le istruzioni contenute in essa per recuperare le credenziali</p>
                        }
                        {responseType=="2"&&
                        <p style={{color:"#ff6300"}}>Utente non trovato, riprova</p>
                        }
                        {responseType=="3"&&
                        <p style={{color:"#ff6300"}}>Errore generico, riprova</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType == "1"&&
                    < Button href="/" onClick={handleClose}color="primary">HomePage</Button>
                    }
                    {responseType == "2"&&
                    < Button onClick={handleClose}style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                    {responseType == "3"&&
                    < Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaRecPass;