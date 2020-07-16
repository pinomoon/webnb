import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import Slide from "@material-ui/core/Slide/Slide";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxEliminaStruttura=(props)=>{
    const classes=useStyles();
    const{open, onClose, id_struttura}=props;
    const [openConferma, setOpenConferma]=useState(false);
    const [openErrore, setOpenErrore]=useState(false);


    const handleClose=()=>{
        onClose();
    };
    const handleCloseConferma=()=>{
        setOpenConferma(false);
    };
    const handleCloseErrore=()=>{
        setOpenErrore(false);
    };

    const handleElimina=()=>{
        axios.post("https://localhost:9000/gestisciStrutture/eliminaStruttura",{id_struttura})
            .then((response)=>{
                if(response.data=="1"){
                    setOpenConferma(true);
                    handleClose();
                }
                else{
                    setOpenErrore(true);
                    handleClose();
                }

            })
            .catch((error)=>{
                alert(error);
            })
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
                <DialogTitle id="alert-dialog-slide-title">{"Elimina Struttura"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p style={{color:"#ff6300"}}>Sei sicuro di voler eliminare questa struttura?</p>

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    < Button onClick={handleElimina} style={{color:"#ff6300"}}>Elimina Struttura</Button>
                    < Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>

                </DialogActions>
            </Dialog>
            <div className={classes.root}>
                <Snackbar open={openConferma} autoHideDuration={6000} onClose={handleCloseConferma} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseConferma} severity="success">
                        Struttura Eliminata Con Successo!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrore} autoHideDuration={6000} onClose={handleCloseErrore} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseErrore} severity="error">
                        Errore nell'eliminazione della struttura
                    </Alert>
                </Snackbar>
            </div>
        </div>


    );
};
export default BoxEliminaStruttura;