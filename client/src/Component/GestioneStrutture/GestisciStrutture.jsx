import React, {Component} from 'react';
import HeaderHost from "../header/HeaderHost";
import Footer from "../footer/Footer";
import villa from "./villa.jpg"
import Button from "@material-ui/core/Button";
import {getSessionCookie} from "../../sessions";
import axios from 'axios';


const id_utente=getSessionCookie().id;

class GestisciStrutture extends Component{
    state={
        strutture:[]
    };

    componentDidMount() {
        axios.post("https://localhost:9000/gestisciStrutture",{id_utente})
            .then((response)=>{
                console.log(response.data);
                const strutture= response.data[1];
                this.setState({strutture});
            })
            .catch((error)=>{
                alert(error);
            })

    }

    render(){
        return(

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 style={{textAlign:"center"}}>Le mie strutture</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                        <div className="row">
                            {this.state.strutture.map(value =>
                                <div className="col-sm-6 col-md-4 col-lg-3">
                                    <section className="cards clearfix">
                                        <div className="card" style={{width:"auto",height:"20%"}}>
                                            <img className="card_image" src={villa}  alt=" Villa "/>
                                            <div className="card_copy">
                                                <h6 style={{textAlign:"center"}}>{value.nome_struttura}</h6>
                                                <p>{value.descrizione} </p>
                                                <div style={{margin:"auto"}}>
                                                    <Button  style={{color:"#ff6300"}}>Modifica</Button>
                                                    <Button  style={{color:"#ff6300"}}>Elimina</Button>
                                                </div>
                                            </div>

                                        </div>


                                    </section>
                                </div>
                            )}

                            <div className="col-3"></div>

                        </div>


                    </div>
                    <div className="col-1">

                    </div>
                </div>

            </div>


        );
    }

}

export default GestisciStrutture