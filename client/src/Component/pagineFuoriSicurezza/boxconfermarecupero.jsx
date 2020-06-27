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
const BoxConfermaRecupero=(props)=> {
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
                <DialogTitle id="alert-dialog-slide-title">{"Registrazione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <p>Password modificata correttamente, vai alla pagina di Login!</p>
                        }
                        {responseType=="2"&&
                        <p>Recupero password fallito, riprova</p>
                        }
                        {responseType=="3"&&
                        <p>Errore generico, riprova</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType == "1"&&
                    < Button href="https://localhost:3000/accesso" onClick={handleClose}color="primary">Vai al Login</Button>
                    }
                    {responseType == "2"&&
                    < Button onClick={handleClose}color="primary">Chiudi</Button>
                    }
                    {responseType == "3"&&
                    < Button onClick={handleClose} color="primary">Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaRecupero;