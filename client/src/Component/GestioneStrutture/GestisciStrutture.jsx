import React, {Component} from 'react';
import HeaderHost from "../header/HeaderHost";
import Footer from "../footer/Footer";
import villa from "./villa.jpg"
import Button from "@material-ui/core/Button";





class GestisciStrutture extends Component{
    render(){
        return(
            <div>
            <HeaderHost/>
            <section className="cards clearfix">
                <div className="card">
                    <img className="card_image" src={villa}  alt=" Villa "/>
                    <div className="card_copy">
                        <h4>Villa Maestro</h4>
                        <p>Nel cuore di San Giuseppe Jato, famosa villa del Boss Luna </p>
                    </div>
                    <div style={{marginLeft:"190px"}}>
                        <Button  style={{color:"#6495ED"}}>Modifica</Button>

                        <Button  style={{color:"#6495ED"}}>Elimina</Button>
                    </div>
                </div>


            </section>
                <Footer/>
            </div>


        );
    }

}

export default GestisciStrutture