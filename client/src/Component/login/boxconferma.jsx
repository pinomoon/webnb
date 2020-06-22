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
export default function BoxConferma(props) {
    const{open, onClose, responseType, boxMessage}=props;
    const[tipoPulsante, setTipoPulsante]=React.useState("Chiudi");
    const classes =useStyles();

    const handleClose=()=>{
        onClose();
    };

    if(responseType=="1"){
        setTipoPulsante("Vai alla tua HomePage");
    }
    else if (responseType=="2"){
        setTipoPulsante("Torna alla Home");
    }
    else{
        setTipoPulsante("Chiudi");
    }
    return (
        <div class="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Registrazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p value={boxMessage}></p>
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button value={tipoPulsante} href="https://localhost:3000" onClick={handleClose}color="primary"></Button>
                </DialogActions>
            </Dialog>
        </div>


    );

}
