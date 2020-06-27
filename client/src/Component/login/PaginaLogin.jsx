import React, {Component} from 'react';
import {useContext} from 'react';
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Login from "./login"

import {UserContext} from "../../UserContext";



const PaginaLogin=()=> {


        return(

            <div>
                <Login/>
            </div>
        );


};


export default PaginaLogin;