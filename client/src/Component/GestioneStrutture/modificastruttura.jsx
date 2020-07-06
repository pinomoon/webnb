import React, {useState} from 'react';
import Slide from "@material-ui/core/Slide/Slide";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import personale from "./personale1.jpg";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import BoxConfermaInserimento from "./boxconfermainserimento";
import DialogActions from "@material-ui/core/DialogActions";
import BoxConfermaModificaStruttura from "./boxconfermamodificastruttura";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ModificaStruttura=(props)=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var id_struttura = getUrlVars()["id_struttura"];





    const [nome_struttura, setNomeStruttura]=useState("");
    const [indirizzo_struttura,setIndirizzoStruttura]=useState("");
    const [cap, setCap]=useState("");
    const [punti_di_interesse, setPuntiInteresse]=useState("");
    const [citta, setCitta]=useState("");
    const [regione, setRegione]=useState("");
    const [stato, setStato]=useState("");
    const [tipo, setTipo]=useState("");
    const [disdetta_gratuita, setDisdettaGratuita]=useState("");
    const [modalita_di_pagamento, setModalitaPagamento]=useState("");
    const [tassa_soggiorno,setTassaSoggiorno]=useState("");
   // let servizi="";
    const [wifi, setWifi]=React.useState("");
    const [parcheggio, setParcheggio]=React.useState("");
    const [piscina, setPiscina]=React.useState("");
    const [animali, setAnimali]=React.useState("");
    const [ora_checkin,setOraCheckin]=useState("");
    const [ora_checkout, setOraCheckout]=useState("");
    const [servizi, setServizi]=useState("");
    const [descrizione, setDescrizione]=useState("");
    const [openConfermaModifica, setOpenConfermaModifica]=useState(false);
    const [tipoRispostaModifica, setTipoRispostaModifica]=useState("");



    const handleClickOpenConfermaModifica=()=>{
        setOpenConfermaModifica(true);
    };
    const handleCloseConfermaModifica=()=>{
        setOpenConfermaModifica(false);
        setTipoRispostaModifica("");
    };

    const handleSubmit=async (event)=>{

        event.preventDefault();
        await axios.post("https://localhost:9000/gestisciStrutture/salvaModifiche",state)
            .then((response)=>{
                setTipoRispostaModifica(response.data);
                handleClickOpenConfermaModifica()
            })
            .catch((error)=>{
                alert(error);
            });
    };
   React.useLayoutEffect(()=>{
       console.log(id_struttura);
       async function fetchData(){
       await axios.post("https://localhost:9000/gestisciStrutture/modificaStruttura",{id_struttura})
            .then((response)=>{
                if(response.data[0]=="1"){
                    console.log(response.data);
                    setNomeStruttura(response.data[1][0].nome_struttura);
                    setIndirizzoStruttura(response.data[1][0].indirizzo_struttura);
                    setCap(response.data[1][0].cap);
                    setPuntiInteresse(response.data[1][0].punti_di_interesse);
                    setCitta(response.data[1][0].citta);
                    setRegione(response.data[1][0].regione);
                    setStato(response.data[1][0].stato);
                    setTipo(response.data[1][0].tipo);
                    setDisdettaGratuita(response.data[1][0].disdetta_gratuita);
                    setTassaSoggiorno(response.data[1][0].tassa_soggiorno);
                    setServizi(response.data[1][0].servizi);
                    setOraCheckin(response.data[1][0].ora_checkin);
                    setOraCheckout(response.data[1][0].ora_checkout);
                    setDescrizione(response.data[1][0].descrizione);
                    setModalitaPagamento(response.data[1][0].modalita_di_pagamento);
                    console.log(state);
                }
                else alert("2");

            })
            .catch((error)=>{
                alert(error);
            })
    }
    fetchData();
    },[]);
    const state={id_struttura,nome_struttura,indirizzo_struttura,cap,punti_di_interesse,citta,regione,stato,tipo
        ,modalita_di_pagamento,disdetta_gratuita,tassa_soggiorno,servizi,ora_checkin,ora_checkout,descrizione};
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
    const handleChangeModalitaPagamento=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setModalitaPagamento(valore);
        state.modalita_di_pagamento=valore;
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
    const handleChangeDescrizione=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDescrizione(valore);
        state.descrizione=valore;
    };
    const handleChangeServizi=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setServizi(valore);
        state.servizi=valore;
    };

    return(

                    <div className="container">
                        <div className="row">
                            <div className="col">

                            </div>
                            <div className="col-sm-12 col-md-9 col-lg-8">


                                <div style={{
                                    margin: "auto",
                                    marginTop: "50px",
                                    border: "2px solid #ff6300",
                                    borderRadius: "25px",
                                    width: "auto",
                                    height: "auto"
                                }}>
                                    <img src={personale} style={{
                                        margin: "auto",
                                        marginTop: "30px",
                                        width: "40%",
                                        height: "30%",
                                        display: "block"
                                    }}/>


                                    <div className="container mt-10">

                                        <form name="form" id="form" className="container was-validated col-sm-8 mt-3"
                                              method="POST">
                                            <label htmlFor="nome_struttura">Nome struttura*</label>
                                            <input id="nome_struttura" name="nome_struttura" type="text"
                                                   className="form-control" maxLength="40"
                                                   value={nome_struttura} onChange={handleChangeNomeStruttura}
                                                   required/>
                                            <div className="invalid-feedback">
                                                Inserire nome della struttura
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="stato">Stato*</label>
                                                        <input id="stato" name="stato" type="text"
                                                               className="form-control" maxLength="40"
                                                               value={stato} onChange={handleChangeStato}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Stato
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="regione">Regione*</label>
                                                        <input id="regione" name="regione" type="text"
                                                               className="form-control" maxLength="40"
                                                               value={regione} onChange={handleChangeRegione}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Regione
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="row">
                                                    <div className="col-8">
                                                        <label htmlFor="citta">Città*</label>
                                                        <input id="citta" name="citta" type="text"
                                                               className="form-control" maxLength="40"
                                                               value={citta} onChange={handleChangeCitta}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire Città
                                                        </div>
                                                    </div>
                                                </div>
                                                <label htmlFor="indirizzo_struttura">Indirizzo*</label>
                                                <input id="indirizzo_struttura" name="indirizzo_struttura" type="text"
                                                       className="form-control"
                                                       maxLength="40" value={indirizzo_struttura}
                                                       onChange={handleChangeIndirizzoStruttura}
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Inserire Via e Numero Civico
                                                </div>
                                                <label htmlFor="cap">Cap*</label>
                                                <input id="cap" name="cap" type="text" className="form-control"
                                                       maxLength="40"
                                                       value={cap} onChange={handleChangeCap} required/>
                                                <div className="invalid-feedback">
                                                    Inserire CAP
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tipo">Tipo Struttura*</label>
                                                <br></br>
                                                <div className="custom-control custom-radio custom-control-inline mt-2">
                                                    <input type="radio" className="custom-control-input" id="bnb"
                                                           name="tipo"
                                                           value="bnb" onChange={handleChangeTipo} required/>
                                                    <label className="custom-control-label" htmlFor="bnb">B&B</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline mt-2">
                                                    <input type="radio" className="custom-control-input"
                                                           id="casa_vacanze" name="tipo"
                                                           value="casa_vacanze" onChange={handleChangeTipo} required/>
                                                    <label className="custom-control-label" htmlFor="casa_vacanze">Casa
                                                        Vacanze</label>
                                                    <br></br>
                                                    <div className="invalid-feedback ml-2">
                                                        Seleziona il tipo di registrazione da effettuare
                                                    </div>
                                                </div>
                                                <br></br>
                                                <label htmlFor="disdetta_gratuita">Disdetta Gratuita*</label>
                                                <input id="disdetta_gratuita" name="disdetta_gratuita" type="number"
                                                       min="0" className="form-control" maxLength="40"
                                                       value={disdetta_gratuita}
                                                       onChange={handleChangeDisdettaGratuita}
                                                       placeholder="Inserisci il numero di giorni entro cui la disdetta sarà gratuita"
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Inserire Giorni Disdetta Gratuita, 0 se non è prevista
                                                </div>
                                                <label htmlFor="modalita_di_pagamento">Modalità di Pagamento*</label>

                                                <div className="form-group col" style={{margin: "auto"}}>
                                                    <div className="row">
                                                        <label htmlFor="modalita_di_pagamento">Modalita di Pagamento*</label>
                                                        <input id="modalita_di_pagamento" name="modalita_di_pagamento" type="text"
                                                               className="form-control" maxLength="40"
                                                               value={modalita_di_pagamento} onChange={handleChangeModalitaPagamento}
                                                               required/>
                                                        <div className="invalid-feedback">
                                                            Inserire modalità di pagamento
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="form-group col" style={{margin: "auto"}}>
                                                    <label htmlFor="servizi">Servizi*</label>
                                                    <input id="servizi" name="servizi" type='text'                                                            className="form-control" maxLength="40"
                                                           value={servizi}
                                                           onChange={handleChangeServizi} required/>

                                                </div>


                                                <label htmlFor="tassa_soggiorno">Tassa di Soggiorno*</label>
                                                <input id="tassa_soggiorno" name="tassa_soggiorno" type='number' min="0"
                                                       className="form-control" maxLength="40"
                                                       value={tassa_soggiorno}
                                                       onChange={handleChangeTassaSoggiorno} required/>
                                                <div className="invalid-feedback">
                                                    Inserire Prezzo Tassa di Soggiorno
                                                </div>

                                                <label htmlFor="punti_di_interesse">Punti di Interesse*</label>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control as="textarea" rows="3"
                                                                  value={punti_di_interesse}
                                                                  onChange={handleChangePuntiInteresse}
                                                    />

                                                    <div className="invalid-feedback">
                                                        Inserire Punti di Interesse
                                                    </div>
                                                </Form.Group>

                                                <label htmlFor="name">Ora Check-In*</label>
                                                <input id="ora_checkin" name="ora_checkin" type="time"
                                                       className="form-control" maxLength="40"
                                                       value={ora_checkin} onChange={handleChangeOraCheckin}
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Inserire Ora Check-In
                                                </div>
                                                <label htmlFor="name">Ora Check-Out*</label>
                                                <input id="ora_checkout" name="ora_checkout" type="time"
                                                       className="form-control" maxLength="40"
                                                       value={ora_checkout} onChange={handleChangeOraCheckout}
                                                       required/>
                                                <div className="invalid-feedback">
                                                    Inserire Ora Check-Out
                                                </div>
                                            </div>

                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Breve Descrizione della Struttura</Form.Label>
                                                <Form.Control as="textarea" rows="3" value={descrizione}
                                                              onChange={handleChangeDescrizione}/>
                                            </Form.Group>
                                            <div className="col-1">
                                                <Button name="ok" id="ok" type="submit" onClick={handleSubmit} style={{marginLeft:"-10px",color:"#ff6300"}}>Modifica</Button>
                                            </div>
                                        </form>
                                    </div>


                                </div>

                            </div>
                            <div className="col">

                            </div>
                        </div>
                        <BoxConfermaModificaStruttura
                            open={openConfermaModifica}
                            onClose={handleCloseConfermaModifica}
                            responseType={tipoRispostaModifica}
                        />

                    </div>

    );

};
export default ModificaStruttura;