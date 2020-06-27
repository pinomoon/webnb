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
const BoxConfermaModifica=(props)=> {
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
                <DialogTitle id="alert-dialog-slide-title">{"Modifica Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <p>Modifiche effettuate con successo! Clicca qui per andare alla tua HomePage!</p>
                        }
                        {responseType=="2"&&
                        <p>Inserimento carta fallito, verifica che tutti i parametri siano corretti e riprova</p>
                        }
                        {responseType=="3"&&
                        <p>Vecchia password non corretta, impossibile aggiornare le modifiche, riprova</p>
                        }
                        {responseType=="4"&&
                        <p>Errore generico, non è possibile effettuare le modidiche, riprova</p>
                        }
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType == "1"&&
                    < Button href="https://localhost:3000" onClick={handleClose}color="primary">Vai alla tua Homepage</Button>
                    }
                    {responseType == "2"&&
                    < Button  onClick={handleClose}color="primary">Chiudi</Button>
                    }
                    {responseType == "3"&&
                    < Button onClick={handleClose} color="primary">Chiudi</Button>
                    }
                    {responseType == "4"&&
                    < Button onClick={handleClose} color="primary">Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaModifica;