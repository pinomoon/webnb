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
                            <Nav.Link href="/" style={{color:"#ff6300"}}>Home</Nav.Link>
                            <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>About</Nav.Link>
                            <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Lorem</Nav.Link>
                            <Nav.Link href="/aboutus"style={{color:"#ff6300"}}>Ipsum</Nav.Link>




                        </Nav>

                        <Button href="/inserisciStruttura" style={{color:"#ff6300"}}>Inserisci la tua struttura</Button>
                        <Button href="/profilo"style={{color:"#ff6300"}}>Profilo</Button>
                        <Dropdown as={ButtonGroup} style={{marginRight:"50px",color:"#ff6300",border:"none"}} >


                            <Dropdown.Toggle split  style={{backgroundColor:"#ff6300",border:"1px solid black"}} id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                <Dropdown.Item href="/modificaaccount">Modifica Account</Dropdown.Item>
                                <Dropdown.Item href="/lemiestrutture">Le mie strutture</Dropdown.Item>
                                <Dropdown.Item href="/checkin">Check-in</Dropdown.Item>
                                <Dropdown.Item href="/checkout">Check-out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>




                    </Navbar.Collapse>
                </Navbar>

            </div>


        );
    }
}
export default HeaderHost;