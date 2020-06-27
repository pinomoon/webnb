import React, {Component} from 'react';
import HeaderHost from "../header/HeaderHost";
import Footer from "../footer/Footer";
import "./Homepage.css"
import Header from "../header/Header";
import Form from "react-bootstrap/Form";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button";
import simpson from "./casa-simpson-690x362.jpg";
import flinstones from "./casa-flin.jpg";
import villa from "../GestioneStrutture/villa.jpg";

class HomepageHost extends Component{
    render(){
        return(

            <container >

                <section className="cover" style={{height:"500px"}}>
                    <div className="cover_filter"></div>
                    <div className="cover_caption">
                        <div className="cover_caption_copy">
                            <h1>Benvenuti in </h1>
                            <h2>WeB&B</h2>
                            <br></br>
                            <div>


                                <div className="form-row"style={{height:"45px",width:"780px",marginLeft:"350px",border:"1px solid #ff6300",backgroundColor:"white"}} >

                                    <div className="form-group col" >
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",color:"#FC5902"}} />

                                    </div>

                                    <div className="form-group col" >



                                        <Input style={{width:"150px",backgroundColor:"white"}}
                                               type="date"
                                               name="date"
                                               id="exampleDate"
                                               placeholder="date placeholder"
                                        />
                                    </div>

                                    <div className="form-group col" >

                                        <Input style={{width:"150px",backgroundColor:"white"}}
                                               type="date"
                                               name="date"
                                               id="exampleDate"
                                               placeholder="date placeholder"
                                        />
                                    </div>





                                    <div className="form-group col">
                                        <Form.Group controlId="exampleForm.ControlSelect1" style={{width:"150px"}}>
                                            <Input type="select" name="select" id="exampleSelect" placeholder="Ospiti" style={{backgroundColor:"white"}}>
                                                <option>Ospiti</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>

                                        </Form.Group>

                                    </div>
                                    <Button color="inherit" href="/login"style={{fontSize:"12px",marginTop:"10px",height:"20px",color:"#ff6300",backgroundColor:"white"}}>Conferma</Button>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="cards clearfix">
                    <div className="card">
                        <img className="card_image" src={simpson}  alt=" Villa "/>
                        <div className="card_copy">
                            <h4>Casa di Homer</h4>
                            <p>La foto parla da se' </p>
                        </div>

                    </div>
                    <div className="card">
                        <img className="card_image" src={flinstones}  alt=" Villa "/>
                        <div className="card_copy">
                            <h4>Casale dei Flinstones</h4>
                            <p>Reggia per gli amanti della semplicita' </p>
                        </div>

                    </div>
                    <div className="card">
                        <img className="card_image" src={villa}  alt=" Villa "/>
                        <div className="card_copy">
                            <h4>Villa Maestro</h4>
                            <p>Nel cuore di San Giuseppe Jato, famosa villa del Boss Luna </p>
                        </div>

                    </div>



                </section>

            </container>

        );

    }
}

export default HomepageHost;