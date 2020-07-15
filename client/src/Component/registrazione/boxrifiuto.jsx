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

export default function BoxRifiuto(props) {
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
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Registrazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p style={{color:"#ff6300"}}>
                            Email già presente, riprova con una nuova mail
                        </p>
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  style={{color:"#ff6300"}} onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

}
