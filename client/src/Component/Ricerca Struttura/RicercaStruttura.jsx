import React, {Component} from 'react';
import Input from "@material-ui/core/Input/Input";

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import simpson from "./casa-simpson-690x362.jpg"
import axios from "axios";



const RicercaStruttura=(props)=> {
    const [luogo,setLuogo]=React.useState("");
    const [data_inizio, setDataInizio]=React.useState("");
    const [data_fine, setDataFine]=React.useState("");
    const [npl, setNpl]=React.useState("");//numero posti letto
    const [tipo, setTipo]=React.useState("");
    const [disdetta_gratuita, setDisdettaGratuita]=("");
    const [modalita_di_pagamento, setModalitaPagamento]=React.useState("");
    const [costo_camera, setCostoCamera]=React.useState("");
    const [colazione_inclusa, setColazioneInclusa]=React.useState("");
    const [strutture, setStrutture]=React.useState(props);
    const state={luogo,data_inizio,data_fine,npl, tipo, disdetta_gratuita, modalita_di_pagamento, costo_camera, colazione_inclusa};

    const handleSubmit=(event)=>{
        event.preventDefault();
        alert("Dati inseriti "+luogo+" "+data_inizio+" "+data_fine+" "+npl);

        axios.post("https://localhost:9000/prenotazione/ricercaStruttura", state)
            .then((response)=>{
                alert(JSON.stringify(response.data[1]));
                setStrutture(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            })
    };
    const handleChangeLuogo=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setLuogo(valore);
        state.luogo=valore;
    };

    const handleChangeDataInizio=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataInizio(valore);
        state.data_inizio=valore;
    };
    const handleChangeDataFine=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setDataFine(valore);
        state.data_fine=valore;
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
    const handleChangeModalitaPagamento=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setModalitaPagamento(valore);
        state.modalita_di_pagamento=valore;
    };
    const handleChangeNpl=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNpl(valore);
        state.npl=valore;
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


        return(

            <div className="container">
                <div className="row">

                    <div className="col-sm-5 col-md-4 col-lg-3">
                        <div style={{backgroundColor:"#f9db3e",width:"100%",height:"auto",marginTop:"30px"}}>

                            <Button color="inherit" type="submit" onClick={handleSubmit} style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Cerca</Button>

                            <div className="form-group col" style={{margin:"auto" }}>
                                <h10>Destinazione:</h10>
                                <Input type="text" name="luogo" id="luogo" value={state.luogo} onChange={handleChangeLuogo} placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                            </div>

                            <div className="form-group col" style={{margin:"auto" }}>
                                <h10>Check-in:</h10>

                                <Input style={{width:"100%",backgroundColor:"white",margin:"auto"}}
                                       type="date"
                                       name="data_inizio"
                                       id="data_inizio"
                                       placeholder="date placeholder"
                                       value={state.data_inizio}
                                       onChange={handleChangeDataInizio}
                                />
                            </div>
                            <div className="form-group col" style={{margin:"auto"}}>
                                <h10>Check-out:</h10>

                                <Input style={{width:"100%",backgroundColor:"white",margin:"auto"}}
                                       type="date"
                                       name="data_fine"
                                       id="data_fine"
                                       placeholder="date placeholder"
                                       value={state.data_fine}
                                       onChange={handleChangeDataFine}
                                />
                            </div>
                            <div className="form-group col" style={{margin:"auto" }}>

                                <h10>Numero Persone:</h10>


                                <select className="form-control" id="npl" value={state.npl} onChange={handleChangeNpl}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>

                            <div>
                                <br/>
                                <Button color="inherit" href="/login" id="toggler"style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Filtri Avanzati</Button>

                                <UncontrolledCollapse toggler="#toggler">
                                    <br/>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Tipo Struttura</h10>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="bnb" name="tipo"
                                                   value="bnb" onChange={handleChangeTipo} />
                                            <label className="custom-control-label" htmlFor="bnb">B&B</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="casa_vacanze" name="tipo"
                                                   value="casa_vacanze" onChange={handleChangeTipo} />
                                            <label className="custom-control-label" htmlFor="casa_vacanze">Casa Vacanze</label>
                                        </div>
                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Disdetta Gratuita</h10>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="no" name="disdetta_gratuita"
                                                   value="0" onChange={handleChangeDisdettaGratuita} />
                                            <label className="custom-control-label" htmlFor="no">No</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="si" name="disdetta_gratuita"
                                                   value="1" onChange={handleChangeDisdettaGratuita} />
                                            <label className="custom-control-label" htmlFor="casa_vacanze">Casa Vacanze</label>
                                        </div>
                                    </div>

                                    <div className="form-check form-check-inline" style={{marginLeft:"15px"}}>
                                        <h10>Modalità di Pagamento</h10>
                                            <input className="form-check-input" type="checkbox" id="carta" name="carta" value="carta" onChange={handleChangeModalitaPagamento}/>
                                            <label className="form-check-label" htmlFor="carta"> Carta di Credito</label><br/>
                                            <input className="form-check-input" type="checkbox" id="struttura" name="struttura" value="struttura" onChange={handleChangeModalitaPagamento}/>
                                            <label className="form-check-label" htmlFor="struttura"> Pagamento in Struttura</label><br/>
                                            <input className="form-check-input" type="checkbox" id="anticipo_carta" name="anticipo_carta" value="anticipo_carta" onChange={handleChangeModalitaPagamento}/>
                                            <label className="form-check-label" htmlFor="anticipo_carta"> Acconto con Carta di Credito, Saldo in Struttura</label><br/>
                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>

                                        <h10>Costo Camera Massimo a Notte:</h10>
                                        <select className="form-control" id="costo_camera" value={state.costo_camera} onChange={handleChangeCostoCamera}>
                                            <option value="25">Costo &#60 €25 </option>
                                            <option value="50">Costo &#60 €50 </option>
                                            <option value="75">Costo &#60 €75</option>
                                            <option value="100">Costo &#60 €100</option>
                                            <option value="150">Costo &#60 €150</option>
                                            <option value="200">Costo &#60 €200</option>
                                        </select>
                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Colazione Inclusa</h10>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="no" name="colazione_inclusa"
                                                   value="0" onChange={handleChangeColazioneInclusa} />
                                            <label className="custom-control-label" htmlFor="no">No</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline mt-2">
                                            <input type="radio" className="custom-control-input" id="si" name="colazione_inclusa"
                                                   value="1" onChange={handleChangeColazioneInclusa} />
                                            <label className="custom-control-label" htmlFor="casa_vacanze">Casa Vacanze</label>
                                        </div>
                                    </div>


                                </UncontrolledCollapse>
                            </div>

                        </div>

                    </div>











                <div className="col-md-7 col-lg-8" style={{backgroundColor:"white",width:"100%",height:"auto",marginTop:"30px"}}>

                        <div className="card mb-3" style={{width:"100%",height:"auto"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={simpson} className="card-img" style={{height:"100%"}}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Casa di homer</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <Button color="inherit" href="/prenotazione" style={{width:"40%",marginLeft:"auto",backgroundColor:"#32508f",color:"white",display:"block"}}>Esplora</Button>

                                    </div>
                                </div>
                            </div>
                        </div>





                </div>

                    <div className="col-1">

                    </div>
                </div>







        </div>


        );

};
export default RicercaStruttura;