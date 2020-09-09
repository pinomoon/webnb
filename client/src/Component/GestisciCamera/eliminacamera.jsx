import React, {useState} from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



const EliminaCamera=()=>{
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
    const classes=makeStyles();
    const id_struttura = getUrlVars()["id_struttura"];
    const [camere, setCamere]=useState([]);
    const [selectedCamera, setSelectedCamera]=useState();
    const [openConferma, setOpenConferma]=useState(false);
    const [openErrore, setOpenErrore]=useState(false);

    React.useLayoutEffect(()=>{
        axios.post("https://localhost:9000/gestisciStrutture/mostraCamera", {id_struttura})
            .then((response) => {
                if (response.data[0] == "1") {
                    setCamere(response.data[1]);
                } else {
                    alert("Errore generico");
                }

            })
            .catch((error) => {
                alert(error);
            })
    },[openConferma,openErrore]);

    const handleCloseConferma=()=>{
        setOpenConferma(false);
    };
    const handleCloseErrore=()=>{
        setOpenErrore(false);
    };

    const handleElimina=(camera)=>{
        setSelectedCamera(camera.id_camera);
        if(window.confirm("Sei sicuro di voler eliminare questa camera? Una volta eliminata " +
            "non potrai più tornare indietro")) {
            axios.post("https://localhost:9000/gestisciStrutture/eliminaCamera", {id_camera: camera.id_camera})
                .then((response) => {
                    if (response.data == "1") {
                        setOpenConferma(true);
                    } else {
                        setOpenErrore(true);
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    return(
        <div>

            <h5 style={{textAlign:"center"}}>Elenco camere</h5>

            <div className="row" >
                <div className="col-2">
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="row">
                        {camere.map(camera=>{
                            return(

                                <div className="col-sm-12 col-md-6 col-lg-4">
                                    <div className="card text-center" style={{width: "97%"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{camera.nome_camera}</h5>
                                            <div className="card-text">
                                                <ul className="list-group list-group-flush" style={{height:"10%"}}>
                                                    <li className="list-group-item">Numero Posti Letto: {camera.numero_posti_letto}</li>
                                                    <li className= "list-group-item">Costo Camera: {camera.costo_camera}€</li>
                                                        {camera.colazione_inclusa==1 &&
                                                        <li className= "list-group-item">
                                                            Colazione Inclusa: Si</li> }
                                                    {camera.colazione_inclusa==0 &&
                                                    <li className= "list-group-item">
                                                        Colazione Inclusa: No</li> }



                                                </ul>

                                            </div>
                                            <Button href={'/lemiestrutture'} style={{color:"#ff6300"}}>Indietro</Button>
                                            <Button onClick={()=>handleElimina(camera)} style={{color:"#ff6300"}}> <DeleteOutlineIcon/> Elimina</Button>
                                        </div>
                                    </div>
                                </div>


                            ); })}
                    </div>
                </div>
            </div>
            <div className={classes.root}>
                <Snackbar open={openConferma} autoHideDuration={6000} onClose={handleCloseConferma} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseConferma} severity="success">
                        Camera Eliminata Con Successo!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrore} autoHideDuration={6000} onClose={handleCloseErrore} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={handleCloseErrore} severity="error">
                        Errore nel completamento dell'operazione
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );

};
export default EliminaCamera;