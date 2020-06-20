import React, {Component} from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import AboutUs from "./AboutUs";


class PaginaAboutUs extends Component{
    render(){
        return(

            <div>
                <Header />
                <AboutUs />
                <Footer/>



            </div>
        );

    }
}

export default PaginaAboutUs;