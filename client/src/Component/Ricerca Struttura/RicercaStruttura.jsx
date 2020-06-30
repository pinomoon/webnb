import React, {Component, useState} from 'react';
import Input from "@material-ui/core/Input/Input";

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import simpson from "./casa-simpson-690x362.jpg"
import axios from 'axios';



const RicercaStruttura=(props)=> {
    const [strutture, setStrutture]=useState(props);
    const [stato, setStato]=React.useState("");
    const [regione, setRegione]=React.useState("");
    const [citta, setCitta]=React.useState("");
    const [data_inizio, setDataInizio]=React.useState("");
    const [data_fine, setDataFine]=React.useState("");
    const [npl, setNpl]=React.useState("");//numero posti letto
    const state={stato,regione,citta,data_inizio,data_fine,npl};

    const handleSubmit=(event)=>{
        event.preventDefault();

        axios.post("https://localhost:9000/ricercaStruttura", state)
            .then((response)=>{
                alert(response.data);
            })
            .catch((error)=>{
                alert(error);
            })
    };
    const handleChangeStato=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setStato(valore);
        state.stato=valore;
    };
    const handleChangeRegione=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setRegione(valore);
        state.regione=valore;
    };
    const handleChangeCitta=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setCitta(valore);
        state.citta=valore;
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
    const handleChangeNpl=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNpl(valore);
        state.npl=valore;
    };


        return(

            <div className="container">
                <div className="row">

                    <div className="col-sm-5 col-md-4 col-lg-3">
                        <form  style={{backgroundColor:"#f9db3e",width:"100%",height:"auto",marginTop:"30px"}}name="form" id="form"  method="POST">
                            <Button color="inherit" name="ok" id="ok "type="submit" onClick={handleSubmit} style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Cerca</Button>

                            <div className="form-group col" style={{margin:"auto" }}>
                                <h10>Destinazione:</h10>
                                <Input type="text" name="stato" id="stato" placeholder="Stato" value={state.stato} onChange={handleChangeStato} style={{backgroundColor:"white",width:"100%"}}/>
                                <Input type="text" name="regione" id="regione" placeholder="Regione" value={state.regione} onChange={handleChangeRegione} style={{backgroundColor:"white",width:"100%"}}/>
                                <Input type="text" name="citta" id="citta" placeholder="Città" value={state.citta} onChange={handleChangeCitta} style={{backgroundColor:"white",width:"100%"}}/>
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
                                <Button color="inherit"  id="toggler"style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Filtri Avanzati</Button>

                                <UncontrolledCollapse toggler="#toggler">
                                    <br/>
                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-check form-check-inline" style={{marginLeft:"15px"}}>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
                                    </div>


                                </UncontrolledCollapse>
                            </div>

                        </form>

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