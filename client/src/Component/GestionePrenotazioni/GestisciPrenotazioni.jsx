import React, {Component} from 'react';
import Footer from "../footer/Footer";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@material-ui/core/Button";
import HeaderHost from "../header/HeaderHost";



class GestisciPrenotazioni extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-10">
                <div style={{margin:"auto",width:"100%"}}>
                    <h3>Lista prenotazioni</h3>
                    <br/>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"><h5>Id Prenotazione</h5></div>
                            <div className="col-6"> <h5> Stato</h5></div>
                            <div className="col-2"></div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"> Prenotazione #0001</div>
                            <div className="col-6"> <a style={{color:"#00ff55"}}>Confermato</a></div>
                            <div className="col-2"><Button color="inherit" href="/checkin" style={{color:"#ff6300"}}>Check-in</Button></div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"> Prenotazione #0002</div>
                            <div className="col-6"> In attesa di conferma</div>
                            <div className="col-2">
                                <Button color="inherit" href="/" style={{color:"#ff6300"}}>Accetta</Button>
                                <br/>
                                <Button color="inherit" href="/" style={{color:"#ff6300"}}>Rifiuta</Button>

                            </div>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"> Prenotazione #0003</div>
                            <div className="col-6"> <a style={{color:"red"}}>Rifiutato</a></div>
                            <div className="col-2"> </div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"> Prenotazione #0003</div>
                            <div className="col-6"> <a style={{color:"red"}}>Annullato</a></div>
                            <div className="col-2"> </div>

                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-4"> Prenotazione #0005</div>
                            <div className="col-6"> <a style={{color:"blue"}}>Soggiorno concluso</a></div>
                            <div className="col-2"> </div>

                        </div>
                    </ListGroup.Item>







                </ListGroup>
                </div>
                    </div>


                    <div className="col">

                    </div>
                </div>

            </div>


        );
    }
}
export default GestisciPrenotazioni;