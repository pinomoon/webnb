import React, {useState} from 'react';
import {storage} from '../../firebase'
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {getSessionCookie} from "../../sessions";
import BoxConfermaInserimento from "./boxconfermainserimento";
import personale from "./personale1.jpg"

const InserisciStruttura=()=>{
    const [open, setOpen]=useState(false);
    const [tipoRisposta, setTipoRisposta]=useState("");
    const [id_utente,setIdUtente]=useState(getSessionCookie().id);
    const [nome_struttura,setNomeStruttura]=useState("");
    const [indirizzo_struttura,setIndirizzoStruttura]=useState("");
    const [cap, setCap]=useState("");
    const [punti_di_interesse, setPuntiInteresse]=useState("");
    const [citta, setCitta]=useState("");
    const [regione, setRegione]=useState("");
    const [stato, setStato]=useState("");
    const [tipo, setTipo]=useState("");
    const [disdetta_gratuita, setDisdettaGratuita]=useState("");
    const [tassa_soggiorno,setTassaSoggiorno]=useState("");
    let servizi="";
    const [wifi, setWifi]=React.useState("");
    const [parcheggio, setParcheggio]=React.useState("");
    const [piscina, setPiscina]=React.useState("");
    const [animali, setAnimali]=React.useState("");
    const [ora_checkin,setOraCheckin]=useState("");
    const [ora_checkout, setOraCheckout]=useState("");
    const [immagine1, setImmagine1]=useState(null);
    const [immagine2, setImmagine2]=useState("");
    const [immagine3, setImmagine3]=useState("");
    const [nome_camera, setNomeCamera]=useState("");
    const [numero_posti_letto, setNumPostiLetto]=useState("");
    const [costo_camera, setCostoCamera]=useState("");
    const [colazione_inclusa, setColazioneInclusa]=useState("");
    const [descrizione, setDescrizione]=useState("");
    let modalita_di_pagamento="";
    const [modalita_carta, setModalitaCarta]=React.useState("");
    const [modalita_struttura, setModalitaStruttura]=React.useState("");
    const [modalita_acconto, setModalitaAcconto]=React.useState("");
    const [nomeimg, setNomeImg]=useState();
    //var storageRef=firebase.storage().ref();


    const state={id_utente,nome_struttura,indirizzo_struttura,cap,punti_di_interesse,citta,regione,
        stato,tipo,disdetta_gratuita,modalita_di_pagamento, tassa_soggiorno, servizi,
        ora_checkin,ora_checkout,immagine1,immagine2,immagine3,nome_camera,numero_posti_letto,costo_camera,colazione_inclusa, descrizione
    };

    const handleClickOpenConfermaInserimento=()=>{
        setOpen(true);
    };
    const handleCloseConfermaInserimento=()=>{
        setOpen(false);
        setTipoRisposta("");
    };
    const handleChangeNomeStruttura=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNomeStruttura(valore);
        state.nome_struttura=valore;
    };
    const handleChangeIndirizzoStruttura=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setIndirizzoStruttura(valore);
        state.indirizzo_struttura=valore;
    };
    const handleChangeCap=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCap(valore);
        state.cap=valore;
    };
    const handleChangePuntiInteresse=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setPuntiInteresse(valore);
        state.punti_di_interesse=valore;
    };
    const handleChangeCitta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCitta(valore);
        state.citta=valore;
    };
    const handleChangeRegione=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setRegione(valore);
        state.regione=valore;
    };
    const handleChangeStato=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setStato(valore);
        state.stato=valore;
    };
    const handleChangeTipo=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setTipo(valore);
        state.tipo=valore;
    };
    const handleChangeDisdettaGratuita=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDisdettaGratuita(valore);
        state.disdetta_gratuita=valore;
    };

    const handleChangeTassaSoggiorno=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setTassaSoggiorno(valore);
        state.tassa_soggiorno=valore;
    };
    const handleChangeServizi=()=>{
        if(wifi!==''){
            state.servizi=state.servizi+""+wifi+",";
        }
        else{
            state.servizi=state.servizi+",";
        }
        if(parcheggio!==''){
            state.servizi=state.servizi+""+parcheggio+",";
        }
        else{
            state.servizi=state.servizi+",";
        }
        if(piscina!==''){
            state.servizi=state.servizi+""+piscina+",";
        }
        else{
            state.servizi=state.servizi+",";
        }
        if(animali!==''){
            state.servizi=state.servizi+""+animali;
        }
        else{
            state.servizi=state.servizi+"";
        }
    };
    const handleChangeWifi=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setWifi(valore);
        }
        else{
            setWifi("");
        }
    };
    const handleChangeParcheggio=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setParcheggio(valore);
        }
        else{
            setParcheggio("");
        }
    };
    const handleChangePiscina=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setPiscina(valore);
        }
        else{
            setPiscina("");
        }
    };
    const handleChangeAnimali=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setAnimali(valore);
        }
        else{
            setAnimali("");
        }
    };
    const handleChangeOraCheckin=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setOraCheckin(valore);
        state.ora_checkin=valore;
    };
    const handleChangeOraCheckout=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setOraCheckout(valore);
        state.ora_checkout=valore;
    };
    const handleChangeImg1=(event)=>{
        const target=event.target;
        const valore=target.files[0];
        setImmagine1(valore);
        state.immagine1=valore;


    };
    const handleChangeImg2=(event)=>{
        const target=event.target;
        const valore= target.value;
        setImmagine2(valore);
        state.immagine2=valore;
    };
    const handleChangeImg3=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setImmagine3(valore);
        state.immagine3=valore;
    };
    const handleChangeNomeCamera=(event)=>{
        const target=event.target;
        const valore=target.value;
        setNomeCamera(valore);
        state.nome_camera=valore;
    }
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
    const handleChangeDescrizione=(event)=>{
        const target=event.target;
        const valore=target.value;
        setDescrizione(valore);
        state.descrizione=valore;
    };
    const handleChangeModalitaPagamento=()=>{
        if(modalita_carta!==''){
            window.document.getElementById('struttura').removeAttribute('required');
            window.document.getElementById('anticipo_carta').removeAttribute('required');

            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_carta+",";
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+",";
        }
        if(modalita_struttura!==''){
            window.document.getElementById('carta').removeAttribute('required');
            window.document.getElementById('anticipo_carta').removeAttribute('required');
            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_struttura+",";
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+",";
        }
        if(modalita_acconto!==''){
            window.document.getElementById('carta').removeAttribute('required');
            window.document.getElementById('struttura').removeAttribute('required');
            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_acconto;
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+"";
        }
        if(modalita_carta==''&&modalita_struttura==''&&modalita_acconto==''){
            window.document.getElementById('carta').setAttribute('required','true');
            window.document.getElementById('struttura').setAttribute('required','true');
            window.document.getElementById('anticipo_carta').setAttribute('required','true');

        }
    };
    const handleChangeModalitaCarta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const flag=target.checked;
        if(flag===true) {
            setModalitaCarta(valore);
        }
        else{
            setModalitaCarta("");
        }

    };
    const handleChangeModalitaStruttura=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const flag=target.checked;
        if(flag===true) {
            setModalitaStruttura(valore);
        }
        else{
            setModalitaStruttura("");
        }

    };
    const handleChangeModalitaAcconto=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const flag= target.checked;
        if(flag===true) {
            setModalitaAcconto(valore);
        }
        else{
            setModalitaAcconto("");
        }

    };
    const svuotaCampi=()=>{
        setNomeStruttura("");
        setIndirizzoStruttura("");
        setCap("");
        setPuntiInteresse("");
        setCitta("");
        setRegione("");
        setStato("");
        setTipo("");
        setDisdettaGratuita("");
        setTassaSoggiorno("");

        setOraCheckin("");
        setOraCheckout("");
        setImmagine1("");
        setImmagine2("");
        setImmagine3("");
        setNumPostiLetto("");
        setCostoCamera("");
        setColazioneInclusa("");


    };
    const uploadImage=()=> {
        const uploadTask=storage.ref(`images/${immagine1.name}`).put(immagine1);
        uploadTask.on(
            'state_changed',
            snapshot=>{},
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                    .ref('images')
                    .child(immagine1.name)
                    .getDownloadURL()
                    .then(url=>{
                        console.log(url);
                    })
            }
        )
    }



    const handleSubmit=(event) =>{
        handleChangeModalitaPagamento();
        handleChangeServizi();
        if(document.forms[0].checkValidity()===false){
            return;
        }
        event.preventDefault();
        const data=new FormData();
        data.append('file',state.immagine1);
        data.append('nome_struttura',state.nome_struttura);
        data.append('id_utente',state.id_utente);
        /*axios.post('https://localhost:9000/inserisciStruttura/caricaImg',data)
            .then(response=>{
                if(response.data=='2'){
                    setTipoRisposta("2");
                    handleClickOpenConfermaInserimento();
                    svuotaCampi();
                    return;
                }
            })

         */
        /*
        var uploadTask=storageRef.child('images/'+immagine1.name).put(immagine1).then(function(snapshot){
            console.log('File caricato');
        });
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });

         */
        axios.post('https://localhost:9000/inserisciStruttura', state)
            .then((response)=>{
                alert(response.data);
                if(response.data=="1"){
                    setTipoRisposta("1");
                    handleClickOpenConfermaInserimento();
                }
                else{
                    setTipoRisposta("2");
                    handleClickOpenConfermaInserimento();
                    svuotaCampi();
                }
            })
            .catch(function(error){
                alert(error);
            });



    };


    return(

        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-8">



                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"auto",height:"auto"}}>
                        <img src={personale} style={{margin:"auto",marginTop:"30px",width:"40%",height:"30%",display:"block"}}/>



                        <div  className="container mt-10" >

                            <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST">
                                <label htmlFor="nome_struttura">Nome struttura*</label>
                                <input id="nome_struttura" name="nome_struttura" type="text" className="form-control" maxLength="40"
                                       value={state.nome_struttura} onChange={handleChangeNomeStruttura} required/>
                                <div className="invalid-feedback">
                                    Inserire nome della struttura
                                    <img src={state.immagine2}/>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div class="col-6">
                                            <label htmlFor="stato">Stato*</label>
                                            <input id="stato" name="stato" type="text" className="form-control" maxLength="40"
                                                   value={state.stato} onChange={handleChangeStato} required/>
                                            <div className="invalid-feedback">
                                                Inserire Stato
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="regione">Regione*</label>
                                            <input id="regione" name="regione" type="text" className="form-control" maxLength="40"
                                                   value={state.regione} onChange={handleChangeRegione} required/>
                                            <div className="invalid-feedback">
                                                Inserire Regione
                                            </div>
                                        </div>


                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="citta">Città*</label>
                                            <input id="citta" name="citta" type="text" className="form-control" maxLength="40"
                                                   value={state.citta} onChange={handleChangeCitta} required/>
                                            <div className="invalid-feedback">
                                                Inserire Città
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="indirizzo_struttura">Indirizzo*</label>
                                    <input id="indirizzo_struttura" name="indirizzo_struttura" type="text" className="form-control"
                                           maxLength="40" value={state.indirizzo_struttura} onChange={handleChangeIndirizzoStruttura}
                                           required/>
                                    <div className="invalid-feedback">
                                        Inserire Via e Numero Civico
                                    </div>
                                    <label htmlFor="cap">Cap*</label>
                                    <input id="cap" name="cap" type="text" className="form-control" maxLength="40"
                                           value={state.cap} onChange={handleChangeCap} pattern="^[0-9]{5,5}$" required/>
                                    <div className="invalid-feedback">
                                        Inserire CAP
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo Struttura*</label>
                                    <br></br>
                                    <div className="custom-control custom-radio custom-control-inline mt-2">
                                        <input type="radio" className="custom-control-input" id="bnb" name="tipo"
                                               value="bnb" onChange={handleChangeTipo} required/>
                                        <label className="custom-control-label" htmlFor="bnb">B&B</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mt-2">
                                        <input type="radio" className="custom-control-input" id="casa_vacanze" name="tipo"
                                               value="casa_vacanze" onChange={handleChangeTipo}  required/>
                                        <label className="custom-control-label" htmlFor="casa_vacanze">Casa Vacanze</label>
                                        <br></br>
                                        <div className="invalid-feedback ml-2">
                                            Seleziona il tipo di registrazione da effettuare
                                        </div>
                                    </div>
                                    <br></br>
                                    <label htmlFor="disdetta_gratuita">Disdetta Gratuita*</label>
                                    <input id="disdetta_gratuita" name="disdetta_gratuita" type="number" min="0" className="form-control" maxLength="40"
                                           value={state.disdetta_gratuita} onChange={handleChangeDisdettaGratuita}
                                           placeholder="Inserisci il numero di giorni entro cui la disdetta sarà gratuita" required/>
                                    <div className="invalid-feedback">
                                        Inserire Giorni Disdetta Gratuita, 0 se non è prevista
                                    </div>
                                    <label htmlFor="modalita_di_pagamento">Modalità di Pagamento*</label>

                                    <div className="form-group col" style={{margin:"auto"}}>
                                        <div className="row" >
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input" type="checkbox" id="carta" name="carta" value="carta" onChange={handleChangeModalitaCarta}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="carta" > Carta di Credito</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input " type="checkbox" id="struttura" name="struttura" value="struttura" onChange={handleChangeModalitaStruttura}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="struttura"> Pagamento in Struttura</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input " type="checkbox" id="anticipo_carta" name="anticipo_carta" value="anticipo_carta" onChange={handleChangeModalitaAcconto}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="anticipo_carta"> Acconto con Carta di Credito</label>
                                            </div>
                                        </div>
                                        <br/>


                                    </div>
                                    <div className="form-group col" style={{margin:"auto"}}>
                                        <label htmlFor="servizi">Servizi*</label>




                                        <div className="row" >
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">

                                                <input className="form-check-input" type="checkbox" id="wifi" name="wifi" value="wifi" defaultValue="" onChange={handleChangeWifi}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="wifi" > Wi-fi</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input " type="checkbox" id="parcheggio" name="parcheggio" defaultValue="" value="parcheggio" onChange={handleChangeParcheggio}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="parcheggio"> Parcheggio</label>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input " type="checkbox" id="piscina" name="piscina" value="piscina" onChange={handleChangePiscina}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="piscina"> Piscina</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1">
                                            </div>
                                            <div className="col-1">
                                                <input className="form-check-input " type="checkbox" id="animali" name="animali" value="animali" onChange={handleChangeAnimali}/>
                                            </div>
                                            <div className="col-8">
                                                <label className="form-check-label " htmlFor="animali"> Animali domestici ammessi</label>
                                            </div>
                                        </div>



                                    </div>


                                    <label htmlFor="tassa_soggiorno">Tassa di Soggiorno*</label>
                                    <input id="tassa_soggiorno" name="tassa_soggiorno" type='number' min="0" className="form-control" maxLength="40"
                                           value={state.tassa_soggiorno} onChange={handleChangeTassaSoggiorno} required/>
                                    <div className="invalid-feedback">
                                        Inserire Prezzo Tassa di Soggiorno
                                    </div>

                                    <label htmlFor="punti_di_interesse">Punti di Interesse*</label>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows="3" value={state.punti_di_interesse} onChange={handleChangePuntiInteresse}
                                        />

                                        <div className="invalid-feedback">
                                            Inserire Punti di Interesse
                                        </div>
                                    </Form.Group>

                                    <label htmlFor="name">Ora Check-In*</label>
                                    <input id="ora_checkin" name="ora_checkin" type="time" className="form-control" maxLength="40"
                                           value={state.ora_checkin} onChange={handleChangeOraCheckin} required/>
                                    <div className="invalid-feedback">
                                        Inserire Ora Check-In
                                    </div>
                                    <label htmlFor="name">Ora Check-Out*</label>
                                    <input id="ora_checkout" name="ora_checkout" type="time" className="form-control" maxLength="40"
                                           value={state.ora_checkout} onChange={handleChangeOraCheckout} required/>
                                    <div className="invalid-feedback">
                                        Inserire Ora Check-Out
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Immagini della Struttura</h5>

                                    <input id="file" name="file" type="file"
                                           onChange={handleChangeImg1}
                                           color="inherit"  style={{color:"#ff6300"}}></input>

                                    <input id="immagine2" name="immagine2" type="file"  maxLength="40"
                                           value={state.immagine2} onChange={handleChangeImg2}
                                           color="inherit"  style={{color:"#ff6300"}}></input>
                                    <input id="immagine3" name="immagine3" type="file" maxLength="40"
                                           value={state.immagine3} onChange={handleChangeImg3}
                                           color="inherit"  style={{color:"#ff6300"}}></input>

                                </div>
                                <div className="form-group">
                                    <h5>Inserimento Prima Camera</h5>
                                    <label htmlFor="nome_camera">Nome Camera*</label>
                                    <input id="nome_camera" name="nome_camera" type="text"  className="form-control" maxLength="40"
                                         onChange={handleChangeNomeCamera} required/>
                                    <div className="invalid-feedback">
                                        Inserire Il Nome della Camera
                                    </div>
                                    <label htmlFor="numero_posti_letto">Numero di Posti Letto*</label>
                                    <input id="numero_posti_letto" name="numero_posti_letto" type="number" min="0" className="form-control" maxLength="40"
                                           value={state.numero_posti_letto} onChange={handleChangeNumPostiLetto} required/>
                                    <div className="invalid-feedback">
                                        Inserire Il Numero di Posti Letto
                                    </div>
                                    <label htmlFor="costo_camera">Costo della Camera a Notte*</label>
                                    <input id="costo_camera" name="costo_camera" type="number"  min="0" className="form-control" maxLength="40"
                                           value={state.costo_camera} onChange={handleChangeCostoCamera} required/>
                                    <div className="invalid-feedback">
                                        Inserire il Costo della Camera
                                    </div>

                                    <label htmlFor="colazione_inclusa">Colazione Inclusa*</label>
                                    <br></br>
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
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Breve Descrizione della Struttura</Form.Label>
                                    <Form.Control as="textarea" rows="3" onChange={handleChangeDescrizione} />
                                </Form.Group>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-3 col-md-2 col-lg-1">
                                        <Button href="/" style={{marginLeft:"-10px",color:"#ff6300"}}>Indietro</Button>
                                    </div>
                                    <div className="col-sm-6 col-md-8 col-lg-9">
                                    </div>
                                    <div className="col-sm-3 col-md-2 col-lg-1">
                                        <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Invia</Button>
                                    </div>
                                    <div className="row">
                                        <br/>

                                    </div>
                                </div>
                                <br></br>

                            </form>
                            <BoxConfermaInserimento
                                open={open}
                                onClose={handleCloseConfermaInserimento}
                                responseType={tipoRisposta}/>


                        </div>




                    </div>

                </div>
                <div className="col">

                </div>
            </div>

        </div>

    );

};

export default InserisciStruttura;