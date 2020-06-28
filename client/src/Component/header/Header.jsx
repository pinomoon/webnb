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





const Header =()=>{
    const user=React.useContext(UserContext);
    const handleChange = date => {
        this.setState({
            startDate: date
        });
    };


      return(

          <div style={{position:"relative", height:"7%" ,width:"100%"} }>
              <Navbar bg="light" style={{color:"#6495ED",borderBottom:"2px solid #ff6300",borderTop:"2px solid #ff6300"}} >
                      <Navbar.Brand href="/"><img src={logo} width="100" height="50"/></Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="mr-auto">
                              <Nav.Link href="/" style={{color:"#ff6300"}}>Home</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>About</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Lorem</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Ipsum</Nav.Link>
                          </Nav>
                          {user.id==null &&
                              <div>
                              <Button color="inherit" href="/login" style={{color:"#ff6300"}}>Accedi</Button>
                              <Button color="inherit" href="/registrazione"style={{color:"#ff6300"}}>Registrati</Button>
                              </div>
                          }
                          {user.tipo=="1"&&
                              <div>
                              <Dropdown as={ButtonGroup} style={{marginRight: "70px"}} variant="primary">
                                  <Button href="/profilo" style={{color:"#ff6300"}}>Profilo</Button>
                                  <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"/>
                                  <Dropdown.Menu>
                                      <Dropdown.Item href="/modificaaccount">Modifica Account</Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                  </Dropdown.Menu>
                              </Dropdown>
                          <Logout />
                              </div>
                          }
                          {user.tipo=="0"&&
                              <div>
                                  <Button href="/inserisciStruttura" style={{color:"#ff6300"}}>Inserisci la tua
                                      struttura</Button>
                                  <Dropdown as={ButtonGroup} style={{marginRight: "70px", color:"#ff6300"}}
                                            variant="primary">
                                      <Button href="/profilo" style={{color:"#ff6300"}}>Profilo</Button>

                                      <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"/>

                                      <Dropdown.Menu>
                                          <Dropdown.Item href="/modificaaccount">Modifica Account</Dropdown.Item>
                                          <Dropdown.Item href="/gestisciprenotazione">Gestisci prenotazioni</Dropdown.Item>
                                          <Dropdown.Item href="/ufficioturismo">Ufficio Turismo</Dropdown.Item>
                                      </Dropdown.Menu>
                                  </Dropdown>
                                  <Logout/>
                              </div>
                          }

                          </Navbar.Collapse>
                  </Navbar>
          </div>



                  );


};

export default Header;