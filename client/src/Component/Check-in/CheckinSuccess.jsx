import React, {Component} from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Button from "@material-ui/core/Button";


class CheckinSuccess extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-6">

                        <h3 style={{textAlign:"center",marginTop:"150px",marginBottom:"150px"}}>Check-in effettuato correttamente</h3>
                        <Button color="inherit" href="/checkin"style={{color:"#ff6300",marginLeft:"30px"}}>Indietro</Button>
                    </div>

                    <div className="col">

                    </div>


                </div>
            </div>

        );
    }
}
export default CheckinSuccess;