import React, {Component} from 'react';
import logo from "../../header_trasparente.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import {UserContext} from "../../UserContext";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {setSessionCookie} from "../../sessions";
import historyContext from "react-router/modules/HistoryContext";
import {Redirect, Route} from "react-router";
import Logout from "../logout/logout";
import NavDropdown from "react-bootstrap/NavDropdown";





const Header =()=>{
    const user=React.useContext(UserContext);
    const handleChange = date => {
        this.setState({
            startDate: date
        });
    };


      return(
    <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
              <Navbar.Brand href="/"><img src={logo} width="100" height="50"/></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" >
                  <Nav className="mr-auto">
                      <Nav.Link href="/" style={{color:"#ff6300"}}>Home</Nav.Link>
                      <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>About</Nav.Link>
                      <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Lorem</Nav.Link>
                      <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Ipsum</Nav.Link>

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
                                      <Button href="/profilo" style={{marginLeft:"-17px",color:"#ff6300"}}>Profilo</Button>

                                      <Dropdown.Toggle id="dropdown-split-basic" style={{backgroundColor:"#ff6300",color:"white",borderRadius:"3px",border:"2px solid #ff6300 "}}/>
                                  <Dropdown.Menu>
                                      <Dropdown.Item href="/modificaaccount" style={{margin:"auto",display:"block"}}>Modifica Account</Dropdown.Item>
                                      <Dropdown.Item href="/lemieprenotazioni"style={{margin:"auto",display:"block"}}>Le mie prenotazioni</Dropdown.Item>
                                      <Dropdown.Item href="/imieipreferiti" style={{margin:"auto",display:"block"}}>I miei preferiti</Dropdown.Item>
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
                                          <Dropdown.Item href="/modificaaccount" style={{margin:"auto",display:"block"}}>Modifica Account</Dropdown.Item>
                                          <Dropdown.Item href="/gestisciprenotazione"style={{margin:"auto",display:"block"}}>Gestisci prenotazioni</Dropdown.Item>
                                          <Dropdown.Item href="/lemiestrutture" style={{margin:"auto",display:"block"}}>Gestisci strutture</Dropdown.Item>
                                          <Dropdown.Item href="/ufficioturismo" style={{margin:"auto",display:"block"}}>Ufficio Turismo</Dropdown.Item>
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