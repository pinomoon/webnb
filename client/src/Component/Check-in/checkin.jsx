import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Header from "../header/HeaderHost";
import Footer from "../footer/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "@material-ui/core/Button";

class checkin extends Component{

    render(){
        return(
            <div>
                <Header/>

                <div style={{marginLeft:"550px", width:"30%",marginTop:"30px"}}>
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
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Bagagli</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Note</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Form>
                    <Form.Group>
                        <Form.Label>N.Documento</Form.Label>
                        <Form.Control type="documento" />
                        <Form.File id="exampleFormControlFile1" label=""/>
                    </Form.Group>
                </Form>
            </Form>


                </div>
                <Button color="inherit" href="/host"style={{color:"#6495ED",marginLeft:"540px"}}>Indietro</Button>
                <Button color="inherit" href="/checkin/success"style={{color:"#6495ED",marginLeft:"330px"}}>Invia</Button>
                <Footer/>

            </div>


        );
    }
}
export default checkin;