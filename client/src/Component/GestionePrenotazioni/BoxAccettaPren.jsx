import React, {Component, useState} from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from 'axios';
import {getSessionCookie} from "../../sessions";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxAccettaPren=(props)=> {
    const {open, onClose,prenotazione}=props;


    const handleClose=()=>{
        onClose();
    };
    const handleSubmit=()=>{
        axios.post("https://localhost:9000/gestisciPrenotazioni/confermaPrenotazione",{id_prenotazione:prenotazione})
            .then((response)=>{
                if(response.data=="1"){
                    alert("Prenotazione confermata con successo!");
                    handleClose();
                }
                else{
                    alert("Errore nel completamento dell'operazione");
                    handleClose();
                }
            })
            .catch((error)=>{
                alert(error);
            })
    }

    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Accetta prenotzione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>CONFERMI DI VOLER ACCETTARE LA PRENOTAZIONE?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions id="action">
                    <Button onClick={handleClose} color="primary">Chiudi</Button>
                    <Button onClick={handleSubmit} color="primary">Conferma</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxAccettaPren;