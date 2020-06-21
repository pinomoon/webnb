import React, {Component} from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Button from "@material-ui/core/Button";


class InserisciStrutturaSuccess extends Component{
    render(){
        return(
            <div>
                <Header/>
                <h3 style={{textAlign:"center",marginTop:"150px",marginBottom:"150px"}}>Struttura inserita con successo</h3>
                <Button color="inherit" href="/host"style={{color:"#6495ED",marginLeft:"30px"}}>Indietro</Button>
                <Footer/>


            </div>

        );
    }
}
export default InserisciStrutturaSuccess;