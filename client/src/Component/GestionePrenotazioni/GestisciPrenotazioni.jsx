import React, {Component} from 'react';
import Footer from "../footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@material-ui/core/Button";
import HeaderHost from "../header/HeaderHost";



class GestisciPrenotazioni extends Component{
    render(){
        return(

            <div>

                <br/>
                <div style={{marginLeft:"150px",width:"80%"}}>
                    <h3>Lista prenotazioni</h3>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0001</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#00ff55"}}>Confermato </a></a></div>
                            <div className="col-5"><Button color="inherit" href="/checkin" style={{color:"#ff6300",marginLeft:"300px"}}>Check-in</Button></div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0002</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: In attesa di conferma</a></div>
                            <div className="col-5">
                                <Button color="inherit" href="/" style={{color:"#ff6300",marginLeft:"270px"}}>Accetta</Button>
                                <Button color="inherit" href="/" style={{color:"#ff6300"}}>Rifiuta</Button>

                            </div>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0003</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"red"}}>Rifiutato </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0004</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"red"}}>Annullato</a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0005</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0006</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0007</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0008</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0009</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-2"> Prenotazione #0010</div>
                            <div className="col-5"> <a style={{marginLeft:"220px"}}> Stato: <a style={{color:"#0066ff"}}>Soggiorno concluso </a></a></div>

                        </div>
                    </ListGroup.Item>

                </ListGroup>
                </div>


                <Footer/>







            </div>


        );
    }
}
export default GestisciPrenotazioni;