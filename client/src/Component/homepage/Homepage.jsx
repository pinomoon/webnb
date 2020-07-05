import React, {Component} from 'react';
import sfondo from '../images/best-hd-wallpapers-pc-background-laptop.jpg'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Homepage.css"

import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button";
import villa from "../GestioneStrutture/villa.jpg";
import simpson from "./casa-simpson-690x362.jpg";
import flinstones from "./casa-flin.jpg"
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import FormGroup from "@material-ui/core/FormGroup";
import {Home, Label} from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../header_trasparente.png";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Logout from "../logout/logout";
import NavDropdown from "react-bootstrap/NavDropdown";
import {UserContext} from "../../UserContext";
import axios from 'axios';
import RicercaStruttura from "../Ricerca Struttura/RicercaStruttura";
import {setStructureCookie} from "../../sessions";
import {Box} from "@material-ui/core";
import BoxData from "./BoxData";
import BoxAccesso from "../login/boxconferma";
import HotelIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const Homepage =()=>{
    const [luogo,setLuogo]=React.useState("");
    const [data_inizio, setDataInizio]=React.useState("");
    const [data_fine, setDataFine]=React.useState("");
    const [npl, setNpl]=React.useState("");//numero posti letto
    const [ricerca, setRicerca]=React.useState(false);
    const state={luogo,data_inizio,data_fine,npl};
    const [strutture, setStrutture]=React.useState([]);
    const href="https://localhost:3000/ricercastruttura?luogo="+luogo+"&?data_inizio="+data_inizio+"&?data_fine="+data_fine+"&?npl="+npl;
    const[openConferma, setOpenConferma]=React.useState(false);


    const [luogop]=React.useState("Sicilia");
    const [data_iniziop]=React.useState("2020-07-10");
    const [data_finep]=React.useState("2020-07-13");
    const [nplp]=React.useState("4");
    const [disdetta_gratuitap]=React.useState("10000");
    const [modalita_di_pagamentop]=React.useState("carta,struttura,anticipo_carta");
    const [servizip]=React.useState("wifi,parcheggio,piscina,animali");
    const [costo_camerap]=React.useState("75");
    const [colazione_inclusap]=React.useState("1");
    const [strutturep, setStrutturep]=React.useState([]);
    const statep={luogop,data_iniziop,data_finep,nplp,disdetta_gratuitap,modalita_di_pagamentop,servizip,costo_camerap,colazione_inclusap};

    const handleSubmitp=(event)=>{
        event.preventDefault();
        alert("Dati inseriti preferiti "+JSON.stringify(statep));

        axios.post("https://localhost:9000/prenotazione/ricercaStrutturap", statep)
            .then((response)=>{
                setStrutturep(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            })};

    const handleCloseConferma = () => {
        setOpenConferma(false);
    };
    const handleClickOpenConferma = () => {
        setOpenConferma(true);
    };

    const handleClickRicerca=()=>{
        setRicerca(true);
    };


    const handleSubmit=(event)=>{
        event.preventDefault();
        if((state.data_inizio==="") || (state.data_fine==="")){
            handleClickOpenConferma();
            return

        }
        if((state.data_inizio >= state.data_fine)){
            handleClickOpenConferma();
            return
        }
        alert("Dati inseriti "+luogo+" "+data_inizio+" "+data_fine+" "+npl);
        setStructureCookie({luogo,data_inizio,data_fine,npl});
        axios.post("https://localhost:9000/prenotazione/ricercaStruttura", state)
            .then((response)=>{
                alert(JSON.stringify(response.data[1]));

                setStrutture(response.data[1]);
                handleClickRicerca();
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
    const handleChangeNpl=(event)=>{
        const target=event.target;
        const valore=  target.value;
        setNpl(valore);
        state.npl=valore;

    };


    const user=React.useContext(UserContext);



        return(


         <container>
             {!ricerca &&
             <section className="cover" style={{height:"500px",width:"100%"}}>
                 <div className="cover_filter"></div>
                 <div className="cover_caption">
                     <div className="cover_caption_copy">
                         <h1>Benvenuti in </h1>
                         <h2>WeB&B</h2>
                         {(user.id == null || (user.tipo == 1)) &&
                         <div>
                             <h3 style={{color: "#ff6300"}}> Prenota la tua vacanza!</h3>
                             <br></br>
                             <div className="row">
                                 <div className="col-md-1 col-lg-1">
                                 </div>
                                 <div className="col-sm-12 col-md-9 col-lg-9">
                                     <div style={{
                                         width: "80%",
                                         height: "auto",
                                         backgroundColor: "white",
                                         margin: "auto",
                                         border: "2px solid #ff6300"
                                     }}>
                                         <form className="row" name="form" id="form" method="POST" >
                                             <div className="form-group  col-sm-12 col-md-3 col-lg-3">
                                                 <Input type="text" name="luogo" id="luogo"
                                                        placeholder="Dove vuoi andare?"
                                                        value={state.luogo} onChange={handleChangeLuogo}
                                                        style={{backgroundColor: "white", marginTop:"9px"}}/>
                                             </div>
                                             <div className="form-group col-sm-6 col-md-6 col-lg-3">
                                                 <Input style={{backgroundColor: "white", marginTop: "9px"}}
                                                        type="date"
                                                        name="data_inizio"
                                                        id="data_inizio"
                                                        placeholder="date placeholder"
                                                        value={state.data_inizio}
                                                        onChange={handleChangeDataInizio}
                                                 />
                                             </div>
                                             <div className="form-group col-sm-6 col-md-6 col-lg-3">
                                                 <Input style={{backgroundColor: "white", marginTop: "9px"}}
                                                        type="date"
                                                        name="data_fine"
                                                        id="data_fine"
                                                        placeholder="date placeholder"
                                                        value={state.data_fine}
                                                        onChange={handleChangeDataFine}
                                                 />
                                             </div>
                                             <div className="form-group col-md-2 col-lg-2">
                                                 <select className="form-control" id="npl" value={state.npl}
                                                         onChange={handleChangeNpl} style={{marginTop: "7px"}}>
                                                     <option>N. Ospiti</option>
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
                                             <div className="col-md-1 col-lg-1">
                                                 <Button type="submit" onClick={handleSubmit}  style={{
                                                     marginTop: "-2px",
                                                     backgroundColor: "#ff6300",
                                                     height: "106%",
                                                     color: "white",
                                                     borderRadius: 0
                                                 }}>Ricerca</Button>
                                             </div>
                                         </form>
                                         <div className="col-lg-1">
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-md-1 col-lg-1">
                                 <Button type="submit" onClick={handleSubmitp}  style={{
                                     marginTop: "-2px",
                                     backgroundColor: "#ff6300",
                                     height: "106%",
                                     color: "white",
                                     borderRadius: 0
                                 }}>I Consigliati da WeB&B</Button>
                             </div>
                                 <div key={strutturep.id_struttura}>
                                     <div className="card mb-3" style={{width:"30%",height:"auto"}}>
                                         <div className="row no-gutters">
                                             <div className="col-md-4">
                                             </div>
                                             <div className="col-md-8">
                                                 <div className="card-body">
                                                     <h5 className="card-title">{strutturep.nome_struttura}</h5>
                                                     {strutturep.tipo==="bnb" &&
                                                     <div>
                                                         <p><HotelIcon/> Bed and Breakfast</p>
                                                     </div>

                                                     }
                                                     {strutturep.tipo==="casa_vacanze" &&
                                                     <div>
                                                         <p><Home/> Casa Vacanze</p>
                                                     </div>

                                                     }
                                                     <p className="card-text"> Indirizzo: {strutturep.indirizzo_struttura},{strutturep.citta},{strutturep.regione} .</p>

                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>

                         </div>

                             }
                             {user.tipo == 0 &&
                             <div>
                                 <div className="row">
                                     <div className="col-md-2 col-lg-4">
                                     </div>
                                     <div className="col-sm-12 col-md-8 col-lg-4">
                                         <Button href="/inseriscistruttura" style={{
                                             margin:"auto",
                                             marginTop: "-2px",
                                             backgroundColor: "#ff6300",
                                             height: "auto%",
                                             width: "50%",
                                             color: "white",
                                             borderRadius: 0
                                         }}>Inserisci la tua struttura!</Button>

                                     </div>
                                     <div className="col-md-2 col-lg-4">
                                     </div>
                                 </div>
                             </div>
                             }
                     </div>
                 </div>

             </section>
             }
             {ricerca&&
             <RicercaStruttura
                 strutture={strutture}
             />
             }



            <br/>
            <br/>






             <BoxData
                 open={openConferma}
                 onClose={handleCloseConferma}
             />;



         </container>


        );


}

export default Homepage;