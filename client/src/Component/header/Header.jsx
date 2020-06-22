import React, {Component} from 'react';
import logo from "../../header_trasparente.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";






class Header extends Component{

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
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