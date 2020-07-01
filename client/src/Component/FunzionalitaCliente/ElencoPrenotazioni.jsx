import React, {Component} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "@material-ui/core/Button";



class ElencoPrenotazioni extends Component{

    render(){
        return(

            <div className="container">
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                        <div style={{margin:"auto",width:"100%"}}>
                            <h3>Lista prenotazioni</h3>
                            <br/>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"><h5>Id:</h5></div>
                                        <div className="col-5"> <h5> Stato:</h5></div>
                                        <div className="col-3"></div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"> Prenotazione #0001</div>
                                        <div className="col-5"> <a style={{color:"#00ff55"}}>Confermato</a></div>
                                        <div className="col-3"><Button color="inherit" href="/checkin" style={{color:"#ff6300"}}>Annulla</Button></div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"> Prenotazione #0002</div>
                                        <div className="col-5"><a>In attesa di conferma</a></div>
                                        <div className="col-3">
                                            <Button color="inherit" href="/checkin" style={{color:"#ff6300"}}>Annulla</Button>
                                        </div>

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"> Prenotazione #0003</div>
                                        <div className="col-5"> <a style={{color:"red"}}>Rifiutata</a></div>
                                        <div className="col-3"> </div>

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"> Prenotazione #0003</div>
                                        <div className="col-5"> <a style={{color:"red"}}>Annullata</a></div>
                                        <div className="col-3"> </div>

                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="row">
                                        <div className="col-4"> Prenotazione #0005</div>
                                        <div className="col-5"> <a style={{color:"blue"}}>Soggiorno concluso</a></div>
                                        <div className="col-3">
                                            <Button color="inherit" href="/recensisci" style={{color:"#ff6300"}}>Recensisci</Button>

                                        </div>

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
export default ElencoPrenotazioni;