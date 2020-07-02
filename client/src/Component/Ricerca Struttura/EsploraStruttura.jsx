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



class EsploraStruttura extends Component{
    render(){
        return (

            <div className="container">
                <div className="row">

                    <div className="col-sm-5 col-md-4 col-lg-3">
                    <Ricerca/>
                    </div>











                    <div className="col-md-7 col-lg-9" style={{backgroundColor:"white",width:"100%",height:"auto",marginTop:"30px"}}>
                        <div className="row">
                            <div className="col-sm-7 col-lg-7">
                            </div>
                            <div className="col-sm-1 col-lg-1">

                            </div>
                            <div className="col-sm-4 col-lg-4">
                                <Button color="inherit" href="/prenotazione" style={{textAlign:"center",width:"100%",marginLeft:"auto",backgroundColor:"#32508f",color:"white",display:"block"}}>Aggiungi ai preferiti</Button>
                                <br/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img src={simpson} style={{width:"100%"}}/>
                                <br/>

                            </div>
                        </div>
                        <div className="row">
                            <br/>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <img src={cucina} style={{width:"100%",height:"90%"}}/>


                            </div>
                            <div className="col-6">

                                <img src={giardino} style={{width:"100%",height:"90%"}}/>

                            </div>
                        </div>


                        <div className="row">
                            <div className="col-6">
                                <div style={{backgroundColor:"white", borderRight:"2px solid #ff6300",height:"100%"}}>
                                    <h5>Descrizione struttura</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum a sapien id eleifend.
                                        Suspendisse porttitor hendrerit vestibulum. Vivamus fringilla ante orci, in rutrum felis feugiat at.
                                        Pellentesque mi arcu, molestie lobortis ullamcorper in, auctor pulvinar sem. Aenean ac erat sit amet metus vestibulum accumsan nec eu nisi.
                                        Mauris massa ante, feugiat ut dictum sit amet, dictum in nulla. Suspendisse lobortis venenatis ornare. Cras sit amet laoreet massa, vel volutpat nulla. Donec imperdiet arcu non hendrerit imperdiet.
                                        Sed ut ullamcorper turpis. Cras tristique elementum augue, sit amet ullamcorper nisl pharetra eu.</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{margin:"auto",border:"3px solid #ff6300",height:"auto",width:"70%",backgroundColor:"white smoke"}}>
                                    <h5 style={{textAlign:"center"}}>Servizi</h5>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <p>Wifi</p>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <p>Colazione in camera</p>
                                        </ListGroup.Item>


                                        <ListGroup.Item>
                                            <p>Palestra</p>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div style={{width:"100%",height:"auto",borderTop:"2px solid #ff6300",borderBottom:"2px solid #ff6300",backgroundColor:"white",margin:"auto"}}>
                                    <br/>
                                    <h5 style={{textAlign:"center"}}>Punti di interesse</h5>
                                    <p>
                                        Aenean dapibus accumsan pellentesque. Ut scelerisque, ante suscipit varius eleifend, erat lacus consectetur magna,
                                        vel euismod erat lectus nec massa. Etiam non accumsan diam. Vivamus tincidunt tellus tristique justo vehicula,
                                        ut imperdiet metus rutrum. Etiam et orci nec ante consectetur feugiat ac sit amet dolor. Aliquam erat volutpat.
                                        Cras feugiat, nunc at pellentesque commodo, purus risus pellentesque massa, quis tincidunt dolor nunc sed ante.
                                        Donec vel nulla placerat, fermentum eros ac, efficitur felis. Mauris consequat sem ex, sit amet sollicitudin justo placerat quis.
                                        Aenean non elit vel lacus cursus ornare. Duis et dui urna.
                                    </p>
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
                        <div className="row" style={{borderBottom:"2px solid #ff6300"}}>
                            <div className="col">
                                <table className="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th scope="col">Nome Camera</th>
                                        <th scope="col">N.Persone</th>
                                        <th scope="col">Colazione Inclusa</th>
                                        <th scope="col">Prezzo</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">Camera Luigi</th>
                                        <td>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>

                                        </td>
                                        <td>Si</td>

                                        <td>70,00$</td>
                                        <td><Button name="ok" id="ok" type="submit" style={{marginLeft:"-10px",color:"#ff6300"}}>Prenota!</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Camera Mario</th>
                                        <td>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>
                                            <img className="img-fluid" src={icon} style={{width:"10%",height:"auto",margin:"auto"}}/>

                                        </td>
                                        <td>No</td>
                                        <td>60,00$</td>

                                            <td> <Button name="ok" id="ok" type="submit" style={{marginLeft:"-10px",color:"#ff6300"}}>Prenota!</Button>

                                            </td>
                                    </tr>

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
                                <ListGroup.Item>
                                <div className="row">
                                    <div className="col-3"><h5></h5></div>
                                    <div className="col-9"> <h5> </h5></div>

                                </div>
                            </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-3"><h5>Saro</h5></div>
                                        <div className="col-9"> <p> Aenean dapibus accumsan pellentesque. Ut scelerisque, ante suscipit varius eleifend, erat lacus consectetur magna,
                                            vel euismod erat lectus nec massa. Etiam non accumsan diam. Vivamus tincidunt tellus tristique justo vehicula,
                                            ut imperdiet metus rutrum. Etiam et orci nec ante consectetur feugiat ac sit amet dolor. Aliquam erat volutpat.
                                            Cras feugiat, nunc at pellentesque commodo, purus risus pellentesque massa, quis tincidunt dolor nunc sed ante.
                                            Donec vel nulla placerat, fermentum eros ac, efficitur felis. Mauris consequat sem ex, sit amet sollicitudin justo placerat quis.
                                            Aenean non elit vel lacus cursus ornare. Duis et dui urna.</p></div>

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-3"><h5>Ezio</h5></div>
                                        <div className="col-9"> <p> Aenean dapibus accumsan pellentesque. Ut scelerisque, ante suscipit varius eleifend, erat lacus consectetur magna,
                                            vel euismod erat lectus nec massa. Etiam non accumsan diam. Vivamus tincidunt tellus tristique justo vehicula,
                                            ut imperdiet metus rutrum. Etiam et orci nec ante consectetur feugiat ac sit amet dolor. Aliquam erat volutpat.
                                            Cras feugiat, nunc at pellentesque commodo, purus risus pellentesque massa, quis tincidunt dolor nunc sed ante.
                                            Donec vel nulla placerat, fermentum eros ac, efficitur felis. Mauris consequat sem ex, sit amet sollicitudin justo placerat quis.
                                            Aenean non elit vel lacus cursus ornare. Duis et dui urna.</p></div>

                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                </div>
            </div>
            </div>
        );

    }
}
export default EsploraStruttura;