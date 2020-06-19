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
export default function BoxRifiuto(props) {
    const{open, onClose}=props;
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
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Registrazione"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Email già presente, riprova con una nuova mail
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions id="action">
                        <Button  color="primary" onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>


        );

}
