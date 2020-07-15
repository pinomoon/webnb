import React, { useState} from 'react';
import Homepage from "./Component/homepage/Homepage";
import {Switch,Route} from "react-router"
import {BrowserRouter} from "react-router-dom";
import PaginaLogin from "./Component/login/login"
import Checkin from "./Component/Check-in/checkin";
import GestisciStrutture from "./Component/GestioneStrutture/GestisciStrutture";
import InserisciStruttura from "./Component/GestioneStrutture/InserisciStruttura";
import {UserContext} from "./UserContext";
import {PrivateRoute, PrivateRouteCliente, PrivateRouteHost} from "./privateRoute";
import Header from "./Component/header/Header";
import Footer from "./Component/footer/Footer";
import {getSessionCookie} from "./sessions";
import RecuperaPassword from "./Component/pagineFuoriSicurezza/recuperapassword";
import PasswordDimenticata from "./Component/login/passwordDimenticata";
import ConfermaAccount from "./Component/pagineFuoriSicurezza/confermaAccount";
import GestisciPrenotazioni from "./Component/GestionePrenotazioni/GestisciPrenotazioni";
import CadutaConnessione from "./Component/Caduta Connessione/CadutaConnessione";
import RicercaStruttura from "./Component/Ricerca Struttura/RicercaStruttura";
import MieiGuadagni from "./Component/iMieiGuadagni/mieiguadagni";
import EsploraStruttura from"./Component/Ricerca Struttura/EsploraStruttura";
import AggiungiCamera from "./Component/GestisciCamera/AggiungiCamera";
import ElencoPrenotazioni from "./Component/FunzionalitaCliente/ElencoPrenotazioni";
import ElencoPreferiti from "./Component/FunzionalitaCliente/ElencoPreferiti";
import ModificaStruttura from "./Component/GestioneStrutture/modificastruttura";
import EliminaCamera from "./Component/GestisciCamera/eliminacamera";
import Prenotazione from "./Component/Ricerca Struttura/Prenotazione";
import UfficioTurismo from "./Component/UfficioTurismo/ufficioturismo";
import FAQ from "./Component/FAQ";
import Unabled from "./Component/Caduta Connessione/unabled";
import AboutUs from "./Component/about_us/AboutUs";
import ModificaAccount from "./Component/modifica_account/ModificaAccount";
import Profilo from "./Component/profilo/Profilo";
import Registrazione from "./Component/registrazione/registrazione";



const App= ()=> {
    const [session,setSession]=useState(getSessionCookie());
    return (
        <div>
            <UserContext.Provider value={session}>
                <BrowserRouter>
                    <Header/>
                    <main>
                        <Switch>
                            <Route path="/aboutus" component={AboutUs} exact/>
                            <Route path="/" component={Homepage} exact/>
                            <Route path="/registrazione" component={Registrazione} exact/>
                            <Route path="/login" component={PaginaLogin} exact/>
                            <Route path="/modificaaccount" component={ModificaAccount} exact/>
                            <Route path="/recuperaCredenziali" component={RecuperaPassword}/>
                            <Route path="/login/passwordDimenticata" component={PasswordDimenticata} exact/>
                            <Route path="/accountConferma" component={ConfermaAccount} />
                            <Route path="/FAQ" component={FAQ}  exact/>
                            <Route path="/unabled" component={Unabled} exact/>
                            <PrivateRoute path="/esplora" component={EsploraStruttura}/>
                            <PrivateRoute path="/ricercastruttura" component={RicercaStruttura} />
                            <PrivateRouteHost path="/checkin" component={Checkin} />
                            <PrivateRouteHost path="/lemiestrutture" component={GestisciStrutture} exact/>
                            <PrivateRouteHost path="/inseriscistruttura" component={InserisciStruttura} exact/>
                            <PrivateRouteHost path="/aggiungicamera" component={AggiungiCamera} />
                            <PrivateRouteHost path="/guadagni" component={MieiGuadagni} exact />
                            <PrivateRouteHost path="/gestisciprenotazione" component={GestisciPrenotazioni} />
                            <PrivateRouteHost path="/modificaStruttura" component={ModificaStruttura} />
                            <PrivateRouteHost path="/eliminaCamera" component={EliminaCamera} />
                            <PrivateRouteHost path="/ufficioturismo" component={UfficioTurismo}  exact/>
                            <PrivateRouteCliente path="/lemieprenotazioni" component={ElencoPrenotazioni} exact />
                            <PrivateRouteCliente path="/imieipreferiti" component={ElencoPreferiti} exact />
                            <PrivateRouteCliente path="/prenotazione" component={Prenotazione} />
                            <PrivateRouteCliente path="/profilo" component={Profilo} exact/>
                            <Route path="*" component={CadutaConnessione}/>
                        </Switch>
                    </main>
                    <Footer/>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );

};



export default App;