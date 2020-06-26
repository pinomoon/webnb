import React, {Component} from 'react';
import HeaderHost from "../header/HeaderHost";
import Footer from "../footer/Footer";
import "./Homepage.css"
import Header from "../header/Header";
import Form from "react-bootstrap/Form";

class HomepageHost extends Component{
    render(){
        return(

            <container >


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
                        <img className="card_image" src="https://source.unsplash.com/400x260/?animals " alt=" Nature"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.?</p>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card_image" src="https://source.unsplash.com/400x260/?travel" alt="Random"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.?</p>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card_image" src="https://source.unsplash.com/400x260/?water" alt=" Random"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.? </p>
                        </div>
                    </div>
                </section>

            </container>

        );

    }
}

export default HomepageHost;