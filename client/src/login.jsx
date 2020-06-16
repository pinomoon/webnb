import  React, {Component} from "react";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={apiResponse:""};
    }
    callAPI(){
        fetch("https://localhost:9000/")
            .then(res=>res.text())
            .then(res=>this.setState({apiResponse:res}))
            .catch(err=>err);
    }
    componentDidMount(){
        this.callAPI();
    }
    render(){
        return(
            <form className="container was-validated col-sm-8 mt-3" method="POST" action="/users/login">

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
                           pattern="^(?=.[a-z])(?=.[A-Z])(?=.*[0-9]).{8,}$" size="32" maxLength="40" required/>
                    <div className="invalid-feedback">
                        Almeno 8 caratteri di cui uno maiusciolo e un numero
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