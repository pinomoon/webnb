import React, {Component} from 'react';
import Header from "../header/Header";
import AboutUs from "./AboutUs";


class PaginaAboutUs extends Component{
    render(){
        return(

            <div>
                <Header />
                <AboutUs />
            </div>
        );

    }
}

export default PaginaAboutUs;