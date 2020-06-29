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

class Homepage extends Component{
    render(){
        return(

         <container >

             <section className="cover" style={{height:"500px",width:"100%"}}>

                 <div className="cover_filter"></div>
                 <div className="cover_caption">
                     <div className="cover_caption_copy">
                         <h1>Benvenuti in </h1>
                         <h2>WeB&B</h2>
                         <h3 style={{color:"#ff6300"}}> Prenota la tua vacanza!</h3>
                         <br></br>

                         <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{color:"#6495ED",border:"2px solid #ff6300",width:"55%",margin:"auto"}}>

                             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                             <Navbar.Collapse id="responsive-navbar-nav">
                                 <Nav className="mr-auto">
                                     <Nav.Link>
                                         <div className="form-row" >

                                             <div className="form-group col" >
                                                 <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",marginTop:"9px"}}/>
                                             </div>
                                         </div>
                                     </Nav.Link>

                                     <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>
                                         <div className="form-row" >
                                             <div className="form-group col" >



                                                 <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                                                        type="date"
                                                        name="date"
                                                        id="exampleDate"
                                                        placeholder="date placeholder"
                                                 />
                                             </div>
                                         </div>
                                     </Nav.Link>

                                         <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>
                                             <div className="form-row" >
                                                 <div className="form-group col" >



                                                     <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                                                            type="date"
                                                            name="date"
                                                            id="exampleDate"
                                                            placeholder="date placeholder"
                                                     />
                                                 </div>
                                             </div>
                                         </Nav.Link>

                                     <Nav.Link style={{color:"#ff6300",width:"160px",marginTop:"5px"}}>
                                         <div className="form-row" >
                                             <div className="form-group col" >
                                                 <select className="form-control" id="exampleSelect1">
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
                                         </div>
                                     </Nav.Link>
                                     <Nav.Link>

                                         <div>
                                             <Button style={{backgroundColor:"#ff6300",marginTop:"5px",color:"white"}}>Conferma</Button>

                                         </div>




                                     </Nav.Link>


                                 </Nav>

                             </Navbar.Collapse>
                         </Navbar>


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
}

export default Homepage;