import React from 'react';
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

const BoxEliminaOspite=(props)=> {
    const {open, onclose,id_ospite}=props;


    const handleClose=()=>{
        onclose();
    };
    const handleSubmit=()=>{
        axios.post("https://localhost:9000/gestisciPrenotazioni/eliminaOspiti",{id_dati_ospiti:id_ospite})
            .then((response)=>{
                if(response.data=="1"){
                    alert("Ospite Eliminato con Successo !");

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
                <DialogTitle id="alert-dialog-slide-title">{"Elimina Ospite"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p style={{color:"#ff6300"}}>Confermi di voler eliminare l'ospite?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions id="action">
                    <Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    <Button onClick={handleSubmit} style={{color:"#ff6300"}}>Conferma</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxEliminaOspite;