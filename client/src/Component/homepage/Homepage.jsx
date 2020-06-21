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