import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles= makeStyles({

});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const BoxGuadagni=(props)=> {
    const{open, onClose, responseType, data_iniziale, data_finale, num_prenotazioni, guadagni}=props;
    const classes =useStyles();

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
                            <p>Data iniziale : {data_iniziale}</p>
                            <p>Data finale: {data_finale}</p>
                            <p>Numero prenotazioni: {num_prenotazioni}</p>
                            <p>Guadagno Totale: € {guadagni}</p>
                        </div>
                        }
                        {responseType=="2"&&
                        <p>Errore nel calcolo dei guadagni, riprova</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  onClick={handleClose}color="primary">Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxGuadagni;