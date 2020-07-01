import React, {Component} from 'react';
import Input from "@material-ui/core/Input/Input";

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import simpson from "./casa-simpson-690x362.jpg"
import axios from "axios";
import Ricerca from "./Ricerca";



const RicercaStruttura=(props)=> {



        return(

            <div className="container">
                <div className="row">

                    <div className="col-sm-5 col-md-4 col-lg-3">
                    <Ricerca/>



                    </div>







                <div className="col-md-7 col-lg-8" style={{backgroundColor:"white",width:"100%",height:"auto",marginTop:"30px"}}>

                        <div className="card mb-3" style={{width:"100%",height:"auto"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={simpson} className="card-img" style={{height:"100%"}}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Casa di homer</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit
                                            longer.</p>
                                        <Button color="inherit" href="/prenotazione" style={{width:"40%",marginLeft:"auto",backgroundColor:"#32508f",color:"white",display:"block"}}>Esplora</Button>

                                    </div>
                                </div>
                            </div>
                        </div>





                </div>

                    <div className="col-1">

                    </div>
                </div>







        </div>


        );

};
export default RicercaStruttura;