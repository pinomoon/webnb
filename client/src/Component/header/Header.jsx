import React from 'react';
import logo from "../../header_trasparente.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../UserContext";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Logout from "../logout/logout";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';



const Header =()=>{
    const user=React.useContext(UserContext);

    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
                <Navbar.Brand href="/"><img src={logo} width="100" height="50"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        <Nav.Link href="/" style={{color:"#ff6300"}}>Home</Nav.Link>
                        <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>About</Nav.Link>
                        {(user.id==null || user.tipo == "1" )&&
                        <Nav.Link href="/FAQ" style={{color: "#ff6300"}}>FAQ</Nav.Link>
                        }
                        {user.tipo == "0" &&
                        <Nav.Link href="/FAQhost" style={{color: "#ff6300"}}>FAQ</Nav.Link>
                        }

                    </Nav>
                    {user.id==null &&
                    <div>
                        <Button color="inherit" href="/login" style={{marginLeft:"-10px",color:"#ff6300"}}>Accedi</Button>
                        <Button color="inherit" href="/registrazione"style={{color:"#ff6300"}}>Registrati</Button>
                    </div>
                    }
                    {user.tipo=="1"&&
                    <div>
                        <Dropdown as={ButtonGroup} style={{marginRight: "70px", color:"#ff6300"}}
                                  variant="primary">
                            <Button href="/imieipreferiti" style={{marginLeft:"-17px",color:"#ff6300"}}>I miei preferiti</Button>

                            <Dropdown.Toggle id="dropdown-split-basic" style={{backgroundColor:"#ff6300",color:"white",borderRadius:"3px",border:"2px solid #ff6300 "}}/>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/modificaaccount" style={{margin:"auto",display:"block"}}><AccountCircleRoundedIcon/> Modifica Account</Dropdown.Item>
                                <Dropdown.Item href="/lemieprenotazioni"style={{margin:"auto",display:"block"}}><MenuBookRoundedIcon/> Le mie prenotazioni</Dropdown.Item>
                                <Logout/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    }
                    {user.tipo=="0"&&
                    <div>

                        <Dropdown as={ButtonGroup} style={{marginRight: "70px", color:"#ff6300"}}
                                  variant="primary">
                            <Button href="/inserisciStruttura" style={{marginLeft:"-15px",color:"#ff6300"}}>Inserisci la tua struttura</Button>


                            <Dropdown.Toggle id="dropdown-split-basic" style={{backgroundColor:"#ff6300",color:"white",borderRadius:"3px",border:"2px solid #ff6300 "}}/>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/modificaaccount" style={{margin:"auto",display:"block"}}> <AccountCircleRoundedIcon/> Modifica Account</Dropdown.Item>
                                <Dropdown.Item href="/gestisciprenotazione"style={{margin:"auto",display:"block"}}><MenuBookRoundedIcon/> Gestisci prenotazioni</Dropdown.Item>
                                <Dropdown.Item href="/lemiestrutture" style={{margin:"auto",display:"block"}}><HomeWorkRoundedIcon/> Gestisci strutture</Dropdown.Item>
                                <Dropdown.Item href="/guadagni" style={{margin:"auto",display:"block"}}><AccountBalanceRoundedIcon/> I miei guadagni</Dropdown.Item>
                                <Dropdown.Item href="/ufficioturismo" style={{margin:"auto",display:"block"}}><GavelRoundedIcon/> Ufficio Turismo</Dropdown.Item>
                                <Logout/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    }

                </Navbar.Collapse>
            </Navbar>
        </div>



    );


};

export default Header;