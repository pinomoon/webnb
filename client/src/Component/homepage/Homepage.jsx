import React, {useState} from 'react';
import "./Homepage.css"
import Button from "@material-ui/core/Button";
import villa from "../GestioneStrutture/villa.jpg";
import {Home} from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import {UserContext} from "../../UserContext";
import axios from 'axios';
import RicercaStruttura from "../Ricerca Struttura/RicercaStruttura";
import {setStructureCookie} from "../../sessions";
import HotelIcon from '@material-ui/icons/Hotel';
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

const Homepage =()=>{
    const classes=useStyles();
    const [luogo,setLuogo]=React.useState("");
    const [data_inizio, setDataInizio]=React.useState("");
    const [data_fine, setDataFine]=React.useState("");
    const [npl, setNpl]=React.useState("");//numero posti letto
    const [ricerca, setRicerca]=React.useState(false);
    const state={luogo,data_inizio,data_fine,npl};
    const [strutture, setStrutture]=React.useState([]);
    const href="https://localhost:3000/ricercastruttura?luogo="+luogo+"&?data_inizio="+data_inizio+"&?data_fine="+data_fine+"&?npl="+npl;
    const[openNoDate, setOpenNoDate]=React.useState(false);
    const[openErroreDate, setOpenErroreDate]=useState(false);


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

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/prenotazione/ricercaStrutturap", statep)
            .then((response)=>{
                setStrutturep(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            });
    },[]);
    const handleCloseNoDate = () => {
        setOpenNoDate(false);
    };
    const handleCloseErroreDate = () => {
        setOpenErroreDate(false);
    };


    const handleClickRicerca=()=>{
        setRicerca(true);
    };


    const handleSubmit=(event)=>{
        event.preventDefault();
        if((state.data_inizio==="") || (state.data_fine==="")){
            setOpenNoDate(true);
            return

        }
        if((state.data_inizio >= state.data_fine)){
            setOpenErroreDate(true);
            return
        }
        setStructureCookie({luogo,data_inizio,data_fine,npl});
        axios.post("https://localhost:9000/prenotazione/ricercaStruttura", state)
            .then((response)=>{
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
            <section className="cover" style={{height:"400px",width:"100%"}}>
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
                                <div className="col-sm-12 col-md-10 col-lg-10">
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




            {!ricerca && (user.id == null || (user.tipo == 1)) &&
            <section className="cards clearfix">
                <h5 align="center" style={{color: "#ff6300"}}> I consigliati da WeB&B</h5>
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8">
                        <div className="row">
                            { strutturep[0]!=[] && (strutturep.map((strutturep)=>{
                                return(
                                    <div key={strutturep.id_struttura}>

                                        <div className="col-sm-6 col-md-3 col-lg-4">
                                            <section className="cards clearfix">
                                                <div className="card" style={{width:"100%",height:"100%"}}>
                                                    <img className="card_image" src={villa}  alt=" Villa "/>
                                                    <div className="card_copy">
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
                                                        <p style={{margin:0,whiteSpace:"nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}>{strutturep.descrizione}
                                                        </p>
                                                        <p style={{margin:0,whiteSpace:"nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}>Indirizzo: {strutturep.indirizzo_struttura}, {strutturep.citta}, {strutturep.regione}</p>

                                                    </div>
                                                </div>

                                            </section>
                                        </div>
                                    </div>

                                );
                            }))}
                        </div>
                    </div>
                </div>
            </section>
            }




            <div className={classes.root}>
                <Snackbar open={openNoDate} autoHideDuration={6000} onClose={handleCloseNoDate} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseNoDate} severity="error">
                        Inserisci Data Check-In e Data Check-Out!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErroreDate} autoHideDuration={6000} onClose={handleCloseErroreDate} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseErroreDate} severity="error">
                        Errore! Non Puoi Inserire una Data Check-Out Precedente alla Data Check-In
                    </Alert>
                </Snackbar>
            </div>




        </container>


    );


}

export default Homepage;