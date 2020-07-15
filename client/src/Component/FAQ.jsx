import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const FAQ=()=>{

    return(
        <div className="row">
            <div className="col-2">
            </div>
            <div className="col-8">
                <h3> Frequently Asked Question</h3>
                <br/>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> Posso prenotare senza inserire la mia carta di credito?</h6>
                        <p>Per ragioni di sicurezza e' necessario inserire la carta di credito prima di procedere alla prenotazione.</p>
                    </li>

                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> E' necessario essere registrati per procedere alla prenotazione?</h6>
                        <p>   Sì, è necessario essere registrati.</p>
                    </li>





                </ul>
            </div>
        </div>


    );

}

export default FAQ;