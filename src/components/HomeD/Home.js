import React from "react";
import "./Home.css";
import Nav from "../Nav";
import { useNavigate } from "react-router";
import Footbar from "../Footbar";
import optimi_logo from "../img/optimi_logo.png";
import matrix from "../img/matrix.png";

const Home = (props) => {
    const navigate = useNavigate();
    return(
        <div>
            <Nav/>
            <div>
                <div className="banner"
                style={{
                    backgroundSize: "cover",
                    // backgroundImage: `url("./img/banner.png")`,
                    backgroundPosition: "center center",
                }}
                >
                    
                    <div className="box">
                        <h1 className="text-home">Services</h1>
                        <h1 className="text-home">Find Your Best Optimized Route</h1>
                        
                        
                        <button className="box-routeservice" onClick={()=> navigate("/college-details")}>
                            <h1 className="routeservice">Test on map.routeservies.org</h1>
                        </button>
                        {/* <div className="routeservice">
                        </div> */}
                        {/* <img src=""/> */}
                    </div>
                </div>
                {/* For Optimization */}
                <div className="optimization">
                    <div className="about-us">
                        <div className="optimization-box">
                            <h1 className="optimization-text">Optimization</h1>
                            <p className="optimization-para">
                            Openrouteservice’s application can be used to solve various <span id="span1">school bus</span> routing problems. This versatile service will not only provide fast responses but lets you <span id="span1">customize your vehicle</span>, task and <span id="span1">time constraints</span> according to your needs. By specifying multiple vehicles the result will be optimized for your whole fleet. The tasks can be either defined as <span id="span1">jobs</span>, which are <span id="span1">single-location</span> pickups or deliveries, or as shipments where pickup and delivery should happen by one vehicle on the same route. We provide a working example request in our api playground, so start optimizing right away.
                            </p>
                        </div>
                        <div className="optimization-image">
                            <img src={optimi_logo} alt="img" />
                        </div>
                    </div>
                </div>
                <hr width="90%"/>
                {/* For distance-time matrix */}
                {/* <div>
                    <div className="matrix">
                        <div className="matrix-image">
                            <img src={matrix} alt="img" />
                        </div>
                        <div className="matrix-box">
                            <h1 className="matrix-text">Time-Distance Matrix</h1>
                            <p className="matrix-para">
                            One to many, many to many or many to one. Openrouteservice’s time-distance matrix service allows you to obtain time and distance information between a set of locations (origins and destinations) and returns them to you in a structured JSON response. This API is extremely convenient and scalable for batch requests determining aggregated metrics of routes (it does not return detailed route information, use the directions api for this use case). Akin to locations and directions, you may specify the transportation mode and compute routes which adhere to certain restrictions, such as avoiding specific road types or object characteristics.
                            One prominent use case which can be built on top of this service is to easily explore the fastest or shortest combination of a set of destinations which should be reached – this is commonly referred to as the traveling sales person problem.
                            </p>
                        </div>
                    </div>
                </div> */}
                {/* <hr width="90%"/> */}
            </div>
            <Footbar/>
        </div>
    )
}

export default Home