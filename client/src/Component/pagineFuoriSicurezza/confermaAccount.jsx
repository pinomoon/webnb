import React from 'react';
import axios from "axios";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfermaAccount=()=>{

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    var token = getUrlVars()["token"];
    const [openConferma, setOpenConferma]=React.useState(false);
    const[tipoRisposta, setTipoRisposta]=React.useState("");

    const handleOpen=()=>{
        setOpenConferma(true);

    };
    const handleClose=()=>{
        setOpenConferma(false);
    };
    const richiesta=()=> {
        axios.post('https://localhost:9000/accountConferma', {token})
            .then((response) => {
                setTipoRisposta(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    };
    return(

        <div >
            <Dialog
                open={handleOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                onEnter={richiesta}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Conferma Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {tipoRisposta == "1" &&
                        <p>Account confermato con successo! Vai alla HomePage per effettuare l'accesso</p>
                        }
                        {tipoRisposta == "2" &&
                        <p>Siamo spiacenti si è verificato un errore imprevisto</p>
                        }
                        {tipoRisposta == "3" &&
                        <p>La tua email è già stata verificata, effettua l'accesso</p>
                        }
                        {tipoRisposta == "4" &&
                        <p>Errore generico, torna alla home</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {tipoRisposta == "1" &&
                    < Button href="/" onClick={handleClose} color="primary">HomePage</Button>
                    }
                    {tipoRisposta == "2" &&
                    < Button href="/" onClick={handleClose} color="primary">HomePage</Button>
                    }
                    {tipoRisposta == "3" &&
                    < Button href="/login"onClick={handleClose} color="primary">Login</Button>
                    }
                    {tipoRisposta == "4" &&
                    < Button href="/" onClick={handleClose} color="primary">HomePage</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>

    );

};

export default ConfermaAccount;