import React, { Component, useState, useEffect } from 'react'
import '../Buses/Buses.css'
import add from '../img/add_3.svg'
import editSVG from '../svg/edit.svg'
import minusSVG from "../svg/minus.svg";
import Nav from '../Nav'
import Footbar from "../Footbar";
import { useNavigate } from "react-router";
import axios from 'axios';
import {toast}  from 'react-toastify';
import BusTable from './busTable';

export const getHeaderInfo = function () {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
    };
};
function Buses() {

    const tableColumns = [
        {heading: 'Bus Capacity'},
        {heading: 'Bus Fuel Type'},
        {heading: 'Bus Model Name'},
        {heading: 'Bus Plate no'},
        {heading: 'Bus Type'},
        {heading: 'College Code'},
    ]

    const navigate = useNavigate();
    // const busData = [
    //     {
    //         collegecode: "1",
    //         busplateno: "HR 76 A 9876",
    //         busFuelType: "Petrol",
    //         busCapacity: "45",
    //         busType: "Non-AC"
    //     },
    //     {
    //         collegecode: "2",
    //         busplateno: "HR 26 P 6903",
    //         busFuelType: "Diesel",
    //         busCapacity: "30",
    //         busType: "AC"
    //     }
    // ]

    const [popup, setPop] = useState(false);
    const handleClickToOpen = () => {
        setPop(!popup);
    }
    const handleClickToClose = () => {
        setPop(false);
    }
    const [bustype, setbusType] = useState('');
    const [busfueltype, setbusFuelType] = useState('');
    const [busplateno, setbusPlateNo] = useState('');
    const [buscapacity, setbusCapacity] = useState('');
    const [collegecode, setcollegecode] = useState('');
    const [busmodel, setbusModel] = useState('');

    const handleBusType = (e) => {
        setbusType(e.target.value);
    }
    const handleFuelType = (e) => {
        setbusFuelType(e.target.value);
    }
    const handlePlateNo = (e) => {
        setbusPlateNo(e.target.value);
    }
    const handleCapacity = (e) => {
        setbusCapacity(e.target.value);
    }
    const handleCollegeCode = (e) => {
        setcollegecode(e.target.value);
    }
    const handlebusModel = (e) => {
        setbusModel(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("bus_type", bustype);
        formdata.append("bus_fueltype", busfueltype);
        formdata.append("bus_plateno", busplateno);
        formdata.append("bus_capacity", buscapacity);
        formdata.append("college_code", collegecode);
        formdata.append("bus_modelname", busmodel);
        const header = getHeaderInfo();
        // axios.post("http://127.0.0.1:5000/bus", formdata, header).then(response => {
        //     console.log(response);
        // })
        //     .catch(error => {
        //         console.log(error.response.data);
        //     });
        fetch("http://127.0.0.1:5000/bus",{
            method: "POST",
            body: formdata,
            headers: {       
            'x-auth-token': localStorage.getItem('token') },
          })  
            .then(function (response) {
              //handle success
              console.log(response);
              if(response.status === 200){
                console.log("success")
                toast.success("Bus Added!!");
               }
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

    }

    var busData = [];
    // const cc = localStorage.getItem('collegeCode');
    const cc = "23567";
    const getRequest = async (e) => {
        console.log("cc: ", cc);
        const header = getHeaderInfo();
        await axios.get('http://127.0.0.1:5000/bus?college_code='+`${cc}`, 
            header, 
        )
            .then(res => {
                for(let i=0; i<res.data.length; i++){
                    // console.log("res", res.data[i][0]);
                    const temp = [];
                    temp.push(res.data[i][0].bus_capacity);
                    temp.push(res.data[i][0].bus_fueltype);
                    temp.push(res.data[i][0].bus_modelname);
                    temp.push(res.data[i][0].bus_plateno);
                    temp.push(res.data[i][0].bus_type);
                    temp.push(res.data[i][0].college_code);
                    busData[i] = temp;
                }
                console.log("bus data: ", busData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getRequest();
    }, []);

    return (
        <div>
            <Nav />
            <div>
                {popup ?
                    <dialog className="dialog-box1">
                        <h1 onClick={handleClickToClose}>X</h1>
                        <form onSubmit={(e) => { handleSubmit(e) }} >
                            <div className="div1">
                                <input
                                    type="numerical"
                                    name='collegecode'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='College Code'
                                    value={collegecode}
                                    onChange={(e) => { handleCollegeCode(e) }}
                                />
                                <input
                                    type="text"
                                    name='bus number'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Bus number'
                                    value={busplateno}
                                    onChange={(e) => { handlePlateNo(e) }}
                                />
                                <input
                                    type="text"
                                    name='bus fuel type'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Bus fuel type'
                                    value={busfueltype}
                                    onChange={(e) => { handleFuelType(e) }}
                                />
                                <input
                                    type="numerical"
                                    name='bus capacity'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Bus capacity'
                                    value={buscapacity}
                                    onChange={(e) => { handleCapacity(e) }}

                                />
                                <input
                                    type="text"
                                    name='Bus Type'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Bus type'
                                    value={bustype}
                                    onChange={(e) => { handleBusType(e) }}

                                />
                                <input
                                    type="text"
                                    name='Bus Type'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Bus Model'
                                    value={busmodel}
                                    onChange={(e) => { handlebusModel(e) }}

                                />
                            </div>
                            <button className='submit'>Submit</button>
                        </form>
                    </dialog> : ''}
            </div>
            <div className='containerbus'>
                <div className='containerbus1'>
                    <div className="bus-box1">
                        <div className="color-box1"></div>
                        <div className="text-box1">
                            <div></div>
                            <div className="add-box1" onClick={handleClickToOpen}>
                                <img
                                    className="add-logo1"
                                    src={add}
                                    alt="Add Logo"
                                />
                                <h1 className="add-text1">Add</h1>
                            </div>
                        </div>

                        <div className='table-box'>
                            <BusTable data={busData} column = {tableColumns}/>
                            <br></br> <br></br>
                            <button onClick={()=> navigate("/driver-details")}>Edit Driver details</button>
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>College Code</th>
                                        <th>Bus Number</th>
                                        <th>Bus Fuel Type</th>
                                        <th>Bus Capacity</th>
                                        <th>Bus Type</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {busData.map((e, key) => {
                                        return (

                                            <tr key={key} className="row-bor">
                                                <td>{e.collegecode}</td>
                                                <td>{e.busplateno}</td>
                                                <td>{e.busCapacity}</td>
                                                <td>{e.busType}</td>
                                                <td className='edit'>
                                                    <img
                                                        src={editSVG}
                                                        alt="Edit Logo"
                                                    />
                                                </td>
                                                <td classname="minus">
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

export default Buses;