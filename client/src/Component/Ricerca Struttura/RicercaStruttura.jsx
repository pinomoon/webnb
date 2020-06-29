import React, {Component} from 'react';
import Footer from "../footer/Footer";
import Input from "@material-ui/core/Input/Input";
import Button1 from "@material-ui/core/Button";

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import ListGroup from "react-bootstrap/ListGroup";
import simpson from "./casa-simpson-690x362.jpg"



class RicercaStruttura extends Component{
    render(){
        return(

        <div className="container">
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-10">
        <div style={{width:"auto",height:"100%",marginTop:"30px"}}>
            <div className="row">
            <div className="col-2" style={{backgroundColor:"orange",marginLeft:"150px",height:"auto"}}>

                <h5 style={{color:"#32508f"}}>Cerca:</h5>

                <div className="form-group col" style={{marginLeft:"10px" }}>
                    <h10>Destinazione:</h10>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"180px"}}/>

                </div>

                <div className="form-group col" style={{marginLeft:"10px" }}>
                    <h10>Check-in:</h10>

                    <Input style={{width:"180px",backgroundColor:"white"}}
                         type="date"
                         name="date"
                         id="exampleDate"
                         placeholder="date placeholder"
                />
                </div>
                <div className="form-group col" style={{marginLeft:"10px" }}>
                    <h10>Check-out:</h10>

                    <Input style={{width:"180px",backgroundColor:"white"}}
                       type="date"
                       name="date"
                       id="exampleDate"
                       placeholder="date placeholder"
                />
                </div>
                <div className="form-group col" style={{marginLeft:"10px" }}>

                    <h10>Numero Persone:</h10>


                    <select className="form-control" id="exampleSelect1">
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

                <div className="form-group col" style={{marginLeft:"10px" }}>

                    <h10>Notti:</h10>


                    <select className="form-control" id="exampleSelect1">
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

                    <Button color="inherit" href="/login" id="toggler"style={{backgroundColor:"#32508f",color:"white"}}>Filtri Avanzati</Button>

                    <UncontrolledCollapse toggler="#toggler">
                    <br/>
                                <div className="form-group col">
                                    <h10>Destinazione:</h10>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"180px"}}/>

                                </div>

                        <div className="form-group col">
                            <h10>Destinazione:</h10>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"180px"}}/>

                        </div>

                        <div className="form-group col">
                            <h10>Destinazione:</h10>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"180px"}}/>

                        </div>

                        <div className="form-check form-check-inline" style={{marginLeft:"15px"}}>
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
                        </div>


                    </UncontrolledCollapse>
                </div>

            </div>

               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




                <div className="col-8">

                        <div className="card mb-3" style={{width:"100%"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={simpson} className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <Button color="inherit" href="/prenotazione" style={{marginLeft:"450px",backgroundColor:"#32508f",color:"white"}}>Prenota</Button>

                                    </div>
                                </div>
                            </div>
                        </div>



                    <div className="card mb-3" style={{width:"100%"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={{simpson}} className="card-img" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins
                                        ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3" style={{width:"100%"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={{simpson}} className="card-img" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins
                                        ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>



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
export default RicercaStruttura;