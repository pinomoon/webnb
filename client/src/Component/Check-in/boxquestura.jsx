import React from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxQuestura=(props)=> {
    const {open, onClose, responseType}=props;

    const handleClose=()=>{
        onClose();
    };
    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Invio Dati A Questura"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {responseType=="1"&&
                        <p>Dati inviati correttamente!</p>
                        }
                        {responseType=="2"&&
                        <p>Errore nell'invio dei dati alla questura, riprova più tardi</p>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions id="action">
                    {responseType=="1" &&
                    <Button name="ok" id="ok" href="/gestisciprenotazione"
                            style={{marginLeft: "-10px", color: "#ff6300"}}>Gestisci Prenotazioni</Button>
                    }
                    {responseType=="2"&&
                    <Button name="close" id="close" onClick={handleClose}
                            style={{marginLeft: "-10px", color: "#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxQuestura;