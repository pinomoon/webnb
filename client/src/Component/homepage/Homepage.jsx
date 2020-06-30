import React, {Component} from 'react';
import sfondo from '../images/best-hd-wallpapers-pc-background-laptop.jpg'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Homepage.css"

import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button";
import villa from "../GestioneStrutture/villa.jpg";
import simpson from "./casa-simpson-690x362.jpg";
import flinstones from "./casa-flin.jpg"
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import FormGroup from "@material-ui/core/FormGroup";
import {Label} from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../header_trasparente.png";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Logout from "../logout/logout";
import NavDropdown from "react-bootstrap/NavDropdown";
import {UserContext} from "../../UserContext";

const Homepage =()=>{

        const user=React.useContext(UserContext);
        const handleChange = date => {
            this.setState({
                startDate: date
            });
        };

        return(


         <container>

             <section className="cover" style={{height:"500px",width:"100%"}}>

                 <div className="cover_filter"></div>
                 <div className="cover_caption">
                     <div className="cover_caption_copy">
                         <h1>Benvenuti in </h1>
                         <h2>WeB&B</h2>

                         {(user.id==null || (user.tipo=1)) &&
                         <div>
                         <h3 style={{color:"#ff6300"}}> Prenota la tua vacanza!</h3>
                         <br></br>
                        <div className="row">
                            <div className="col-md-1 col-lg-1">
                            </div>
                            <div className="col-sm-12 col-md-9 col-lg-9">

                            <div style={{width:"80%",height:"auto",backgroundColor:"white",margin:"auto",border:"2px solid #ff6300"}}>

                                <div className="row">
                                             <div className="form-group  col-sm-12 col-md-3 col-lg-3" >
                                                 <Input type="" name="" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",marginTop:"9px"}}/>
                                             </div>



                                             <div className="form-group col-sm-6 col-md-3 col-lg-3" >

                                                 <Input style={{backgroundColor:"white",marginTop:"9px"}}
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="date placeholder"
                                                 />

                                         </div>



                                                 <div className="form-group col-sm-6 col-md-3 col-lg-3" >



                                                     <Input style={{backgroundColor:"white",marginTop:"9px"}}
                                                            type="date"
                                                            name="date"
                                                            id="exampleDate"
                                                            placeholder="date placeholder"
                                                     />

                                             </div>


                                             <div className="form-group col-md-2 col-lg-2" >
                                                 <select className="form-control" id="exampleSelect1" style={{marginTop:"7px"}}>
                                                     <option>N. Ospiti</option>
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


                                         <div className="col-md-1 col-lg-1">
                                             <Button href="/ricercastruttura" style={{marginTop:"-2px",backgroundColor:"#ff6300",height:"106%",color:"white",borderRadius:0}}>Conferma</Button>
                                         </div>





                                            </div>
                            </div>
                                <div className="col-lg-1">
                                </div>
                            </div>
                            </div>

                        </div>


                             }
                         {user.tipo==0 &&
                             <div>
                                 <div className="row">
                                     <div className="col-md-1 col-lg-4">
                                     </div>
                                     <div className="col-sm-12 col-md-9 col-lg-4">
                                         <Button href="/inseriscistruttura" style={{marginTop:"-2px",backgroundColor:"#ff6300",height:"auto%",width:"30%",color:"white",borderRadius:0}}>Conferma</Button>

                                     </div>
                                     <div className="col-md-1 col-lg-4">
                                     </div>
                                 </div>
                             </div>


                         }
                     </div>
                 </div>





             </section>


            <br/>
            <br/>



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

export default Homepage;