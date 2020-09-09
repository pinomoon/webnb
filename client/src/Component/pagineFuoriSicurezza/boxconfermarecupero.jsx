import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxConfermaRecupero=(props)=> {
    const{open, onClose, responseType}=props;

    const handleClose=()=>{
        onClose();
    };

    return (
        <div class="sm-6">
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Recupero Password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <p>Password modificata correttamente, vai alla pagina di Login!</p>
                        }
                        {responseType=="2"&&
                        <p>Recupero password fallito, riprova</p>
                        }
                        {responseType=="3"&&
                        <p>Errore generico, riprova</p>
                        }
                        {responseType==="4"&&
                        <p>Il campo Nuova password e Reinserisci Nuova Password devono coincidere!</p>
                        }

                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType == "1"&&
                    < Button href="/login" onClick={handleClose}style={{color:"#ff6300"}}>Vai al Login</Button>
                    }
                    {responseType == "2"&&
                    < Button onClick={handleClose}style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                    {responseType == "3"&&
                    < Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                    {responseType == "4"&&
                    < Button onClick={handleClose}style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxConfermaRecupero;