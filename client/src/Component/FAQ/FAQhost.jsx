import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const FAQhost=()=>{

    return(
        <div className="row">
            <div className="col-2">
            </div>
            <div className="col-8">
                <h3> Frequently Asked Question</h3>
                <br/>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> Posso inserire la mia struttura gratuitamente?</h6>
                        <p>Certamente, il nostro sito non trattiene alcuna commisione.</p>
                    </li>

                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> Come può la mia struttura comparire nella vetrina principale?</h6>
                        <p>Il nostro sito inserisce nella vetrina principale tutte quelle offerte che secondo i nostri standard sono più
                            convenienti per i clienti.</p>
                    </li>

                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> Devo necessariamente utilizzare la carta di credito come metodo di pagamento?</h6>
                        <p> Il nostro sito permette all'host di scegliere quali metodi di pagamento preferisce.Potrà scegliere di far pagare direttamente in struttura, di far pagare solo un acconto o tutto l'importo tramite carta di credito</p>
                    </li>
                    <li className="list-group-item">
                        <h6> <HelpOutlineIcon style={{color:"#ff6300"}}/> Cosa succede qualora il cliente dovesse annullare la sua prenotazione?</h6>
                        <p> L'annullamento della prenotazione segue le politiche scelte da ogni singola struttura, pertanto sarà l'host a decidere entro quanto dalla data di check-in permettere l'annullamento gratuito.</p>
                    </li>





                </ul>
            </div>
        </div>


    );

}

export default FAQhost;