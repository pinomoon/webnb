import {default as React, useState} from "react";
import user from "../registrazione/user.png";
import Button from "@material-ui/core/Button";
import host from "../GestisciCamera/2.jpg"
import Slide from "@material-ui/core/Slide/Slide";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import axios from 'axios';
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AggiungiCamera  =(props) =>{
    const[nome_camera, setNomeCamera]=useState("");
    const[numero_posti_letto, setNumPostiLetto]=useState("");
    const[costo_camera, setCostoCamera]=useState("");
    const[colazione_inclusa, setColazioneInclusa]=useState("");
    const[tipoRisposta, setTipoRisposta]=useState("");
    const {open, onClose, id_struttura}=props;
    const state={id_struttura,nome_camera,numero_posti_letto,costo_camera,colazione_inclusa};

    const handleChangeNomeCamera=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNomeCamera(valore);
        state.nome_camera=valore;
    };
    const handleChangeNumPostiLetto=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNumPostiLetto(valore);
        state.numero_posti_letto=valore;
    };
    const handleChangeCostoCamera=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCostoCamera(valore);
        state.costo_camera=valore;
    };
    const handleChangeColazioneInclusa=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setColazioneInclusa(valore);
        state.colazione_inclusa=valore;
    };
    const handleClose=()=>{
        onClose();
        setNomeCamera("");
        setCostoCamera("");
        setColazioneInclusa("");
        setNumPostiLetto("");
        setTipoRisposta("");
    };
    const handleSubmit=()=>{
        alert(state);
        axios.post("https://localhost:9000/gestisciStrutture/aggiungiCamera", state)
            .then((response)=>{
                setTipoRisposta(response.data);
                if(response.data=="1"){
                    alert("Camera inserita con successo!!");
                    handleClose();

                }
                else{
                    alert("Errore nell'inserimento della camera");
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
            >
                <DialogTitle id="alert-dialog-slide-title">{"Aggiungi Camera"}</DialogTitle>
                <DialogContent>

        <div className="container">
            <div className="row">

                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                        <img src={host} style={{margin:"auto",marginTop:"30px",width:"30%",height:"30%",display:"block"}}/>

                            <div className="form-group" style={{width:"50%",margin:"auto"}}>
                                <h5> Nome camera</h5>
                                <input type="text" className="form-control" id="nome_camera" name="nome_camera"  maxLength="40"
                                       value={state.nome_camera} onChange={handleChangeNomeCamera} required/>
                                <div className="invalid-feedback">
                                    Inserire Il Nome della Camera
                                </div>
                            </div>

                            <div className="form-group" style={{width:"50%",margin:"auto"}} >
                                <h5> N.posti letto</h5>
                                <input id="numero_posti_letto" name="numero_posti_letto" type="number" min="0" className="form-control" maxLength="40"
                                       value={state.numero_posti_letto} onChange={handleChangeNumPostiLetto} required/>
                                <div className="invalid-feedback">
                                    Inserire Il Numero di Posti Letto
                                </div>
                            </div>
                            <div className="form-group" style={{width:"50%",margin:"auto"}}>
                                <h5> Costo Camera a Notte </h5>
                                <input id="costo_camera" name="costo_camera" type="number"  min="0" className="form-control" maxLength="40"
                                       value={state.costo_camera} onChange={handleChangeCostoCamera} required/>
                                <div className="invalid-feedback">
                                    Inserire il Costo della Camera
                                </div>
                            </div>
                        <div className="form-group" style={{width:"50%",margin:"auto"}}>
                            <h5>Colazione Inclusa</h5>
                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                <input type="radio" className="custom-control-input" id="si" name="colazione_inclusa"
                                       value="1" onChange={handleChangeColazioneInclusa} required/>
                                <label className="custom-control-label" htmlFor="si">SI</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                <input type="radio" className="custom-control-input" id="no" name="colazione_inclusa"
                                       value="0" onChange={handleChangeColazioneInclusa}  required/>
                                <label className="custom-control-label" htmlFor="no">NO</label>
                                <br></br>
                                <div className="invalid-feedback ml-2">
                                    Seleziona se la colazione è inclusa nella prenotazione
                                </div>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-lg-2">
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
}
export default AggiungiCamera;