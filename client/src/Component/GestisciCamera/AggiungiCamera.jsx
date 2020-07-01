import {default as React} from "react";
import user from "../registrazione/user.png";
import Button from "@material-ui/core/Button";
import host from "../GestisciCamera/2.jpg"


const AggiungiCamera  =() =>{
    return(

        <div className="container">
            <div className="row">
                <div className="col">

                </div>
                <div className="col-sm-12 col-md-9 col-lg-6">
                    <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"auto"}}>
                        <img src={host} style={{margin:"auto",marginTop:"30px",width:"30%",height:"30%",display:"block"}}/>

                        <form>
                            <div className="form-group" style={{width:"50%",margin:"auto"}}>
                                <h5> Nome camera</h5>

                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                      />
                            </div>

                            <div className="form-group" style={{width:"50%",margin:"auto"}} >
                                <h5> N.posti letto</h5>
                                <select className="form-control" id="exampleFormControlSelect1">
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
                            <div className="form-group" style={{width:"50%",margin:"auto"}}>
                                <h5> Prezzo </h5>

                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                       />
                            </div>
                        <br/>
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-1">
                                    <Button color="inherit" href="/gestisciprenotazione"style={{color:"#ff6300",marginLeft:"auto",display:"block"}}>Indietro</Button>
                                </div>
                                <div className="col-5">
                                </div>
                                <div className="col-1">
                                    <Button color="inherit" href="/checkin/success"style={{color:"#ff6300",marginRight:"auto",display:"block"}}>Invia</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>


    );
}
export default AggiungiCamera;