import React  from 'react';
import homer from "../images/homer-simpson-620x350.jpg"

const Profilo=()=>{
    return(
        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">About Me</h3>
                            <h6 className="theme-color lead">Famosissimo portiere della palazzina</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc leo, elementum sit amet mauris at, interdum consequat nunc. Mauris semper urna sed iaculis tincidunt. Suspendisse tempus mi hendrerit, congue neque eu, gravida urna. Praesent ornare, dui et posuere ultricies, eros sem commodo metus, sed porta sapien risus a nunc. Suspendisse suscipit odio eu mi pretium, sed elementum enim hendrerit. Aliquam fermentum sagittis urna, ut interdum nisi consequat vel. Mauris porta mauris non felis feugiat, vestibulum pretium arcu varius. Nunc et sodales urna. Mauris ipsum nibh, fringilla quis ullamcorper vel, mattis vel eros.
                            </p>
                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Birthday</label>
                                        <p>12th November 1998</p>
                                    </div>
                                    <div className="media">
                                        <label>Age:</label>
                                        <p> 21 Yr</p>
                                    </div>
                                    <div className="media">
                                        <label>Residence:</label>
                                        <p> Santa Flavia</p>
                                    </div>
                                    <div className="media">
                                        <label>Address:</label>
                                        <p>-------</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail:</label>
                                        <p> lamalfagianluca12@.com </p>
                                    </div>
                                    <div className="media">
                                        <label>Phone</label>
                                        <p>-------</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src={homer} title="" alt="" style={{width:"400px"}}/>
                            <h3 style={{marginLeft:"90px"}}>Gianluca La Malfa</h3>
                        </div>
                    </div>
                </div>
                <div className="counter">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                <p className="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                                <p className="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                <p className="m-0px font-w-600">Photo Capture</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="190" data-speed="190">190</h6>
                                <p className="m-0px font-w-600">Telephonic Talk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




    );

}
export default Profilo;