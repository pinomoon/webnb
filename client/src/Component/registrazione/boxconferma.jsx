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

export default function BoxConferma(props) {
    const{open, onClose}=props;

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
                <DialogTitle id="alert-dialog-slide-title">{"Registrazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p style={{color:"#ff6300"}}>
                            Registrazione effettuata, è stata inviata una mail di conferma al tuo indirizzo di posta elettronica
                        </p>
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  href="https://localhost:3000" onClick={handleClose}style={{color:"#ff6300"}}>Torna alla Home</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

}
