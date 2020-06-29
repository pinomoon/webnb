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
                         <div style={{height:"60px",width:"60%",margin:"auto",border:"2px solid #ff6300",borderRadius:"5px",backgroundColor:"white"}}>



                         <div className="form-row" >

                                 <div className="form-group col" >
                                     <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",marginTop:"9px"}}/>

                                 </div>

                                 <div className="form-group col" >



                                     <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                     />
                                 </div>

                                 <div className="form-group col" >

                                     <Input style={{width:"150px",backgroundColor:"white",marginTop:"9px"}}
                                            type="date"
                                            name="date"
                                            id="exampleDate"
                                            placeholder="date placeholder"
                                     />
                                 </div>





                                 <div className="form-group col">
                                     <Form.Group controlId="exampleForm.ControlSelect1" style={{width:"150px"}}>
                                         <Input type="select" name="select" id="exampleSelect" placeholder="Ospiti" style={{backgroundColor:"white",marginTop:"9px"}}>
                                             <option>Ospiti</option>
                                             <option>1</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                         </Input>

                                     </Form.Group>

                                 </div>


                                 <Button color="inherit" href="/"style={{fontSize:"12px",color:"white",height:"57px",backgroundColor:"#ff6300"}}>Conferma</Button>

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

export default Homepage;