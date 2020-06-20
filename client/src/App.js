import React, {Component} from 'react';
import PaginaAboutUs from "./Component/about_us/PaginaAboutUs";
import HomepageCliente from "./Component/homepage/HomepageCliente";
import HomepageHost from "./Component/homepage/HomepageHost";
import Homepage from "./Component/homepage/Homepage";

import Route from "react-router-dom/es/Route";
import {BrowserRouter as Router} from "react-router-dom";
import PaginaLogin from "./Component/login/PaginaLogin"
import PaginaRegistrazione from "./Component/registrazione/PaginaRegistrazione"
import PaginaModificaAccount from "./Component/modifica_account/PaginaModificaAccount"
import PaginaProfilo from "./Component/profilo/PaginaProfilo";
import PaginaCheckin from "./Component/Check-in/checkin";
import PaginaCheckinSuccess from "./Component/Check-in/CheckinSuccess"
import CheckinFail from "./Component/Check-in/CheckinFail";
import GestisciStrutture from "./Component/GestioneStrutture/GestisciStrutture";
import InserisciStruttura from "./Component/GestioneStrutture/InserisciStruttura";
import InserisciStrutturaSuccess from "./Component/GestioneStrutture/InserisciStrutturaSuccess";


class App extends Component {

    constructor(props){
        super(props);
        this.state={apiResponse:""};
    }
    callAPI(){
        fetch("https://localhost:9000/testAPI")
            .then(res=>res.text())
            .then(res=>this.setState({apiResponse:res}))
            .catch(err=>err);
    }
    componentDidMount(){
        this.callAPI();
    }
    render(){
        return (
            <div>

                <Router>

                    <main>


                        <Route path="/aboutus" component={PaginaAboutUs} exact/>
                        <Route path="/" component={Homepage} exact/>
                        <Route path="/profilo" component={PaginaProfilo} exact/>
                        <Route path="/host" component={HomepageHost} exact/>
                        <Route path="/registrazione" component={PaginaRegistrazione} exact/>
                        <Route path="/login" component={PaginaLogin} exact/>
                        <Route path="/cliente" component={HomepageCliente} exact/>
                        <Route path="/modificaaccount" component={PaginaModificaAccount} exact/>
                        <Route path="/checkin" component={PaginaCheckin} exact/>
                        <Route path="/checkin/success" component={PaginaCheckinSuccess} exact/>
                        <Route path="/checkin/success" component={PaginaCheckinSuccess} exact/>
                        <Route path="/checkin/error" component={CheckinFail} exact/>
                        <Route path="/lemiestrutture" component={GestisciStrutture} exact/>
                        <Route path="/inseriscistruttura" component={InserisciStruttura} exact/>
                        <Route path="/inseriscistruttura/success" component={InserisciStrutturaSuccess} exact/>




                    </main>





                </Router>



            </div>



        );
    }
}



export default App;