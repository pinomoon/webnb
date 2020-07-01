import React from 'react';
import Input from "@material-ui/core/Input/Input";

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import simpson from "./casa-simpson-690x362.jpg"
import axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CardActions from "@material-ui/core/CardActions";




const RicercaStruttura=(props)=> {
    const [luogo,setLuogo]=React.useState("");
    const [data_inizio, setDataInizio]=React.useState("");
    const [data_fine, setDataFine]=React.useState("");
    const [npl, setNpl]=React.useState("");//numero posti letto
    const [tipo, setTipo]=React.useState("");
    const [disdetta_gratuita, setDisdettaGratuita]=React.useState("");
    const [modalita_di_pagamento, setModalitaPagamento]=React.useState("");
    const [costo_camera, setCostoCamera]=React.useState("");
    const [colazione_inclusa, setColazioneInclusa]=React.useState("");
    let {strutture}=props;

    const struttureList=strutture.map(struttura=>{
        var blob=new Blob([struttura.immagine_1], {type:'image/bmp'});
        var image=new Image();
       // image.src='data:image/bmp;base64,'+punycode.encode(blob);
        //console.log(image.src);

        return(

            <div className="col-md-4" key={struttura.id_struttura}>
                <Card >
                    <CardHeader title={struttura.nome_struttura}/>
                    <CardContent>
                        <p> {struttura.tipo} </p>
                        <p> {struttura.indirizzo_struttura} </p>
                        <p> {struttura.citta} </p>
                        <p> {struttura.regione} </p>
                        <p> {struttura.stato} </p>
                        <p > {struttura.prezzo[0].prezzo_struttura} €</p>
                        <img id="image" src={image.src} alt="nnnnnnnnn"></img>


                    </CardContent>
                    <CardActions>
                        <Tooltip title="Esplora Struttura" placement="bottom-start">
                            <Button color="inherit" href="/prenotazione" style={{backgroundColor:"#32508f",color:"white"}}>Esplora</Button>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>

        );
    });

    const state={luogo,data_inizio,data_fine,npl, tipo, disdetta_gratuita, modalita_di_pagamento, costo_camera, colazione_inclusa};

    const handleSubmit=(event)=>{
        event.preventDefault();
        alert("Dati inseriti "+luogo+" "+data_inizio+" "+data_fine+" "+npl);

        axios.post("https://localhost:9000/prenotazione/ricercaStruttura", state)
            .then((response)=>{
                alert(JSON.stringify(response.data[1]));
                strutture=(response.data[1]);
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

                        <Button color="inherit" type="submit" onClick={handleSubmit} style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block",width:"100%"}}>Cerca</Button>

                        <div className="form-group col" style={{margin:"auto"}}>
                            <br/>
                            <h6>Destinazione:</h6>
                            <Input type="text" name="luogo" id="luogo" value={state.luogo} onChange={handleChangeLuogo} placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"90%"}}/>


                        </div>

                        <div className="form-group col" style={{margin:"auto" }}>
                            <br/>
                            <h6>Check-in:</h6>

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
                            <br/>
                            <h6>Check-out:</h6>

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
                            <br/>
                            <h6>Numero Persone:</h6>


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
                                    <h6>Tipo Struttura</h6>

                                    <div className="row">
                                        <div className="col-3">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="bnb" name="tipo"
                                                       value="bnb" onChange={handleChangeTipo} />
                                                <label className="custom-control-label" htmlFor="bnb">B&B</label>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="casa_vacanze" name="tipo"
                                                       value="casa_vacanze" onChange={handleChangeTipo} />
                                                <label className="custom-control-label" htmlFor="casa_vacanze">Casa Vacanze</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col" style={{margin:"auto" }}>
                                    <br/>
                                    <h6>Disdetta Gratuita</h6>

                                    <div className="row">
                                        <div className="col-3">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="no" name="disdetta_gratuita"
                                                       value="0" onChange={handleChangeDisdettaGratuita} />
                                                <label className="custom-control-label" htmlFor="no">No</label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="si" name="disdetta_gratuita"
                                                       value="1" onChange={handleChangeDisdettaGratuita} />
                                                <label className="custom-control-label" htmlFor="si">Si</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group col" style={{margin:"auto"}}>
                                    <br/>
                                    <h6 >Modalità di Pagamento</h6>



                                    <div className="row" >
                                        <div className="col-1">
                                        </div>
                                        <div className="col-1">
                                            <input className="form-check-input" type="checkbox" id="carta" name="carta" value="carta" onChange={handleChangeModalitaPagamento}/>
                                        </div>
                                        <div className="col-8">
                                            <label className="form-check-label " htmlFor="carta" > Carta di Credito</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-1">
                                        </div>
                                        <div className="col-1">
                                            <input className="form-check-input " type="checkbox" id="struttura" name="struttura" value="struttura" onChange={handleChangeModalitaPagamento}/>
                                        </div>
                                        <div className="col-8">
                                            <label className="form-check-label " htmlFor="struttura"> Pagamento in Struttura</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-1">
                                        </div>
                                        <div className="col-1">
                                            <input className="form-check-input " type="checkbox" id="anticipo_carta" name="anticipo_carta" value="anticipo_carta" onChange={handleChangeModalitaPagamento}/>
                                        </div>
                                        <div className="col-8">
                                            <label className="form-check-label " htmlFor="anticipo_carta"> Acconto con Carta di Credito</label>
                                        </div>
                                    </div>
                                    <br/>


                                </div>


                                <div className="form-group col" style={{margin:"auto" }}>
                                    <h6 >Costo Camera Massimo a Notte:</h6>
                                    <select className="form-control" id="costo_camera" value={state.costo_camera} onChange={handleChangeCostoCamera}>
                                        <option value="null">-</option>
                                        <option value="25">Costo &#60 €25 </option>
                                        <option value="50">Costo &#60 €50 </option>
                                        <option value="75">Costo &#60 €75</option>
                                        <option value="100">Costo &#60 €100</option>
                                        <option value="150">Costo &#60 €150</option>
                                        <option value="200">Costo &#60 €200</option>
                                    </select>
                                    <br/>
                                </div>

                                <div className="form-group col" style={{margin:"auto" }}>
                                    <h6>Colazione Inclusa</h6>
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="no" name="colazione_inclusa"
                                                       value="0" onChange={handleChangeColazioneInclusa} />
                                                <label className="custom-control-label" htmlFor="no">No</label>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="custom-control custom-radio custom-control-inline mt-2">
                                                <input type="radio" className="custom-control-input" id="si" name="colazione_inclusa"
                                                       value="1" onChange={handleChangeColazioneInclusa} />
                                                <label className="custom-control-label" htmlFor="si">Si</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br/>
                                    </div>
                                </div>


                            </UncontrolledCollapse>
                        </div>

                    </div>
                    </div>

                    {struttureList}

                    <div className="col-1">

                    </div>
                </div>







        </div>


        );

};
export default RicercaStruttura;