import React, {Component} from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
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

const BoxConfermaInserimento=(props)=> {
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
                        <DialogTitle id="alert-dialog-slide-title">{"Inserimento Struttura"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {responseType == "1" &&
                                <p>Struttura inserita con successo, vai alle tue strutture per verificare!</p>
                                }
                                {responseType == "2" &&
                                <p>Errore nell'inserimento della struttura, riprova</p>
                                }

                            </DialogContentText>

                        </DialogContent>
                        <DialogActions id="action">
                            {responseType == "1" &&
                            < Button href="https://localhost:3000/lemiestrutture" onClick={handleClose} color="primary">Le Mie Strutture</Button>
                            }
                            {responseType == "2" &&
                            < Button onClick={handleClose} color="primary">Chiudi</Button>
                            }

                        </DialogActions>
                    </Dialog>
                </div>


        );

};
export default BoxConfermaInserimento;