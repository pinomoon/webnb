import React, {Component, useState} from 'react';
import Header from "../header/HeaderCliente";
import ModificaAccount from "./ModificaAccount";
import Footer from "../footer/Footer";
import axios from "axios";
import {getSessionCookie} from "../../sessions";


const PaginaModificaAccount=()=>{


        return(
            <div>

            <ModificaAccount/>

            </div>
        );

};
export default PaginaModificaAccount;