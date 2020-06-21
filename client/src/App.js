import React, {Component, useMemo, useState} from 'react';
import PaginaAboutUs from "./Component/about_us/PaginaAboutUs";
import HomepageCliente from "./Component/homepage/HomepageCliente";
import HomepageHost from "./Component/homepage/HomepageHost";
import Homepage from "./Component/homepage/Homepage";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
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
import {UserContext} from "./UserContext";
import {PrivateRoute} from "./privateRoute";


const App= ()=> {

    const [currentUser, setCurrentUser]= useState({
        id:undefined,
        email:undefined,
        tipo:undefined
    });
    const value=useMemo(()=>({currentUser,setCurrentUser}),[currentUser,setCurrentUser]);

        return (
            <div>
                <UserContext.Provider value={value} >
                <Router>

                    <main>

                        <Switch>
                        /*provo private route con aboutus*/
                        <PrivateRoute path="/aboutus" component={PaginaAboutUs} exact/>
                        <Route path="/" component={Homepage} exact/>
                        <Route path="/profilo" component={PaginaProfilo} exact/>
                        <Route path="/host" component={HomepageHost} exact/>
                        <Route path="/registrazione" component={PaginaRegistrazione} exact/>
                        <Route path="/login" component={PaginaLogin} exact/>
                        <Route path="/cliente" component={HomepageCliente} exact/>
                        <Route path="/modificaaccount" component={PaginaModificaAccount} exact/>
                        <Route path="/checkin" component={PaginaCheckin} exact/>
                        <Route path="/checkin/success" component={PaginaCheckinSuccess} exact/>
                        <Route path="/checkin/error" component={CheckinFail} exact/>
                        <Route path="/lemiestrutture" component={GestisciStrutture} exact/>
                        <Route path="/inseriscistruttura" component={InserisciStruttura} exact/>
                        <Route path="/inseriscistruttura/success" component={InserisciStrutturaSuccess} exact/>
                        <Route path="*" component={()=>{"404 NOT FOUND"}}/>
                        </Switch>




                    </main>





                </Router>
</UserContext.Provider>


            </div>



        );

};



export default App;