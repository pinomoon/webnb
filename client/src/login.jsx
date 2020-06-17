import  React, {Component} from "react";
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={email:"",
                    password:""
                    };

    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target=event.target;
        const proprieta= target.name;
        const valore= target.value;
        this.setState({[proprieta]: valore});
    }
    handleSubmit(event){
        alert("sono stati inseriti dei campi: "+this.state.email+" "+this.state.password);
        event.preventDefault();
        let res =axios.post('https://localhost:9000/accesso', this.state)
            .then(function(response){
                alert(response.data);
            })
            .catch(function(error){
                alert(error);
            });
    }
    /*
    callAPI(){
        fetch("https://localhost:9000/")
            .then(res=>res.text())
            .then(res=>this.setState({apiResponse:res}))
            .catch(err=>err);
    }
    componentDidMount(){
        this.callAPI();
    }

     */
    render(){
        return(
            <form name="form" id="form" className="container was-validated col-sm-8 mt-3" method="POST" onSubmit={this.handleSubmit}>

                <p className="lead text-uppercase mt-3">Autenticazione</p>
                <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input name="email" id="email" type="email" className="form-control" size="32" maxLength="40"
                           onChange={this.handleChange} required/>
                    <div className="invalid-feedback">
                        Inserire indirizzo e-mail
                    </div>

                    <label htmlFor="pass">Password *</label>
                    <input name="password" id="pass" type="password" className="form-control"
                           title="Almeno 8 caratteri, una lettera maiuscola e un numero"
                          // pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$"
                        size="32" maxLength="40" required onChange={this.handleChange}/>
                    <div className="invalid-feedback">
                        Almeno 8 caratteri di cui uno maiuscolo e un numero
                    </div>
                    <div className="valid-feedback text-warning">
                        Password media
                    </div>
                </div>

                <button name="ok" id="ok" type="submit" className="btn btn-primary mt-3">Invia</button>
            </form>
        );
    }
}
export default Login;