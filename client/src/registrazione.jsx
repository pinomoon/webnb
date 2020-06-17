import React, {Component} from "react";

class Registrazione extends Component{
    constructor(props){
        super(props);
        this.state={apiResponse:""};
    }
    callAPI(){
        fetch("https://localhost:9000/registrazione")
            .then(res=>res.text())
            .then(res=>this.setState({apiResponse:res}))
            .catch(err=>err);
    }
    componentDidMount(){
        this.callAPI();
    }
    render(){
        return(
            <form className="container was-validated col-sm-8 mt-3" method="POST" action="https://localhost:9000/registrazione">

                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="host" name="tipo" value="host" required/>
                    <label className="custom-control-label" htmlFor="host">Host</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="cliente" name="tipo" value="cliente" required/>
                    <label className="custom-control-label" htmlFor="cliente">Cliente</label>
                    <br></br>
                    <div className="invalid-feedback ml-2">
                        Seleziona il tipo di registrazione da effettuare
                    </div>
                </div>

                <p className="lead text-uppercase">Dati anagrafici</p>

                <div className="form-group">
                    <label htmlFor="name">Nome *</label>
                    <input id="nome" name="nome" type="text" className="form-control" maxLength="40" required/>
                    <div className="invalid-feedback">
                        Inserire nome
                    </div>

                    <label htmlFor="surname">Cognome *</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" maxLength="40" required/>
                    <div className="invalid-feedback">
                        Inserire cognome
                    </div>
                </div>

                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="male" name="gender" value="male" required/>
                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="female" name="gender" value="female" required/>
                        <label className="custom-control-label" htmlFor="female">Donna</label>
                        <br></br>
                        <div className="invalid-feedback ml-2">
                            Inserire il genere
                        </div>
                </div>








                <div className="form-group">
                    <label htmlFor="birthdate">Data di Nascita *</label>
                    <input name="birthdate" id="birthdate" type="date" className="form-control" required/>
                    <div className="invalid-feedback">
                        Selezionare la data di nascita
                    </div>
                </div>

                <p className="lead text-uppercase mt-3">Indirizzo</p>
                <div className="form-group">

                        <label htmlFor="name">Via/Piazza</label>
                        <input id="nome" name="nome" type="text" className="form-control" maxLength="40" required/>
                        <div className="invalid-feedback">
                            Inserire Via, Numero Civico e CAP
                        </div>
                </div>


                <p className="lead text-uppercase mt-3">Autenticazione</p>
                <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40"
                           required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password *</label>
                    <input name="pass" id="pass" type="password" className="form-control"
                           title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                           //pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$"
                          size="32" maxLength="40" required/>
                    <div className="invalid-feedback">
                        Almeno 8 caratteri di cui uno maiusciolo e un numero
                    </div>
                    <div className="valid-feedback text-warning">
                        Password media
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="repass">Reinserisci password *</label>
                    <input name="repass" id="repass" type="password" className="form-control" size="32" maxLength="40"
                           onChange="checkPassword(this)" required/>
                    <div className="invalid-feedback">
                        Le password devono coincidere
                    </div>
                </div>
                <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3">Invia</button>
            </form>
        );

    }
}
export default Registrazione;