import Navbar from "react-bootstrap/Navbar";
import logo from "../../header_trasparente.png";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import React, {Component} from 'react';



class HeaderHost extends Component{
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

                        <Button href="/inserisciStruttura" style={{color:"#6495ED"}}>Inserisci la tua struttura</Button>
                        <Dropdown as={ButtonGroup} style={{marginRight:"70px",color:"#6495ED"}} variant="primary">
                            <Button href="/profilo" style={{color:"#6495ED"}}>Profilo</Button>

                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                <Dropdown.Item href="/modificaaccount">Modifica Account</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>




                    </Navbar.Collapse>
                </Navbar>

            </div>


        );
    }
}
export default HeaderHost;