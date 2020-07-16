import React from 'react';
import "./Footer.css"
import Instagram from "./icons8-instagram-48.png";
import Facebook from "./icons8-facebook-cerchiato-48.png";
import Twitter from "./icons8-twitter-48.png";


const Footer=()=>{

    return(

        <div className="mt-5 pt-5 pb-5 footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-xs-12 about-company">
                        <h2>Viaggiare non è mai stato così semplice!</h2>
                        <p className="pr-5 text-50">Sul nostro sito potrai visualizzare migliaia di offerte e prenotare
                        la vacanza dei tuoi sogni con un solo click.</p>
                        <p><a href="#"><i className="fa fa-facebook-square mr-1"></i></a><a href="#"><i
                            className="fa fa-linkedin-square"></i></a></p>
                    </div>
                    <div className="col-lg-3 col-xs-12 links">
                        <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                        <ul className="m-0 p-0">
                            <li>- <a href="https://www.instragram.com/"><img src={Instagram}/> Instagram</a></li>
                            <li>- <a href="https:///www.facebook.com"><img src={Facebook}/>Facebook</a></li>
                            <li>- <a href="https://www.twitter.com"><img src={Twitter}/>Twitter</a></li>


                        </ul>
                    </div>
                    <div className="col-lg-4 col-xs-12 location">
                        <h4 className="mt-lg-0 mt-sm-4">Contattaci</h4>
                        <p>Ecco i nostri indrizzi email:</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>salvo.drago@community.unipa.it</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>luca.labarbera@community.unipa.it</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>gianluca.lamalfa@community.unipa.it</p>
                        <p><i className="fa fa-envelope-o mr-3"></i>giuseppe.luna@community.unipa.it</p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col copyright">
                        <p className=""><small className="text-white-50">© 2020. All Rights Reserved.</small></p>
                    </div>
                </div>
            </div>
        </div>


    );


}

export default Footer;