import React, {Component} from 'react';
import logo from './header_trasparente.png';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Registrazione from './registrazione.jsx';
import Login from './login.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    appBar: {
        background: "#fff",
        padding: 10,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: (props) => props.drawerWidth,
        width: (props) => `calc(100% - ${props.drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appLogo: {
        maxWidth: 200,
        maxHeight: 50,
        display: "block",
        margin: "0 auto"
    },
    content: {
        padding: theme.spacing(3),
        paddingTop: 100,
        paddingBottom: 150,
    },
    contentShift: {
        paddingLeft: (props) =>  props.drawerWidth,
        transition: theme.transitions.create(["padding"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    menuIcon: {
        width: 50,
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        outline: "none",
        "&:hover": {
            outline: "none"
        },
        "&:focus": {
            outline: "none"
        }
    },
    footerContainer: {
        backgroundColor: "#fff",
        width: "100%",
        maxHeight: 120,
        position: "fixed",
        boxShadow: "1px 1px 10px #ddd",
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 20,
    },
    footerContent: {
        display: "block",
        margin: "0 auto",
        textAlign: "center"
    },
    poweredByImage: {
        maxHeight: 80
    }
}));
class App extends Component {

    constructor(props){
        super(props);
        this.state={apiResponse:""};
    }
    callAPI(){
        fetch("https://localhost:9000/users")
            .then(res=>res.text())
            .then(res=>this.setState({apiResponse:res}))
            .catch(err=>err);
    }
    componentDidMount(){
        this.callAPI();
    }
    render(){
        return (
            <div className={useStyles.root}>
                    <Router>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start"  color="inherit" aria-label="menu" className={useStyles.menuIcon} >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6" className={useStyles.title}>
                                    <img src={logo} className={useStyles.appLogo} alt="logo"/>
                                </Typography>
                                <Button color="inherit" href="login">Login</Button>
                                <Button color="inherit" href="registrazione">Registrati</Button>
                            </Toolbar>

                        </AppBar>



                        <main className={`${useStyles.content}`}>
                            <Switch>

                                <Route path="/login" component={Login}/>
                                <Route path="/registrazione" component={Registrazione} />
                            </Switch>
                        </main>
                        <footer>
                            <div className={useStyles.footerContainer}>
                                <div className={useStyles.footerContent}>

                                </div>
                            </div>
                        </footer>
                    </Router>
                </div>
        );
    }
}



export default App;
