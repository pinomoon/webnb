import React, {Component} from 'react';
import Input from "@material-ui/core/Input/Input";
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import Button from "@material-ui/core/Button";
import simpson from "./casa-simpson-690x362.jpg"
import cucina from "./cucina.jpg";
import giardino from "./1.png"
import ListGroup from "react-bootstrap/ListGroup";
import icon from "./User-01.jpg";
import Ricerca from"./Ricerca";
import axios from "axios";
import WifiRoundedIcon from '@material-ui/icons/WifiRounded';
import PoolRoundedIcon from '@material-ui/icons/PoolRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';
import LocalParkingRoundedIcon from '@material-ui/icons/LocalParkingRounded';

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
let {props}=[];


class EsploraStruttura extends Component{
    state = {
        struttura: [],
        camere:[],
        recensioni: []
    };
    componentDidMount() {
        axios.post("https://localhost:9000/prenotazione/esploraStruttura",{id_struttura,data_inizio,data_fine,npl})
            .then((response)=>{
                console.log((response.data[1]));
               const struttura=response.data[1];
               const camere=response.data[2];
               const recensioni=response.data[3];
                this.setState({ struttura,camere,recensioni });
                console.log(this.state.struttura);
            })
            .catch((error)=>{
                alert(error);
            });
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-10"
                         style={{backgroundColor: "white", width: "100%", height: "auto", marginTop: "30px"}}>
                        <div className="row">
                            <div className="col-sm-7 col-lg-7">
                                {this.state.struttura.map(value=>
                                    <h4 >{value.nome_struttura}</h4>
                                )}

                            </div>
                            <div className="col-sm-1 col-lg-1">
                            </div>
                            <div className="col-sm-4 col-lg-4">
                                <Button color="inherit" href="/prenotazione" style={{
                                    textAlign: "center",
                                    width: "100%",
                                    marginLeft: "auto",
                                    backgroundColor: "#32508f",
                                    color: "white",
                                    display: "block"
                                }}>Aggiungi ai preferiti</Button>
                                <br/>
                            </div>
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
                                    {this.state.struttura.map(value=>
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
                                        {this.state.struttura.map(value=>
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
                                    {this.state.struttura.map(value =>
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
                                    {this.state.camere.map((value)=>{
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
                                            <td><Button name="ok" id="ok" type="submit" style={{color:"#ff6300"}}>Prenota!</Button>
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
                        <div className="row">
                            <ListGroup variant="flush">
                                {this.state.recensioni.map(value =>
                                    <ListGroup.Item>
                                        <div className="row">
                                            <div className="col-5"><h5>{value.nome}_{value.id_utente} : </h5></div>
                                            <div className="col-7"><p>{value.recensione}</p></div>

                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
};
export default EsploraStruttura;