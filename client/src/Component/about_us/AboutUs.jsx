import React from 'react';
import salvo from '../images/salvo.jpeg'
import luca from '../images/luca.jpeg'
import gianluca from '../images/io.jpg'
import giuseppe from '../images/giuseppe.jpeg'

const AboutUs=()=>{
    return(
        <container>

            <section class="team-section text-center my-5" style={{height:"auto",width:"100%"}}>

                <h2 class="h1-responsive font-weight-bold my-5">Il nostro team</h2>

                <p class="h1-responsive font-weight-bold my-5">Un gruppo di persone che condivide un obiettivo comune può raggiungere l’impossibile.</p>
                <hr style={{border:"2px solid #ff6300"}}/>
                <br/>
                <div class="row" >

                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-5" >
                        <div class="avatar mx-auto">
                            <img src={salvo} width="250" height="250"class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Salvatore Drago</h5>
                        <p class="text-uppercase blue-text"><strong>Backend Developer</strong></p>
                        <p class="grey-text">Colui che chiede è stupido per un minuto, colui che non chiede è stupido per tutta la vita.  <br/>
                        -Confucio</p>
                        <ul class="list-unstyled mb-0">
                            <a class="p-2 fa-lg fb-ic">
                                <i class="fab fa-facebook-f blue-text"> </i>
                            </a>
                            <a class="p-2 fa-lg tw-ic">
                                <i class="fab fa-twitter blue-text"> </i>
                            </a>
                            <a class="p-2 fa-lg ins-ic">
                                <i class="fab fa-instagram blue-text"> </i>
                            </a>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
                        <div class="avatar mx-auto">
                            <img src={luca} width="250" height="250" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Luca La Barbera</h5>
                        <p class="text-uppercase blue-text"><strong>Backend Developer</strong></p>
                        <p class="grey-text">Sii il cambiamento che vuoi vedere nel mondo. <br/>  -Mahatma Gandhi</p>
                        <ul class="list-unstyled mb-0">
                            <a class="p-2 fa-lg fb-ic">
                                <i class="fab fa-facebook-f blue-text"> </i>
                            </a>
                            <a class="p-2 fa-lg ins-ic">
                                <i class="fab fa-instagram blue-text"> </i>
                            </a>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-md-0 mb-5">
                        <div class="avatar mx-auto">
                            <img src={gianluca} width="250" height="250" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Gianluca La Malfa</h5>
                        <p class="text-uppercase blue-text"><strong>Frontend Developer</strong></p>
                        <p class="grey-text">La perfezione è sempre a un gradino dalla perfezione.</p>
                        <ul class="list-unstyled mb-0">
                            <a class="p-2 fa-lg fb-ic">
                                <i class="fab fa-facebook-f blue-text"> </i>
                            </a>
                            <a class="p-2 fa-lg ins-ic">
                                <i class="fab fa-instagram blue-text"> </i>
                            </a>

                            <a class="p-2 fa-lg ins-ic">
                                <i class="fab fa-dribbble blue-text"> </i>
                            </a>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="avatar mx-auto">
                            <img src={giuseppe} width="250" height="250" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Giuseppe Luna</h5>
                        <p class="text-uppercase blue-text"><strong>Frontend Developer</strong></p>
                        <p class="grey-text">L’unica vera saggezza è sapere di non sapere nulla. <br/>-Socrate</p>
                        <ul class="list-unstyled mb-0">

                            <a class="p-2 fa-lg fb-ic">
                                <i class="fab fa-facebook-f blue-text"> </i>
                            </a>

                            <a class="p-2 fa-lg ins-ic">
                                <i class="fab fa-github blue-text"> </i>
                            </a>
                        </ul>
                    </div>


                </div>


            </section>
        </container>

    );

}
export default AboutUs;