import { React, useState, useEffect } from "react";
import "./College.css";
import Footbar from "../Footbar";
import Nav from "../Nav";
import addSvg from "../svg/Vector.svg";
import minusSVG from "../svg/minus.svg";
import editSVG from "../svg/edit.svg";
import { useNavigate } from "react-router";
import axios from "axios";
import DataTable from "./data-table";
import {toast}  from 'react-toastify';

export const getHeaderInfo = function () {
    const token = localStorage.getItem('token');
    return {
        headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
    };
};
function College() {

    const tableColumns = [
        {heading: 'College Code', value: 'college_code'},
        {heading: 'College Name', value: 'college_name'},
        {heading: 'Contact Number', value: 'college_contactnumber'},
        {heading: 'Email', value: 'college_email'},
        {heading: 'Location', value: 'college_location'},
        {heading: 'Number of Students', value: 'noofstudents'},
        {heading: 'Admin Username', value: 'admin_username'},
    ]
    var collegeData = [];
    var cc = undefined;
    const getRequest = async (e) => {
        const header = getHeaderInfo();
        await axios.get('http://127.0.0.1:5000/college', header)
            .then(res => {
                for(let i=0; i<res.data.length; i++){
                    const temp = [];
                    cc = res.data[i][0].college_code;
                    console.log("cc: ", cc);
                    temp.push(res.data[i][0].college_code);
                    temp.push(res.data[i][0].college_name);
                    temp.push(res.data[i][0].college_contactnumber);
                    temp.push(res.data[i][0].college_email);
                    temp.push(res.data[i][0].college_location);
                    temp.push(res.data[i][0].noofstudents);
                    temp.push(res.data[i][0].admin_username);
                    collegeData[i] = temp;
                }
                localStorage.setItem('collegeCode', cc);
                console.log("locatl cc: ", localStorage.getItem('collegeCode'));
                console.log("user collection: ", collegeData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getRequest();
    }, []);

    const [showDialog, setShowDialog] = useState(false);
    const open = () => {
        setShowDialog(true); 
        getRequest();
    };
    const close = () =>  setShowDialog(false);
    const navigate = useNavigate();

    const [collegecode, setcollegecode] = useState('');
    const [collegename, setcollegename] = useState('');
    const [collegelocation, setcollegelocation] = useState('');
    const [noofsudent, setnoofstudent] = useState('');
    const [collegecontactnumber, setcontactnumber] = useState('');
    const [collegeemail, setcollegeemail] = useState('');
    const [username, setusername] = useState('');

    const handleCollegeCode = (e) => {
        setcollegecode(e.target.value);
    }
    const handleCollegeName = (e) => {
        setcollegename(e.target.value);
    }
    const handleCollegelocation = (e) => {
        setcollegelocation(e.target.value);
    }
    const handlenoofstudent = (e) => {
        setnoofstudent(e.target.value);
    }
    const handlecollegecontactno = (e) => {
        setcontactnumber(e.target.value);
    }
    const handleCollegeEmail = (e) => {
        setcollegeemail(e.target.value);
    }
    const handleusername = (e) => {
        setusername(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(collegelocation);
        let formdata = new FormData();
        formdata.append("college_code", collegecode);
        formdata.append("college_name", collegename);
        formdata.append("college_location", collegelocation);
        formdata.append("no_of_students", noofsudent);
        formdata.append("college_contactnumber", collegecontactnumber);
        formdata.append("college_email", collegeemail);
        formdata.append("admin_username", username);
        const header = getHeaderInfo();
        // axios.post("http://127.0.0.1:5000/college", formdata, header).then(response => {
        //     console.log(response);
        // })
        //     .catch(error => {
        //         console.log(error.response.data);
        //     });
        fetch("http://127.0.0.1:5000/college",{
            method: "POST",
            body: formdata,
            headers: {       
            'x-auth-token': localStorage.getItem('token') },
          })  
            .then(function (response) {
              //handle success
              console.log(response);
              if(response.status === 201){
                console.log("success")
                toast.success("College Added!!");
               }
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

            getRequest();
    }

    return (
        <div>
            <Nav />
            {/* <dialog className="dialog-box" isOpen={showDialog} onDismiss={close}>
            <h1>X</h1>
            <div className="div1">
                <input placeholder="Enter Campus Name*"/>
                <input placeholder="Enter Longitude*"/>
                <input placeholder="Enter Latitude*"/>
            </div>
        </dialog> */}

            <div>
                {showDialog ?
                    <dialog className="dialog-box1">
                        <h1 onClick={close}>X</h1>
                        <form onSubmit={(e) => { handleSubmit(e) }}>
                            <div className="div1">
                                <input
                                    type="numerical"
                                    name='college_code'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter College Code'
                                    value={collegecode}
                                    onChange={(e) => { handleCollegeCode(e) }}
                                />
                                <input
                                    type="text"
                                    name='college_name'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter College Name'
                                    value={collegename}
                                    onChange={(e) => { handleCollegeName(e) }}
                                />
                                <input 
                                    type="text"
                                    name='college_location'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter location'
                                    value={collegelocation}
                                    onChange={(e) => { handleCollegelocation(e) }}
                                />
                                <input
                                    type="numerical"
                                    name='no_of_student'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter No. of student'
                                    value={noofsudent}
                                    onChange={(e) => { handlenoofstudent(e) }}
                                />
                                <input
                                    type="numerical"
                                    name='college_contactnumberr'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter Contact Number'
                                    value={collegecontactnumber}
                                    onChange={(e) => { handlecollegecontactno(e) }}
                                />
                                <input
                                    type="email"
                                    name='college_email'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter College Email'
                                    value={collegeemail}
                                    onChange={(e) => { handleCollegeEmail(e) }}
                                />
                                <input
                                    type="text"
                                    name='admin_username'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Enter Username'
                                    value={username}
                                    onChange={(e) => { handleusername(e) }}
                                />
                            </div> 
                            <button className='submit' onClick={handleSubmit}>Submit</button>
                        </form>
                    </dialog> : ''}
            </div>
            <div className="banner" 
            style={
                {
                    backgroundSize: "cover"
                }
            }
            >
                <div className="box1" id="box">
                    <div className="college-box">
                        <div className="color-box"></div>
                        <div className="text-box">
                            <h1 className="college-text">Find Campus</h1>
                            <div className="add-box" onClick={open}>
                                <img
                                    className="add-logo"
                                    src={addSvg}
                                    alt="Add Logo"
                                // onClick={handleClickToOpen}
                                />
                                <h1 className="add-text">Add</h1>
                            </div>
                        </div>

                        <div className="table-box">

                            <DataTable data={collegeData} column = {tableColumns} />
                            <button onClick={()=> navigate("/bus-details")}>Add Buzz</button>
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>College Code</th>
                                        <th>College Name</th>
                                        <th>Contact Number</th>
                                        <th>Email</th>
                                        <th>Location</th>
                                        <th>Number of Students</th>
                                        <th>Admin Username</th>
                                        <button onClick={getRequest}>Get data button</button>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <td>this.state[0].admin_username</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>

                                    {data.map((val, key) => {
                                        return (
                                            <tr key={key} className="row-bor">
                                                <td>{val.campus}</td>
                                                <td>{val.geolocation}</td>
                                                <td>
                                                    <div style={{
                                                        // display: "flex"
                                                    }}>
                                                        {val.buses}
                                                        <img
                                                            onClick={() => navigate("/bus-details")}
                                                            className="edit"
                                                            style={{
                                                                width: "10px",
                                                                height: "10px"
                                                            }}
                                                            src={editSVG}
                                                            alt="Edit Logo"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{
                                                        // display: "flex"
                                                    }}>
                                                        {val.drivers}
                                                        <img
                                                            onClick={() => navigate("/driver-details")}
                                                            className="edit"
                                                            style={{
                                                                width: "10px",
                                                                height: "10px"
                                                            }}
                                                            src={editSVG}
                                                            alt="Edit Logo"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="student-link" onClick={() => navigate("/student-location")}>student location</td>
                                                <td className="minus">
                                                    <img
                                                        src={minusSVG}
                                                        alt="Minus Button"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footbar />
        </div>
    )
}
export default College;
