import React, {Component} from "react";
import Header from "../header/HeaderHost";
import Button from "@material-ui/core/Button";
import Footer from "../footer/Footer";

class CheckinFail extends Component{
    render(){
        return(
            <div>
                <Header/>
                <h3 style={{textAlign:"center",marginTop:"150px",marginBottom:"150px"}}>Errore</h3>
                <Button color="inherit" href="/checkin"style={{color:"#6495ED",marginLeft:"30px"}}>Indietro</Button>
                <Footer/>


            </div>

        );
    }
}
export default CheckinFail;