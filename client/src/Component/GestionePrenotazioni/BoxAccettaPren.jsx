import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from 'axios';
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

const BoxAccettaPren=(props)=> {
    const classes = useStyles();

    const {open, onClose,prenotazione}=props;
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
    const handleSubmit=()=>{
        axios.post("https://localhost:9000/gestisciPrenotazioni/confermaPrenotazione",{id_prenotazione:prenotazione})
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
    };

    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Accetta prenotzione"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>Confermi di volere accettare la prenotazione</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions id="action">
                    <Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    <Button onClick={handleSubmit} style={{color:"#ff6300"}}>Conferma</Button>
                </DialogActions>
            </Dialog>
            <div className={classes.root}>
            <Snackbar open={openConferma} autoHideDuration={6000} onClose={handleCloseConferma} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleCloseConferma} severity="success">
                    Prenotazione confermata con successo!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrore} autoHideDuration={6000} onClose={handleCloseErrore} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleCloseErrore} severity="error">
                    Errore nel completamento dell'operazione
                </Alert>
            </Snackbar>
            </div>
        </div>


    );

};
export default BoxAccettaPren;