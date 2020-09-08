import React, {useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import {setSessionCookie, setUserCookie} from "../../sessions";
import Dropdown from "react-bootstrap/Dropdown";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';


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
            <Dropdown.Item onClick={handleOpenDialog} style={{margin:"auto",display:"block"}}><ExitToAppRoundedIcon/> Logout</Dropdown.Item>

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
                        <p style={{color:"#ff6300"}}>
                            Sei sicuro di voler effettuare il logout?
                        </p>
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    <Button  onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    <Button href="/" onClick={handleLogout} style={{color:"#ff6300"}}>Logout</Button>
                </DialogActions>
            </Dialog>

        </div>
    );

};
export default Logout;