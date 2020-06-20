import React, {Component} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Registrazione from "./registrazione"


class PaginaRegistrazione extends Component{
    render(){
        return(

            <div>
                <Header/>
                <Registrazione/>
                <Footer/>
            </div>
        );

    }
}

export default PaginaRegistrazione;