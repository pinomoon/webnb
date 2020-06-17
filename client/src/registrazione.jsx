import React, {Component} from "react";
import axios from 'axios';

class Registrazione extends Component{

    constructor(props){
        super(props);
        this.state={
                nome: "",
                cognome: "",
                tipo: "",
                data_di_nascita: "",
                indirizzo: "",
                sesso: "",
                password: "",
                email: "",
                citta:"",
                cap:"",
                numero_carta:"",
                scadenza:"",
                cvc:"",
                };
        this.initialState=this.state;
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    handleChange(event){
        const target=event.target;
        const proprieta= target.name;
        const valore= target.type=== 'radio' ? target.value : target.value;
        this.setState({[proprieta]: valore});
    }
    handleSubmit(event){
        alert("sono stati inseriti dei campi:"+" "+this.state.tipo+" "+this.state.nome+this.state.cognome+" "+this.state.data_di_nascita+" "+this.state.indirizzo+" "+this.state.email+" "+this.state.password+" "+this.state.sesso);
        event.preventDefault();
        let res =axios.post('https://localhost:9000/registrazione', this.state)
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    }
    makePostRequest(){

       /* var form=document.getElementById('form');
        var data=new FormData(form);
        let res =axios.post('https://localhost:9000/registrazione', data);
        console.log(res.data);

        */
    }


   // makePostRequest();
    componentDidMount(){
       // this.callAPI();
    }

    render(){
        return(
            <div class="container mt-10">
            <form name="form"  id="form" className="container was-validated col-sm-8 mt-3" method="POST" onSubmit={this.handleSubmit}>

                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="host" name="tipo"
                            value="false" onChange={this.handleChange} required/>
                    <label className="custom-control-label" htmlFor="host">Host</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="cliente" name="tipo"
                           value="true"  onChange={this.handleChange} required/>
                    <label className="custom-control-label" htmlFor="cliente">Cliente</label>
                    <br></br>
                    <div className="invalid-feedback ml-2">
                        Seleziona il tipo di registrazione da effettuare
                    </div>
                </div>

                <p className="lead text-uppercase">Dati anagrafici</p>

                <div className="form-group">
                    <label htmlFor="name">Nome *</label>
                    <input id="nome" name="nome" type="text" className="form-control" maxLength="40" value={this.state.nome} onChange={this.handleChange}required/>
                    <div className="invalid-feedback">
                        Inserire nome
                    </div>

                    <label htmlFor="surname">Cognome *</label>
                    <input id="cognome" name="cognome" type="text" className="form-control" maxLength="40" value={this.state.cognome} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">
                        Inserire cognome
                    </div>
                </div>

                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="male" name="sesso" value="M" onChange={this.handleChange} required/>
                        <label className="custom-control-label" htmlFor="male">Uomo</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mt-2">
                    <input type="radio" className="custom-control-input" id="female" name="sesso" value="F" onChange={this.handleChange} required/>
                        <label className="custom-control-label" htmlFor="female">Donna</label>
                        <br></br>
                        <div className="invalid-feedback ml-2">
                            Inserire il genere
                        </div>
                </div>
                <div className="form-group">
                    <label htmlFor="birthdate">Data di Nascita *</label>
                    <input name="data_di_nascita" id="birthdate" type="date" className="form-control" value={this.state.data_di_nascita} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">
                        Selezionare la data di nascita
                    </div>
                </div>

                <p className="lead text-uppercase mt-3">Indirizzo di Residenza</p>

                <div className="form-group">
                        <div class="col-6">
                            <label htmlFor="name">Via/Piazza</label>
                            <input id="indirizzo" name="indirizzo" type="text" className="form-control" maxLength="40" value={this.state.indirizzo} onChange={this.handleChange} required/>
                            <div className="invalid-feedback">
                             Inserire Via e Numero Civico
                            </div>
                        </div>

                        <div class="col-3">
                            <label htmlFor="name">Città</label>
                            <input id="citta" name="citta" type="text" className="form-control" maxLength="40" value={this.state.citta} onChange={this.handleChange} required/>
                            <div className="invalid-feedback">
                                Inserire Città
                            </div>
                        </div>

                        <div class="col-3">
                            <label htmlFor="name">CAP</label>
                            <input id="cap" name="cap" type="text" className="form-control" maxLength="40" value={this.state.cap} onChange={this.handleChange} required/>
                            <div className="invalid-feedback">
                            Inserire CAP
                            </div>
                        </div>
                </div>

                <p className="lead text-uppercase mt-3">Dati di Pagamento</p>

                <div className="form-group">
                    <div class="col-6">
                    <label htmlFor="credit-card">Carta di Credito</label>
                    <input name="numero_carta" id="numero_carta" type="credit-card" className="form-control" size="32" maxLength="40"
                           value={this.state.numero_carta} onChange={this.handleChange}/>
                    </div>

                    <div className="col-3">
                        <label htmlFor="credit-card">Scadenza</label>
                        <input name="scadenza" id="scadenza" type="text" className="form-control"
                               size="32" maxLength="40"
                               value={this.state.scadenza} onChange={this.handleChange} />
                    </div>

                    <div className="col-3">
                        <label htmlFor="credit-card">CVC</label>
                        <input name="cvc" id="cvc" type="text" className="form-control"
                               size="32" maxLength="40"
                               value={this.state.cvc} onChange={this.handleChange} />
                    </div>

                </div>

                <p className="lead text-uppercase mt-3">Autenticazione</p>

                <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40"
                           value={this.state.email} onChange={this.handleChange} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="pass">Password *</label>
                    <input name="password" id="pass" type="password" className="form-control"
                           title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                           //pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$"
                          size="32" maxLength="40" value={this.state.password} onChange={this.handleChange} required/>
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

            </div>



        );

    }
}
export default Registrazione;