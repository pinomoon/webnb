import React, {useState} from 'react';
import Input from "@material-ui/core/Input/Input";
import { Button} from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import {getStructureCookie} from "../../sessions";
import Home from '@material-ui/icons/Home';
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


const RicercaStruttura=(props)=> {
    const classes=useStyles();
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var token = getUrlVars()["token"];


    const [luogo,setLuogo]=React.useState(getStructureCookie().luogo);
    const [data_inizio, setDataInizio]=React.useState(getStructureCookie().data_inizio);
    const [data_fine, setDataFine]=React.useState(getStructureCookie().data_fine);
    const [npl, setNpl]=React.useState(getStructureCookie().npl);//numero posti letto
    let tipo="";
    const [bnb, setBnb]=React.useState("");
    const [casaVacanze, setcasaVacanze]=React.useState("");

    let disdetta_gratuita="";
    let modalita_di_pagamento="";
    const [modalita_carta, setModalitaCarta]=React.useState("");
    const [modalita_struttura, setModalitaStruttura]=React.useState("");
    const [modalita_acconto, setModalitaAcconto]=React.useState("");
    let servizi="";
    const [wifi, setWifi]=React.useState("");
    const [parcheggio, setParcheggio]=React.useState("");
    const [piscina, setPiscina]=React.useState("");
    const [animali, setAnimali]=React.useState("");
    const [costo_camera, setCostoCamera]=React.useState("");
    let colazione_inclusa="";
    const [struttureRicerca, setStruttureRicerca]=React.useState([]);
    const[openNoDate, setOpenNoDate]=React.useState(false);
    const[openErroreDate, setOpenErroreDate]=useState(false);

    let {strutture}=props;






    const state={luogo,data_inizio,data_fine,npl, tipo, disdetta_gratuita, modalita_di_pagamento,servizi, costo_camera, colazione_inclusa};

    const handleSubmit=(event)=>{
        event.preventDefault();
        handleChangeColazioneInclusa();
        handleChangeDisdettaGratuita();
        handleChangeTipo();
        handleChangeModalitaPagamento();
        handleChangeServizi();
        if((state.data_inizio==="") || (state.data_fine==="")){
            setOpenNoDate(true);
            return

        }
        if((state.data_inizio >= state.data_fine)){
            setOpenErroreDate(true);
            return
        }
        alert(JSON.stringify(state));
        axios.post("https://localhost:9000/prenotazione/ricercaStruttura", state)
            .then((response)=>{
                if(strutture!=[]){
                    strutture[0]=null;
                }
                setStruttureRicerca(response.data[1]);
            })
            .catch((error)=>{
                alert(error);
            })    };

    const handleCloseNoDate = () => {
        setOpenNoDate(false);
    };
    const handleCloseErroreDate = () => {
        setOpenErroreDate(false);
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


        if(window.document.getElementById('bnb').checked===true && window.document.getElementById('casa_vacanze').checked===true){
            state.tipo="%";
        }
        else if(window.document.getElementById('bnb').checked===true){
            state.tipo=bnb;
        }

        else if(window.document.getElementById('casa_vacanze').checked===true){
            state.tipo=casaVacanze;
        }
        else{
            state.tipo="%";
        }
    };
    const handleChangeBnb=(event)=>{
        const target=event.target;
        const valore=target.value;
        const stato=target.checked;

        if(stato===true) {
            setBnb(valore);
        }
        else{
            setBnb("");
        }

    };
    const handleChangeCasaVacanze=(event)=>{
        const target=event.target;
        const valore=target.value;
        const stato=target.checked;

        if(stato===true) {
            setcasaVacanze(valore);
        }
        else{
            setcasaVacanze("");
        }

    };
    const handleChangeDisdettaGratuita=(event)=>{
        if(window.document.getElementById('dSi').checked===true && window.document.getElementById('dNo').checked===true){
            state.disdetta_gratuita="";
        }
        else if(window.document.getElementById('dSi').checked===true){
            state.disdetta_gratuita="1";
        }

        else if(window.document.getElementById('dNo').checked===true){
            state.disdetta_gratuita="0";
        }
        else{
            state.disdetta_gratuita="";
        }
       
    };
    const handleChangeModalitaPagamento=()=>{
        if(modalita_carta!==''){
            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_carta+",";
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+"%,";
        }
        if(modalita_struttura!==''){
            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_struttura+",";
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+"%,";
        }
        if(modalita_acconto!==''){
            state.modalita_di_pagamento=state.modalita_di_pagamento+""+modalita_acconto;
        }
        else{
            state.modalita_di_pagamento=state.modalita_di_pagamento+"%";
        }
    };
    const handleChangeModalitaCarta=(event)=>{
        const target=event.target;
        const valore=target.value;
        const stato=target.checked;

        if(stato===true) {
            setModalitaCarta(valore);
        }
        else{
            setModalitaCarta("");
        }

    };
    const handleChangeModalitaStruttura=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setModalitaStruttura(valore);
        }
        else{
            setModalitaStruttura("");
        }
    };
    const handleChangeModalitaAcconto=(event)=>{
        const target=event.target;
        const valore=  target.value;
        const stato=target.checked;

        if(stato===true) {
            setModalitaAcconto(valore);
        }
        else{
            setModalitaAcconto("");
        }
    };
    const handleChangeServizi=()=>{
        if(wifi!==''){
            state.servizi=state.servizi+""+wifi+",";
        }
        else{
            state.servizi=state.servizi+"%,";
        }
        if(parcheggio!==''){
            state.servizi=state.servizi+""+parcheggio+",";
        }
        else{
            state.servizi=state.servizi+"%,";
        }
        if(piscina!==''){
            state.servizi=state.servizi+""+piscina+",";
        }
        else{
            state.servizi=state.servizi+"%,";
        }
        if(animali!==''){
            state.servizi=state.servizi+""+animali;
        }
        else{
            state.servizi=state.servizi+"%";
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
        if(window.document.getElementById('cSi').checked===true && window.document.getElementById('cNo').checked===true){
            state.colazione_inclusa="%";
        }
        else if(window.document.getElementById('cSi').checked===true){
            state.colazione_inclusa="1";
        }

        else if(window.document.getElementById('cNo').checked===true){
            state.colazione_inclusa="0";
        }
        else{
            state.colazione_inclusa="%";
        }
    };
    //controlli per l'inserimento delle date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var min= new Date();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;



    return(

        <div className="container">
            <div className="row">

                <div className="col-sm-5 col-md-5 col-lg-3">
                    <div style={{backgroundColor:"#e07e06",width:"100%",height:"auto",marginTop:"30px"}}>

                        <Button color="inherit" type="submit" onClick={handleSubmit} style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block",width:"100%"}}>Cerca</Button>

                        <div className="form-group col" style={{margin:"auto"}}>
                            <br/>
                            <h6>Destinazione:</h6>
                           <Input type="text" name="luogo" id="luogo" value={state.luogo} onChange={handleChangeLuogo}  placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>


                        </div>

                        <div className="form-group col" style={{margin:"auto" }}>
                            <br/>
                            <h6>Check-in:</h6>

                            <input style={{width:"100%",backgroundColor:"white",margin:"auto",border:"none",outline:"none"}}
                                   type="date"
                                   name="data_inizio"
                                   id="data_inizio"
                                   placeholder="date placeholder"
                                   min={today}
                                   max={state.data_fine}
                                   value={state.data_inizio}
                                   onChange={handleChangeDataInizio}
                            />


                        </div>
                        <div className="form-group col" style={{margin:"auto"}}>
                            <br/>
                            <h6>Check-out:</h6>

                            <input style={{width:"100%",backgroundColor:"white",margin:"auto",border:"none",outline:"none"}}
                                   type="date"
                                   name="data_fine"
                                   id="data_fine"
                                   placeholder="date placeholder"
                                   min={state.data_inizio}
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
                                    <div className="row" >
                                        <div className="col-1">
                                        </div>
                                        <div className="col-3">
                                            <input className="form-check-input" type="checkbox" id="bnb" name="tipo" value="bnb" defaultValue="" onChange={handleChangeBnb}/>

                                            <label className="form-check-label " htmlFor="bnb" > B&B</label>

                                        </div>
                                        <div className="col-7">
                                            <input className="form-check-input" type="checkbox" id="casa_vacanze" name="tipo" value="casa_vacanze" defaultValue="" onChange={handleChangeCasaVacanze}/>
                                            <label className="form-check-label " htmlFor="casa_vacanze" > Casa Vacanze</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group col" style={{margin:"auto" }}>
                                    <br/>
                                    <h6>Disdetta Gratuita</h6>

                                    <div className="row">
                                    <div className="col-1">
                                        </div>
                                        <div className="col-3">

                                            <input className="form-check-input" type="checkbox" id="dSi" name="disdetta" value="si" defaultValue=""/>
                                            <label className="form-check-label " htmlFor="dSi" >Si</label>

                                        </div>
                                        <div className="col-7">
                                            <input className="form-check-input" type="checkbox" id="dNo" name="disdetta" value="no" defaultValue=""/>
                                            <label className="form-check-label " htmlFor="dNo" >No</label>
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

                                            <input className="form-check-input" type="checkbox" id="carta" name="carta" value="carta" defaultValue="" onChange={handleChangeModalitaCarta}/>
                                        </div>
                                        <div className="col-8">
                                            <label className="form-check-label " htmlFor="carta" > Carta di Credito</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-1">
                                        </div>
                                        <div className="col-1">
                                            <input className="form-check-input " type="checkbox" id="struttura" name="struttura" defaultValue="" value="struttura" onChange={handleChangeModalitaStruttura}/>
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


                                </div>
                                <div className="form-group col" style={{margin:"auto"}}>
                                    <br/>
                                    <h6 >Servizi</h6>



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


                                <div className="form-group col" style={{margin:"auto" }}>
                                    <br/>
                                    <h6 >Costo Camera Massimo a Notte:</h6>
                                    <select className="form-control" id="costo_camera" value={state.costo_camera} onChange={handleChangeCostoCamera}>
                                        <option value="null">-</option>
                                        <option value="25">Costo &le; €25 </option>
                                        <option value="50">Costo &le; €50 </option>
                                        <option value="75">Costo &le; €75</option>
                                        <option value="100">Costo &le; €100</option>
                                        <option value="150">Costo &le; €150</option>
                                        <option value="200">Costo &le; €200</option>
                                    </select>
                                    <br/>
                                </div>



                                <div className="form-group col" style={{margin:"auto" }}>
                                    <h6>Colazione Inclusa</h6>
                                    <div className="row">
                                    <div className="col-1">
                                        </div>
                                        <div className="col-3">

                                            <input className="form-check-input" type="checkbox" id="cSi" name="colazione" value="si" defaultValue=""/>
                                            <label className="form-check-label " htmlFor="dSi" >Si</label>

                                        </div>
                                        <div className="col-7">
                                            <input className="form-check-input" type="checkbox" id="cNo" name="colazione" value="no" defaultValue=""/>
                                            <label className="form-check-label " htmlFor="dNo" >No</label>
                                        </div>
                                    </div>
                                    <br/>

                                    <div className="row">

                                        <Button color="inherit" type="submit" onClick={handleSubmit} style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block",width:"100%"}}>Cerca</Button>
                                    </div>
                                </div>


                            </UncontrolledCollapse>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 col-md-4 col-lg-9" style={{marginTop:"30px"}}>
                    {struttureRicerca!=[] &&(struttureRicerca.map((struttura)=>{

                        var href="/esplora?struttura="+struttura.id_struttura+"&?data_inizio="+data_inizio+"&?data_fine="+data_fine+"&?npl="+npl;


                        return (
                            <div key={struttura.id_struttura}>
                                <div className="card mb-3" style={{width:"100%",height:"auto"}}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img id="image" src={struttura.immagine_1} alt="img" className="card-img" style={{height:"100%"}}/>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{struttura.nome_struttura}</h5>
                                                {struttura.tipo==="bnb" &&
                                                <div>
                                                    <p><HotelIcon/> Bed and Breakfast</p>
                                                </div>

                                                }
                                                {struttura.tipo==="casa_vacanze" &&
                                                <div>
                                                    <p><Home/> Casa Vacanze</p>
                                                </div>

                                                }
                                                <p className="card-text"> Indirizzo: {struttura.indirizzo_struttura},{struttura.citta},{struttura.regione} .</p>
                                                <h5> Prezzo: {struttura.prezzo[0].prezzo_struttura} €</h5>
                                                <Tooltip title="Esplora Struttura" placement="bottom-start">
                                                    <Button color="inherit" href={href} style={{width:"40%",marginLeft:"auto",backgroundColor:"#32508f",color:"white",display:"block"}}>Esplora</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        );
                    }))}{struttureRicerca[0]==null&& strutture[0]!=null&&(strutture.map((struttura)=>{

                    var href="/esplora?struttura="+struttura.id_struttura+"&?data_inizio="+data_inizio+"&?data_fine="+data_fine+"&?npl="+npl;

                    return (

                        <div key={struttura.id_struttura}>
                            <div className="card mb-3" style={{width:"100%",height:"auto"}}>
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img id="image" src={struttura.immagine_1}  className="card-img" style={{height:"100%"}}/>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{struttura.nome_struttura}</h5>
                                            {struttura.tipo==="bnb" &&
                                            <div>
                                                <p><HotelIcon/> Bed and Breakfast</p>
                                            </div>

                                            }
                                            {struttura.tipo==="casa_vacanze" &&
                                            <div>
                                                <p><Home/> Casa Vacanze</p>
                                            </div>

                                            }


                                            <p className="card-text"> Indirizzo: {struttura.indirizzo_struttura},{struttura.citta},{struttura.regione} .</p>
                                            <h5> Prezzo: {struttura.prezzo[0].prezzo_struttura} €</h5>


                                            <Tooltip title="Esplora Struttura" placement="bottom-start">
                                                <Button color="inherit" href={href} style={{width:"100%",marginLeft:"auto",backgroundColor:"#32508f",color:"white",display:"block"}}>Esplora</Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    );
                }))}
                </div>
            </div>




            <div className="col-1">

            </div>

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






        </div>


    );

};
export default RicercaStruttura;