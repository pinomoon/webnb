import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";


class Recensione extends Component{

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-6">


                        <div style={{margin:"auto", width:"100%",marginTop:"30px"}}>
                            <Form>
                                <Form>
                                    <Form.Label>Dati</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="Nome" />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="Cognome" />
                                        </Col>
                                    </Row>
                                </Form>
                                <br></br>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>La tua opinione...</Form.Label>
                                    <Form.Control as="textarea" rows="5" />
                                </Form.Group>

                            </Form>


                        </div>
                        <div className="row">
                            <div className="col-2">
                                <Button color="inherit" href="/lemieprenotazioni"style={{color:"#ff6300",marginLeft:"auto",display:"block"}}>Indietro</Button>
                            </div>
                            <div className="col-8">
                            </div>
                            <div className="col-2">
                                <Button color="inherit" href="/checkin/success"style={{color:"#ff6300",marginRight:"auto",display:"block"}}>Invia</Button>
                            </div>
                        </div>

                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>


        );
    }
}
export default Recensione;