import React, {useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import {setSessionCookie, setUserCookie} from "../../sessions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Logout =()=>{
    const [open,setOpen]=useState(false);

    const handleClose=()=>{
        setOpen(false);

    };
    const handleLogout=()=>{
        setSessionCookie({});
        setUserCookie({});
        setOpen(false);

    };
    const handleOpenDialog=()=>{
        setOpen(true);
    };

    return(
        <div>
        <Button onClick={handleOpenDialog}>Logout</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Sei sicuro di voler effettuare il logout?
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  onClick={handleClose}color="primary">Chiudi</Button>
                    <Button href="https://localhost:3000" onClick={handleLogout} color="primary">Logout</Button>
                </DialogActions>
            </Dialog>

        </div>
    );

};
export default Logout;