import React from "react";
import "./StudentLocation.css";
import Nav from "../Nav";
import Footbar from "../Footbar";
import addSvg from "../svg/Vector.svg";
import minusSVG from "../svg/minus.svg";
import editSVG from "../svg/edit.svg";
import addSvg2 from "../svg/add_3.svg";
import { useNavigate } from "react-router";

function Location (){

    const navigate = useNavigate();

    function changeFileButton(){
        document.getElementById('getFile').click();
    }
    return(
        <div>
            <Nav/>
                <div className="div-box1">
                    <div className="color-box"></div>
                    <div className="text-box">
                        <h1 className="text-only">Find Optimized Routes</h1>
                        <div className="add-box">
                            <img
                                className="add-logo"
                                src={addSvg}
                                alt = "Add Logo"
                            />
                            <h1 className="add-text">Add</h1>
                        </div>
                    </div>
                    <hr width = "90%"/>
                    <p className="enter-details_text">Enter the latitude and longitude of student pickup location
                        <br/> or <br/>
                    Upload the csv file containing the latitude & longitude of pickup location with number of students picked upfrom particular location</p>
                    <div className="lat-detail">
                        <h1 className="latitude-text">Enter Latitude & Longitude</h1>
                    </div>
                    <div className="form-lat_div">
                        <form className="form1">
                            <div className="location-box">
                                <div className="longlat_div">
                                    <input className="form-long_input" type="text" placeholder="Enter Longitude*" id="longitude" required/>
                                    <input className="form-lat_input" type="text" placeholder="Enter Latitude*" id="latitude" required/>
                                </div>
                                <div className="location-input">
                                    <input className="noStudents" width="auto" type="text" placeholder="Number of students*" id="latitude" required/>
                                    <input className="locationName" type="text" placeholder="Enter Location Name*" id="longitude" required/>
                                </div>
                            </div>
                        </form>
                        <div className="side-div">
                            <div className="add-div_lat">
                                <img
                                    className="addSvg2"
                                    src={addSvg2}
                                />
                                <h1 className="add_lat">Add More latitude <br/> and longitude</h1>
                            </div>
                            <h1 className="location_a">location</h1>
                            <button className="submit" onClick={()=>navigate("/map")} >Submit</button>
                        </div>
                    </div>
                    <div>
                        <div className="horizontalLine">
                            <div className="line"></div>
                            <h1>OR</h1>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="file-reader-div">
                        <h1 className="reading-headline">Upload .csv file</h1>
                        <div className="file-reader">
                           {/* <input type="file" accept=".csv" className="upload-input" name="Choose the file from Computer"></input>
                           <button className="submit">Submit</button> */}
                           <button className="fileReader-button" onClick={changeFileButton}>Upload the File from the computer</button>
                           <input className="upload-input" type='file' id="getFile"/>
                        </div>
                    </div>
                </div>
            <Footbar/>
        </div>
    )
}

export default Location;