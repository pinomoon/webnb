import React, {Component} from 'react';
import logo from "../../header_trasparente.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";



class Header extends Component{
    render(){
      return(

          <div style={{position:"relative", height:"7%" ,width:"100%"} }>

                  <Navbar bg="light" style={{color:"#6495ED"}} >

                      <Navbar.Brand href="/"><img src={logo} width="100" height="50"/></Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="mr-auto">
                              <Nav.Link href="/" style={{color:"#6495ED"}}>Home</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#6495ED"}}>About</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#6495ED"}}>Lorem</Nav.Link>
                              <Nav.Link href="/aboutus"style={{color:"#6495ED"}}>Ipsum</Nav.Link>



                              <div className="md-form mt-0" style={{marginLeft:"20px"}}>
                                  <input className="form-control" type="text" placeholder=" Dove vuoi andare?" aria-label="Search"></input>
                              </div>



                          </Nav>
                          <Button color="inherit" href="/login"style={{color:"#6495ED"}}>Accedi</Button>

                          <Button color="inherit" href="/registrazione"style={{color:"#6495ED"}}>Registrati</Button>



                      </Navbar.Collapse>
                  </Navbar>

          </div>



                  );

    }
}

export default Header;