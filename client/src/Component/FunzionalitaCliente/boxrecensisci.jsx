import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from 'axios';
import Form from "react-bootstrap/Form";
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

const BoxRecensisci=(props)=> {
    const classes=useStyles();
    const {open, onClose, prenotazione}=props;
    const [tipoRisposta, setTipoRisposta]=useState("");
    const [recensione, setRecensione]=useState("");
    const [openConferma, setOpenConferma]=useState(false);
    const [openErrore, setOpenErrore]=useState(false);
    const state={id_prenotazione:prenotazione, recensione};

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
        axios.post("/leMiePrenotazioni/recensisci",state)
            .then((response)=>{
                if(response.data=="1"){
                    setOpenConferma(true);
                    handleClose();
                }
                else{
                    setOpenErrore(true);
                }
            })
            .catch((error)=>{
                alert(error);
            })
    };
    const handleChangeRecensione=(event)=>{
        const target=event.target;
        const valore=target.value;
        setRecensione(valore);
        state.recensione=valore;
    }

    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Recensisci"}</DialogTitle>
                <DialogContent>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Lascia qui la tua recensione</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={handleChangeRecensione} value={state.recensione}/>
                    </Form.Group>
                </DialogContent>
                <DialogActions id="action">
                    <div>
                        <Button name="ok" id="ok" onClick={handleClose}
                                style={{marginLeft: "-10px", color: "#ff6300"}}>Chiudi</Button>
                        <Button name="ok" id="ok" onClick={handleSubmit}
                                style={{marginLeft: "-10px", color: "#ff6300"}}>Invia</Button>
                    </div>
                </DialogActions>
            </Dialog>
            <div className={classes.root}>
                <Snackbar open={openConferma} autoHideDuration={6000} onClose={handleCloseConferma} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseConferma} severity="success">
                        Recensione Inserita Correttamente!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrore} autoHideDuration={6000} onClose={handleCloseErrore} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseErrore} severity="error">
                        Errore Nell'Inserimento Della Recensione, Riprova
                    </Alert>
                </Snackbar>
            </div>
        </div>


    );

};
export default BoxRecensisci;