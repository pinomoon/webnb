import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import axios from 'axios';
import user from "../registrazione/user.png";
import f from "./f.jpg";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxModficaOspite=(props)=> {
    const {open, onclose, id_ospite}=props;

    const [nome_ospite, setNomeOspite]=useState("");
    const [cognome_ospite, setCognomeOspite]=useState("");
    const [data_nascita, setDataNascita]=useState("");
    const [sesso, setSesso]=useState("");
    const [residenza, setResidenza]=useState("");
    const [n_documento, setNDoc]=useState("");
    const [foto_documento, setFotoDoc]=useState("");
    const state={ id_dati_ospiti: id_ospite,nome_ospite, cognome_ospite, data_nascita, sesso, residenza, n_documento, foto_documento};

    const handleClose=()=>{
        onclose();
    };

    const loadData= async()=>{
        await  axios.post("https://localhost:9000/gestisciPrenotazioni/richiediOspite",{id_dati_ospiti:id_ospite})
            .then((response)=>{
                if(response.data[0]=="1"){
                    setNomeOspite(response.data[1][0].nome_ospite);
                    setCognomeOspite(response.data[1][0].cognome_ospite);
                    setDataNascita(response.data[1][0].data_nascita);
                    setSesso(response.data[1][0].sesso);
                    setResidenza(response.data[1][0].residenza);
                    setNDoc(response.data[1][0].n_documento);
                    //setFotoDoc(response.data[1][0].foto_documento);
                }
                else{
                    alert("Errore nel completamento dell'operazione");

                }
            })
            .catch((error)=>{
                alert(error);
            })
    };





    const handleChangeNomeOspite=(event)=>{
        const target=event.target;
        const valore= target.value;
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
        const valore=  target.value;
        setFotoDoc(valore);
        state.foto_documento=valore;
    };

    const handleSubmit= async (event)=>{
        if(document.forms[0].checkValidity()===false){
            return;
        }
        event.preventDefault();
        await axios.post("https://localhost:9000/gestisciPrenotazioni/modificaDatiOspiti", state)
            .then((response)=>{
                if(response.data=="1"){
                    alert("Ospite Modificato con successo !");
                    handleClose();
                }
                else{
                    alert("Errore nel completamento dell'operazione");
                    handleClose();
                }
            })
            .catch((error)=>{
                alert(error);
            })
    }


    return(

        <div className="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                onEnter={loadData}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Modifica Dati Ospite"}</DialogTitle>
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
                                                <div className="row">
                                                    <div className="col-12">
                                                        <br/>
                                                        <label htmlFor="foto_documento">Foto Documento</label>
                                                        <input style={{border:"0"}} id="foto_documento" name="foto_documento" type="file"

                                                               accept="image/*"
                                                               className="form-control"
                                                               maxLength="40" value={state.foto_documento}
                                                               onChange={handleChangeFotoDoc}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Foto del Documento
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    <Button color="inherit" type="submit" onClick={handleSubmit} style={{color:"#ff6300",display:"block",margin:"auto"}}>Conferma</Button>

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
        </div>


    );

};
export default BoxModficaOspite;