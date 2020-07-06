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
 const BoxConfermaPreferiti=(props)=> {
    const{open, onClose, responseType}=props;
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
                <DialogTitle id="alert-dialog-slide-title">{"Aggiungi ai Preferiti"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                            <p style={{color:"#ff6300"}}>Struttura aggiunta correttamente ai preferiti</p>
                        }
                        {responseType=="2"&&
                            <p style={{color:"#ff6300"}}>Struttura rimossa dai preferiti</p>
                        }
                        {responseType=="3"&&
                        <p style={{color:"#ff6300"}}>Errore, non è stato possibile inserire la struttura tra i preferiti</p>
                        }
                        {responseType=="4"&&
                        <p style={{color:"#ff6300"}}>Errore, non è stato possibile rimuovere la struttura dai preferiti</p>
                        }
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    < Button onClick={handleClose}style={{color:"#ff6300"}}>Chiudi</Button>
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaPreferiti;