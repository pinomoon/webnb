import React from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxConfermaModificaStruttura=(props)=>{
    const{open, onClose, responseType}=props;


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
                <DialogTitle id="alert-dialog-slide-title">{"Modifica Struttura"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {responseType=="1"&&
                        <p style={{color:"#ff6300"}}>Struttura modificata con successo! Vai alle tue strutture per verificare</p>
                        }
                        {responseType=="2"&&
                        <p style={{color:"#ff6300"}}>Errore nel completamento dell'operazione!</p>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {responseType=="1"&&
                    <Button href="/lemiestrutture" style={{color:"#ff6300"}}>Le mie strutture</Button>
                    }
                    {responseType=="2"&&
                    <Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default BoxConfermaModificaStruttura;