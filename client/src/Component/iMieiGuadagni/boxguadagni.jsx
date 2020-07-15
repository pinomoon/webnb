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

const BoxGuadagni=(props)=> {
    const{open, onClose, responseType, data_iniziale, data_finale, num_prenotazioni, guadagni}=props;

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
                <DialogTitle id="alert-dialog-slide-title">{"I tuoi Guadagni"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <div>
                            <p style={{color:"#ff6300"}}>Data iniziale:</p><p> {data_iniziale}</p>
                            <p style={{color:"#ff6300"}}>Data finale:</p><p> {data_finale}</p>
                            <p style={{color:"#ff6300"}}>Numero prenotazioni:</p><p> {num_prenotazioni}</p>
                            <p style={{color:"#ff6300"}}>Guadagno Totale:</p><p> € {guadagni}</p>

                        </div>
                        }
                        {responseType=="2"&&
                        <p style={{color:"#ff6300"}} >Errore nel calcolo dei guadagni, riprova</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  onClick={handleClose}style={{color:"#ff6300"}}>Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxGuadagni;