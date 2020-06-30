import React, {Component} from 'react';
import Input from "@material-ui/core/Input/Input";
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";
import Button from "@material-ui/core/Button";
import simpson from "./casa-simpson-690x362.jpg"
import cucina from "./cucina.jpg";
import giardino from "./1.png"
import ListGroup from "react-bootstrap/ListGroup";


class EsploraStruttura extends Component{
    render(){
        return (

            <div className="container">
                <div className="row">

                    <div className="col-sm-5 col-md-4 col-lg-3">
                        <div style={{backgroundColor:"#f9db3e",width:"100%",height:"auto",marginTop:"30px"}}>
                            <Button color="inherit" href="/login" style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Cerca</Button>

                            <div className="form-group col" style={{margin:"auto" }}>
                                <h10>Destinazione:</h10>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                            </div>

                            <div className="form-group col" style={{margin:"auto" }}>
                                <h10>Check-in:</h10>

                                <Input style={{width:"100%",backgroundColor:"white",margin:"auto"}}
                                       type="date"
                                       name="date"
                                       id="exampleDate"
                                       placeholder="date placeholder"
                                />
                            </div>
                            <div className="form-group col" style={{margin:"auto"}}>
                                <h10>Check-out:</h10>

                                <Input style={{width:"100%",backgroundColor:"white",margin:"auto"}}
                                       type="date"
                                       name="date"
                                       id="exampleDate"
                                       placeholder="date placeholder"
                                />
                            </div>
                            <div className="form-group col" style={{margin:"auto" }}>

                                <h10>Numero Persone:</h10>


                                <select className="form-control" id="exampleSelect1">
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

                            <div className="form-group col" style={{margin:"auto" }}>

                                <h10>Notti:</h10>


                                <select className="form-control" id="exampleSelect1">
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

                            <div>
                                <br/>
                                <Button color="inherit" href="/login" id="toggler"style={{backgroundColor:"#32508f",color:"white",margin:"auto",display:"block"}}>Filtri Avanzati</Button>

                                <UncontrolledCollapse toggler="#toggler">
                                    <br/>
                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-group col" style={{margin:"auto" }}>
                                        <h10>Destinazione:</h10>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Dove vuoi andare?" style={{backgroundColor:"white",width:"100%"}}/>

                                    </div>

                                    <div className="form-check form-check-inline" style={{marginLeft:"15px"}}>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
                                    </div>


                                </UncontrolledCollapse>
                            </div>

                        </div>

                    </div>











                    <div className="col-md-7 col-lg-9" style={{backgroundColor:"white",width:"100%",height:"auto",marginTop:"30px"}}>
                        <div className="row">
                            <div className="col">
                                <img src={simpson} style={{width:"100%"}}/>
                                <br/>

                            </div>
                        </div>
                        <div className="row">
                            <br/>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <img src={cucina} style={{width:"100%",height:"80%"}}/>


                            </div>
                            <div className="col-6">

                                <img src={giardino} style={{width:"100%",height:"80%"}}/>

                            </div>
                        </div>



                        <div className="row">
                            <div className="col-6">
                                <div style={{backgroundColor:"white", borderRight:"2px solid #ff6300",height:"100%"}}>
                                    <h5>Descrizione struttura</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum a sapien id eleifend.
                                        Suspendisse porttitor hendrerit vestibulum. Vivamus fringilla ante orci, in rutrum felis feugiat at.
                                        Pellentesque mi arcu, molestie lobortis ullamcorper in, auctor pulvinar sem. Aenean ac erat sit amet metus vestibulum accumsan nec eu nisi.
                                        Mauris massa ante, feugiat ut dictum sit amet, dictum in nulla. Suspendisse lobortis venenatis ornare. Cras sit amet laoreet massa, vel volutpat nulla. Donec imperdiet arcu non hendrerit imperdiet.
                                        Sed ut ullamcorper turpis. Cras tristique elementum augue, sit amet ullamcorper nisl pharetra eu.</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div style={{margin:"auto",border:"1px solid #ff6300",height:"auto",width:"70%"}}>
                                    <h5 style={{textAlign:"center"}}>Servizi</h5>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <p>Wifi</p>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <p>Wifi</p>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div style={{width:"100%",height:"auto",borderTop:"2px solid #ff6300",borderBottom:"2px solid #ff6300",backgroundColor:"white",margin:"auto"}}>
                                    <br/>
                                    <h5 style={{textAlign:"center"}}>Punti di interesse</h5>
                                    <p>
                                        Aenean dapibus accumsan pellentesque. Ut scelerisque, ante suscipit varius eleifend, erat lacus consectetur magna,
                                        vel euismod erat lectus nec massa. Etiam non accumsan diam. Vivamus tincidunt tellus tristique justo vehicula,
                                        ut imperdiet metus rutrum. Etiam et orci nec ante consectetur feugiat ac sit amet dolor. Aliquam erat volutpat.
                                        Cras feugiat, nunc at pellentesque commodo, purus risus pellentesque massa, quis tincidunt dolor nunc sed ante.
                                        Donec vel nulla placerat, fermentum eros ac, efficitur felis. Mauris consequat sem ex, sit amet sollicitudin justo placerat quis.
                                        Aenean non elit vel lacus cursus ornare. Duis et dui urna.
                                    </p>
                                    <br/>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        );

    }
}
export default EsploraStruttura;