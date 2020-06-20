import React, {Component} from 'react';
import sfondo from '../images/best-hd-wallpapers-pc-background-laptop.jpg'
import HeaderCliente from "../header/HeaderCliente";
import Footer from "../footer/Footer";
import "./Homepage.css"

class HomepageCliente extends Component{
    render(){
        return(

            <container >
                <HeaderCliente/>
                <section className="cover" style={{height:"500px"}}>
                    <div className="cover_filter"></div>
                    <div className="cover_caption">
                        <div className="cover_caption_copy">
                            <h1>Benvenuti in </h1>
                            <h2>WeB&B</h2>
                        </div>
                    </div>
                </section>
                <section className="cards clearfix">
                    <div className="card">
                        <img className="card_image" src="https://source.unsplash.com/400x260/?animals " alt=" Nature"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.?</p>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card_image" src="https://source.unsplash.com/400x260/?travel" alt="Random"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.?</p>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card_image" src="https://source.unsplash.com/400x260/?water" alt=" Random"/>
                        <div className="card_copy">
                            <h3>title card</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.? </p>
                        </div>
                    </div>
                </section>
                <Footer/>
            </container>

        );

    }
}

export default HomepageCliente;