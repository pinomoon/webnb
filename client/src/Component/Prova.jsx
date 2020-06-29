import {Component, default as React} from 'react'
import home from "./login/home.jpg";



class Prova extends Component{
    render(){
        return(

            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-6">
                        <div style={{margin:"auto",marginTop:"50px", border:"2px solid #ff6300",borderRadius:"25px",width:"100%",height:"450px"}}>
                            <img src={home} style={{margin:"auto",marginTop:"30px",width:"60%",height:"80px",display:"block"}}/>

                        </div>
                    </div>
                    <div className="col">

                    </div>
                </div>

            </div>



        );
    }
}

export default Prova;