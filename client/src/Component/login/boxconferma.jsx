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
const BoxAccesso=(props)=> {
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
                <DialogTitle id="alert-dialog-slide-title">{"Login"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {responseType=="1"&&
                        <p style={{color:"#ff6300"}}>Accesso andato a buon fine! Clicca qui per andare alla tua HomePage!</p>
                        }
                        {responseType=="2"&&
                        <p style={{color:"#ff6300"}}>Email non ancora confermata, vai alla tua casella di posta per confermare</p>
                        }
                        {responseType=="3"&&
                        <p style={{color:"#ff6300"}}>Password errata, riprova</p>
                        }
                        {responseType=="4"&&
                        <p style={{color:"#ff6300"}}>Utente non trovato, riprova</p>
                        }
                    </DialogContentText>

                </DialogContent>
                <DialogActions id="action">
                    {responseType == "1"&&
                    < Button href="https://localhost:3000" onClick={handleClose}style={{color:"#ff6300"}}>Vai alla tua Homepage</Button>
                    }
                    {responseType == "2"&&
                    < Button href="https://localhost:3000" onClick={handleClose}style={{color:"#ff6300"}}>Homepage</Button>
                    }
                    {responseType == "3"&&
                    < Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                    {responseType == "4"&&
                    < Button onClick={handleClose} style={{color:"#ff6300"}}>Chiudi</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>


    );

};
export default BoxAccesso;