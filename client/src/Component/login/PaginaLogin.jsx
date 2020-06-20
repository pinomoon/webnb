import React, {Component} from 'react';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Login from "./login"


class PaginaLogin extends Component{
    render(){
        return(

            <div>
                <Header/>
                <Login/>
                <Footer/>
            </div>
        );

    }
}

export default PaginaLogin;