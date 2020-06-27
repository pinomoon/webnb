import React, {Component} from 'react';
import Header from "../header/HeaderHost";
import ModificaAccount from "./ModificaAccount";
import Footer from "../footer/Footer";


class PaginaModificaAccount extends Component{
    render(){
        return(
            <div>
            <Header />
            <ModificaAccount/>
             <Footer/>
            </div>
        );
    }
}
export default PaginaModificaAccount;