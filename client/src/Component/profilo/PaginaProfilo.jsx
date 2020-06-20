import React, {Component} from 'react';
import HeaderCliente from "../header/HeaderCliente";
import Profilo from "./Profilo";
import Footer from "../footer/Footer";


class PaginaProfilo extends Component{
    render(){
        return(

            <div>
                <HeaderCliente/>
                <Profilo/>
                <Footer/>

            </div>




        );
    }
}

export default PaginaProfilo;