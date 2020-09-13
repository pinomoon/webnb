import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import axios from 'axios';
import {getSessionCookie} from "../../sessions";
import f from "./f.jpg"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {storage} from "../../firebase";

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

const BoxInserisciOspite=(props)=> {
    const classes=useStyles();
    const {open, onclose, prenotazione}=props;
    const [id_utente, setIdUtente]=useState(getSessionCookie().id);
    const [id_prenotazione, setIdPrenotazione]=useState(prenotazione);
    const [nome_ospite, setNomeOspite]=useState("");
    const [cognome_ospite, setCognomeOspite]=useState("");
    const [data_nascita, setDataNascita]=useState("");
    const [sesso, setSesso]=useState("");
    const [residenza, setResidenza]=useState("");
    const [n_documento, setNDoc]=useState("");
    const [foto_documento, setFotoDoc]=useState(null);
    const [nomeImg1, setNomeImg1]=useState('');
    const state={id_prenotazione, id_utente, nome_ospite, cognome_ospite, data_nascita, sesso, residenza, n_documento, nomeImg1};
    const [openConferma, setOpenConferma]=useState(false);
    const [openErrore, setOpenErrore]=useState(false);




    const svuotaCampi=()=>{
        setNomeOspite("");
        setCognomeOspite("");
        setDataNascita("");
        setSesso("");
        setResidenza("");
        setNDoc("");
        setFotoDoc("");
    };
    const handleClose=()=>{
        onclose();
        svuotaCampi();
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(document.forms[0].checkValidity()===false){
            return;
        }
        axios.post("https://localhost:9000/gestisciPrenotazioni/inserisciOspiti",state)
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

    const handleChangeNomeOspite=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNomeOspite(valore);
        state.nome_ospite=valore;
    };
    const handleChangeCognomeOspite=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCognomeOspite(valore);
        state.cognome_ospite=valore;
    };
    const handleChangeDataNascita=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataNascita(valore);
        state.data_nascita=valore;
    };
    const handleChangeResidenza=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setResidenza(valore);
        state.residenza=valore;
    };
    const handleChangeSesso=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setSesso(valore);
        state.sesso=valore;
    };
    const handleChangeNDoc=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNDoc(valore);
        state.n_documento=valore;
    };
    const handleChangeFotoDoc=(event)=>{
        const target=event.target;
        const valore=target.files[0];
        setFotoDoc(valore);
        uploadImage()
    };

    const handleCloseConferma=()=>{
        setOpenConferma(false);
    };
    const handleCloseErrore=()=>{
        setOpenErrore(false);
    };

    const uploadImage=async ()=> {
        const file=[foto_documento]
        file.forEach((file)=>{
            const uploadTask=storage.ref(`images/${file.name}`).put(file);
            uploadTask.on(
                'state_changed',
                snapshot=>{},
                error=>{
                    console.log(error);
                },
                ()=>{
                    storage
                        .ref('images')
                        .child(file.name)
                        .getDownloadURL()
                        .then(url=>{
                            console.log(url);
                            console.log(file.name);
                            setNomeImg1(url);
                            state.nomeImg1=url
                            console.log(JSON.stringify(state))
                        })
                }

            )}
        )
        alert('Immagini caricate!');
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
                <DialogTitle id="alert-dialog-slide-title">{"Inserimento ospite"}</DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="row">

                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                                    <img src={f} style={{margin:"auto",marginTop:"30px",width:"30%",height:"30%",display:"block"}}/>

                                    <div className="container mt-10">

                                        <form name="form" id="form" className="container was-validated col-sm-8 mt-3">
                                            <h5>Dati anagrafici</h5>
                                            <div className="form-group">
                                                <label htmlFor="nome_ospite">Nome *</label>
                                                <input id="nome_ospite" name="nome_ospite" type="text" className="form-control"
                                                       maxLength="40"
                                                       value={state.nome_ospite} onChange={handleChangeNomeOspite} required/>
                                                <div className="invalid-feedback">
                                                    Inserire nome
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cognome_ospite">Cognome *</label>
                                                <input id="cognome_ospite" name="cognome_ospite" type="text" className="form-control"
                                                       maxLength="40"
                                                       value={state.cognome_ospite} onChange={handleChangeCognomeOspite} required/>
                                                <div className="invalid-feedback">
                                                    Inserire cognome
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="male"
                                                       name="sesso" value="M"
                                                       onChange={handleChangeSesso} required/>
                                                <label className="custom-control-label" htmlFor="male">Uomo</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="female"
                                                       name="sesso" value="F"
                                                       onChange={handleChangeSesso} required/>
                                                <label className="custom-control-label" htmlFor="female">Donna</label>
                                                <br></br>
                                                <div className="invalid-feedback ml-2">
                                                    Inserire il genere
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <br/>
                                                <label htmlFor="birthdate">Data di Nascita *</label>
                                                <input name="data_nascita" id="birthdate" type="date"
                                                       className="form-control"
                                                       value={state.data_nascita} onChange={handleChangeDataNascita}
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Selezionare la data di nascita
                                                </div>
                                            </div>
                                            <h5>Indirizzo di Residenza</h5>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="name">Via/Piazza</label>
                                                        <input id="indirizzo" name="indirizzo" type="text"
                                                               className="form-control"
                                                               maxLength="40" value={state.residenza}
                                                               onChange={handleChangeResidenza}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Via e Numero Civico
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h5>Documento di Identità</h5>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label htmlFor="n_documento">Numero Documento</label>
                                                        <input id="n_documento" name="n_documento" type="text"
                                                               className="form-control"
                                                               maxLength="40" value={state.n_documento}
                                                               onChange={handleChangeNDoc}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Numero del Documento
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <h5>Foto del documento</h5>

                                                <input id="foto_documento" name="foto_documento" type="file"
                                                       onChange={handleChangeFotoDoc}
                                                       color="inherit"  style={{color:"#ff6300"}}></input>



                                            </div>
                                            <div className="row">
                                                <div className="col-lg-1">
                                                </div>
                                                <div className="col-sm-3 col-md-2 col-lg-2">
                                                    <br/>
                                                    <Button color="inherit"   onClick={handleClose}style={{color:"#ff6300",display:"block",margin:"auto"}}>Chiudi</Button>

                                                </div>
                                                <div className="col-sm-6 col-md-8 col-lg-4">
                                                </div>
                                                <div className="col-sm-3 col-md-2 col-lg-2">
                                                    <br/>
                                                    <Button color="inherit" type="submit" onClick={uploadImage && handleSubmit} style={{color:"#ff6300",display:"block",margin:"auto"}}>Conferma</Button>

                                                </div>
                                                <div className="row">
                                                    <br/>

                                                </div>
                                            </div>
                                            <br></br>

                                        </form>
                                    </div>
                                </div>
                                <br/>
                                <br/>

                            </div>
                            <div className="col">

                            </div>
                        </div>
                    </div>


                </DialogContent>

            </Dialog>
            <div className={classes.root}>
                <Snackbar open={openConferma} autoHideDuration={6000} onClose={handleCloseConferma} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseConferma} severity="success">
                        Ospite inserito Correttamente!
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
export default BoxInserisciOspite;