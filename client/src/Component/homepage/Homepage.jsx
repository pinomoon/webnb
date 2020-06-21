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

class Homepage extends Component{
    render(){
        return(

         <container >
             <Header/>
             <section className="cover" style={{height:"500px"}}>
                 <div className="cover_filter"></div>
                 <div className="cover_caption">
                     <div className="cover_caption_copy">
                         <h1>Benvenuti in </h1>
                         <h2>WeB&B</h2>
                         <br></br>
                         <div>


                             <div className="form-row"style={{width:"600px",marginLeft:"430px"}} >
                                 <div className="form-group col" >
                                     <input type="text" className="form-control" id="Citta" placeholder="Dove vuoi andare?"/>

                                 </div>
                                 <div className="form-group col" >
                                     <input className="form-control" type="date" id="start" name="trip-start"
                                            value="2018-07-22"
                                            min="2018-01-01" max="2018-12-31" />
                                 </div>
                                 <div className="form-group col">
                                     <Form.Group controlId="exampleForm.ControlSelect1" style={{width:"200px"}}>

                                         <Form.Control as="select">
                                             <option>Ospiti</option>
                                             <option>1</option>
                                             <option>2</option>
                                             <option>3</option>
                                             <option>4</option>
                                             <option>5</option>
                                         </Form.Control>
                                     </Form.Group>
                                 </div>
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
             <Footer/>
         </container>

        );

    }
}

export default Homepage;