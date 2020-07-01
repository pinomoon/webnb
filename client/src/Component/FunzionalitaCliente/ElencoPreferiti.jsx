import React, {Component} from 'react';
import villa from "../GestioneStrutture/villa.jpg";
import Button from "@material-ui/core/Button";



class ElencoPreferiti extends Component{
    render(){
        return(

            <div className="container">
                <div className="row">
                    <div className="col-1">

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-10">
                        <div className="row">
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <section className="cards clearfix">
                                    <div className="card" style={{width:"auto",height:"20%"}}>
                                        <img className="card_image" src={villa}  alt=" Villa "/>
                                        <div className="card_copy">
                                            <h4>Villa Maestro</h4>
                                            <p>Nel cuore di San Giuseppe Jato, famosa villa del Boss Luna </p>
                                            <div style={{margin:"auto"}}>
                                                <Button  style={{color:"#ff6300"}}>Modifica</Button>

                                                <Button  style={{color:"#ff6300"}}>Elimina</Button>
                                            </div>
                                        </div>

                                    </div>


                                </section>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <section className="cards clearfix">
                                    <div className="card" style={{width:"auto",height:"20%"}}>
                                        <img className="card_image" src={villa}  alt=" Villa "/>
                                        <div className="card_copy">
                                            <h4>Villa Maestro</h4>
                                            <p>Nel cuore di San Giuseppe Jato, famosa villa del Boss Luna </p>
                                            <div style={{margin:"auto"}}>
                                                <Button  style={{color:"#ff6300"}}>Modifica</Button>

                                                <Button  style={{color:"#ff6300"}}>Elimina</Button>
                                            </div>
                                        </div>

                                    </div>


                                </section>
                            </div>
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

export default ElencoPreferiti;