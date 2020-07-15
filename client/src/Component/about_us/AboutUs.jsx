import React from 'react';
import paperino from '../images/paperino_01.jpg'
import topolino from '../images/topolino.jpg'
import spongebob from '../images/sspongebob.jpg'
import patrick from '../images/patrick.jpg'

const AboutUs=()=>{
    return(
        <container>

            <section class="team-section text-center my-5" style={{height:"auto",width:"100%"}}>

                <h2 class="h1-responsive font-weight-bold my-5">Il nostro team</h2>
                <p class="grey-text w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam
                    eum porro a pariatur veniam.</p>

                <div class="row" >

                    <div class="col-lg-3 col-md-6 mb-lg-0 mb-5" >
                        <div class="avatar mx-auto">
                            <img src={paperino} width="300" height="300"class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Salvatore Drago</h5>
                        <p class="text-uppercase blue-text"><strong>Backend Engineer</strong></p>
                        <p class="grey-text">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci sed quia non numquam modi tempora eius.</p>
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
                            <img src={topolino} width="300" height="300" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Luca La Barbera</h5>
                        <p class="text-uppercase blue-text"><strong>Numero 10 della nazionale</strong></p>
                        <p class="grey-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem ipsa accusantium
                            doloremque rem laudantium totam aperiam.</p>
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
                            <img src={spongebob} width="300" height="300" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Gianluca La Malfa</h5>
                        <p class="text-uppercase blue-text"><strong>Portiere della palazzina</strong></p>
                        <p class="grey-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim est fugiat nulla id eu laborum.</p>
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
                            <img src={patrick} width="300" height="300" class="rounded-circle z-depth-1"
                                 alt="Sample avatar"/>
                        </div>
                        <h5 class="font-weight-bold mt-4 mb-3">Giuseppe Luna</h5>
                        <p class="text-uppercase blue-text"><strong>Frontend developer</strong></p>
                        <p class="grey-text">Perspiciatis repellendus ad dit consequuntur, eveniet earum nisi qui consectetur
                            totam officia voluptates perferendis voluptatibus aut.</p>
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