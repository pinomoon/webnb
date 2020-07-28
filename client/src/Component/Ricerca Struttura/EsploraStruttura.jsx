import React from 'react';
import Button from "@material-ui/core/Button";
import simpson from "./casa-simpson-690x362.jpg"
import cucina from "./cucina.jpg";
import giardino from "./1.png"
import ListGroup from "react-bootstrap/ListGroup";
import icon from "./User-01.jpg";
import axios from "axios";
import WifiRoundedIcon from '@material-ui/icons/WifiRounded';
import PoolRoundedIcon from '@material-ui/icons/PoolRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';
import LocalParkingRoundedIcon from '@material-ui/icons/LocalParkingRounded';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BoxConfermaPreferiti from  './boxConfermaPreferiti';
import { getSessionCookie } from '../../sessions';
import './EsploraStruttura.css';





const EsploraStruttura=()=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var id_struttura = getUrlVars()["struttura"];
    var data_inizio=getUrlVars()["data_inizio"];
    var data_fine=getUrlVars()["data_fine"];
    var npl=getUrlVars()["npl"];


    const [id_utente,setIdUtente]=React.useState(getSessionCookie().id);
    const [struttura,setStruttura]=React.useState([]);
    const [camere, setCamere]=React.useState([]);
    const [recensioni, setRecensioni]=React.useState([]);
    const [preferiti, setPreferiti]=React.useState(false);
    const [openConfermaPreferiti, setOpenConfermaPreferiti]=React.useState(false);
    const [tipoPreferiti, setTipoPreferiti]=React.useState("");

    React.useLayoutEffect(()=> {
        axios.post("https://localhost:9000/prenotazione/esploraStruttura",{id_struttura,data_inizio,data_fine,npl,id_utente})
            .then((response)=>{
                setStruttura(response.data[1]);
                setCamere(response.data[2]);
                setRecensioni(response.data[3]);
                if(response.data[4].length==0){
                    setPreferiti(false);
                }
                else{
                    setPreferiti(true);
                }
            })
            .catch((error)=>{
                alert(error);
            });
    },[]);

    const handleClickOpenConfermaPreferiti=()=>{
        setOpenConfermaPreferiti(true);
    };
    const handleCloseConfermaPreferiti=()=>{
        setOpenConfermaPreferiti(false);
        setTipoPreferiti("");
    };
    const handleClickPreferiti=(event)=>{
        event.preventDefault();
        if(preferiti==false){
            axios.post("https://localhost:9000/iMieiPreferiti/aggiungiPreferiti",{id_utente,id_struttura})
                .then((response)=>{
                    if(response.data=="1"){
                        setTipoPreferiti("1");
                        handleClickOpenConfermaPreferiti();
                        setPreferiti(!preferiti);
                    }
                    else{
                        setTipoPreferiti("3");
                        handleClickOpenConfermaPreferiti();
                    }

                })
                .catch((error)=>{
                    alert(error);
                })
        }
        else{
            axios.post("https://localhost:9000/iMieiPreferiti/eliminaPreferiti",{id_utente,id_struttura})
                .then((response)=>{
                    if(response.data=="1"){
                        setTipoPreferiti("2");
                        handleClickOpenConfermaPreferiti();
                        setPreferiti(!preferiti);
                    }
                    else{
                        setTipoPreferiti("4");
                        handleClickOpenConfermaPreferiti();
                    }
                })
                .catch((error)=>{
                    alert(error);
                })
        }


    };



    return (

        <div className="container">
            <div className="row">
                <div className="col-1">
                </div>
                <div className="col-sm-12 col-md-7 col-lg-10"
                     style={{backgroundColor: "white", width: "100%", height: "auto", marginTop: "30px"}}>
                    <div className="row">
                        <div className="col-sm-10 col-lg-10">
                            {struttura.map(value=>
                                <h5>{value.nome_struttura}</h5>
                            )}
                        </div>
                        {getSessionCookie().tipo=="1" &&
                        <div className="col-sm-1 col-mg-1 col-lg-1" class="effetto">

                            {preferiti == false ? (

                                    <Tooltip title="Aggiungi ai preferiti" placement="top" >

                                        <Button onClick={handleClickPreferiti} class="button">
                                            <FavoriteBorderIcon />
                                        </Button>
                                    </Tooltip>
                                )
                                : (
                                    <Tooltip title="Rimuovi dai preferiti" placement="top">

                                        <Button onClick={handleClickPreferiti} class="button">
                                            <FavoriteIcon />
                                        </Button>
                                    </Tooltip> )

                            }

                            <br/>
                        </div>
                        }
                    </div>

                    <div className="row">
                        <div className="col">
                            <img src={simpson} style={{width: "100%"}}/>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <br/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img src={cucina} style={{width: "100%", height: "90%"}}/>
                        </div>
                        <div className="col-6">
                            <img src={giardino} style={{width: "100%", height: "90%"}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div style={{
                                backgroundColor: "white",
                                borderRight: "2px solid #ff6300",
                                height: "100%"
                            }}>
                                <h5>Descrizione struttura</h5>
                                {struttura.map(value=>
                                    <p>{value.descrizione}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div style={{
                                margin: "auto",
                                border: "3px solid #ff6300",
                                height: "auto",
                                width: "70%",
                                backgroundColor: "white smoke"
                            }}>
                                <h5 style={{textAlign: "center"}}>Servizi</h5>
                                <ListGroup variant="flush">
                                    {struttura.map(value=>
                                        <ListGroup.Item style={{width:"90%",margin:"auto"}}>
                                            {value.servizi === "wifi,,," &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>


                                            </div>
                                            }
                                            {value.servizi === "wifi,parcheggio,," &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                            </div>
                                            }
                                            {value.servizi === "wifi,,piscina," &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><PoolRoundedIcon/> Piscina</p>



                                            </div>
                                            }
                                            {value.servizi === "wifi,,,animali" &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === "wifi,parcheggio,piscina," &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><PoolRoundedIcon/> Piscina</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>


                                            </div>
                                            }
                                            {value.servizi === "wifi,,piscina,animali" &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><PoolRoundedIcon/> Piscina</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === "wifi,parcheggio,,animali" &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === "wifi,parcheggio,piscina,animali" &&
                                            <div>
                                                <p><WifiRoundedIcon/> Wi-Fi</p>
                                                <p><PoolRoundedIcon/> Piscina</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === ",parcheggio,," &&
                                            <div>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                            </div>
                                            }
                                            {value.servizi === ",parcheggio,piscina," &&
                                            <div>
                                                <p><PoolRoundedIcon/> Piscina</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>


                                            </div>
                                            }
                                            {value.servizi === ",parcheggio,,animali" &&
                                            <div>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === ",parcheggio,piscina,animali" &&
                                            <div>
                                                <p><PoolRoundedIcon/> Piscina</p>
                                                <p><LocalParkingRoundedIcon/> Parcheggio in struttura</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === ",,piscina," &&
                                            <div>
                                                <p><PoolRoundedIcon/> Piscina</p>


                                            </div>
                                            }
                                            {value.servizi === ",,piscina,animali" &&
                                            <div>
                                                <p><PoolRoundedIcon/> Piscina</p>

                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }
                                            {value.servizi === ",,,animali" &&
                                            <div>


                                                <p><PetsRoundedIcon/> Animali Domestici Ammessi</p>

                                            </div>
                                            }

                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </div>
                            <div className="row">
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div style={{
                                width: "100%",
                                height: "auto",
                                borderTop: "2px solid #ff6300",
                                borderBottom: "2px solid #ff6300",
                                backgroundColor: "white",
                                margin: "auto"
                            }}>
                                <br/>
                                <h5 style={{textAlign: "center"}}>Punti di interesse</h5>
                                {struttura.map(value =>
                                    <p>{value.punti_di_interesse}</p>
                                )}
                                <br/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <h3 className="text-center">Disponibilità camere</h3>
                        </div>
                    </div>
                    <div className="row" style={{borderBottom: "2px solid #ff6300"}}>
                        <div className="col">
                            <table className="table table-hover table-responsive" style={{width:"80%",margin:"auto",display:"block"}}>
                                <thead>
                                <tr>
                                    <th scope="col" style={{textAlign:"center"}}>Nome Camera</th>
                                    <th scope="col" style={{textAlign:"center"}}>N.Persone<img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>
                                    </th>
                                    <th scope="col" style={{textAlign:"center"}}>Colazione Inclusa</th>
                                    <th scope="col" style={{textAlign:"center"}}>Prezzo</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {camere.map((value)=>{
                                    let stringa="/prenotazione?id_camera="+value.id_camera+"&?data_inizio="+data_inizio+"&?data_fine="+data_fine+"&?numero_posti_letto="+value.numero_posti_letto;


                                    return(

                                        <tr key={value.id_camera}>
                                            <td scope="row" style={{textAlign:"center"}}><b>{value.nome_camera}</b></td>
                                            <td>
                                                <p style={{textAlign:"center"}}>{value.numero_posti_letto}</p>
                                            </td>
                                            <td>
                                                {value.colazione_inclusa===0 &&
                                                <div style={{textAlign:"center"}}>No</div>
                                                }

                                                {value.colazione_inclusa===1 &&
                                                <div style={{textAlign:"center"}}>Si</div>
                                                }



                                            </td>
                                            <td style={{textAlign:"center"}}>{value.costo_camera} &euro;</td>
                                            <td style={{textAlign:"center"}}>

                                                <Button href={stringa} name="ok" id="ok" type="submit" style={{color: "#ff6300"}}>Prenota!</Button>

                                            </td>

                                        </tr>
                                    );

                                })

                                }
                                </tbody>
                            </table>

                        </div>


                    </div>
                    <div className="row">
                        <div className="col">
                            <br/>
                            <h3 className="text-center">Recensioni</h3>
                        </div>
                    </div>

                        {recensioni.map(value =>
                            <div className="row">
                                <ListGroup variant="flush">

                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-lg-4"><h6>{value.nome}_{value.id_utente} : </h6></div>
                                        <div className="col-lg-8">{value.recensione}</div>

                                    </div>
                                </ListGroup.Item>
                        </ListGroup>
                            </div>


                        )}
                </div>
            </div>
            <BoxConfermaPreferiti
                open={openConfermaPreferiti}
                onClose={handleCloseConfermaPreferiti}
                responseType={tipoPreferiti}
            />
        </div>
    );


};
export default EsploraStruttura;