import React, { useState, useEffect } from 'react'
import '../components/css/Driver.css'
import { nanoid } from 'nanoid';
import add from '../components/img/add_3.svg'
import Nav from './Nav';
import Footbar from './Footbar';
import editSVG from "../components/svg/edit.svg";
import minusSVG from "../components/svg/minus.svg";
import axios from 'axios';
import DriverTable from './driverTable';
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

function Driver() {
  var driverData = [];

  const tableColumns = [
    { heading: 'College Code' },
    { heading: 'Driver Contact No' },
    { heading: 'Driver Email' },
    { heading: 'First name' },
    { heading: 'Last name' },
    { heading: 'Username' },
  ]

  // const driverData = [
  //     {
  //         driverId: "1",
  //         driverName: "DriverXYZ",
  //         driverNumber: "9876543210"
  //     },
  //     {
  //         driverId: "2",
  //         driverName: "DriverABC",
  //         driverNumber: "9867543120"
  //     }
  // ]

  const [driver, setDriver] = useState(driverData);
  const [addData, setAddData] = useState({
    driverId: '',
    driverName: '',
    driverNumber: '',
  });

  useEffect(() => {
      getRequest();
    }, []);

  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userName, setuserName] = useState('');
  const [contactnumber, setcontactnumber] = useState('');
  const [email, setEmail] = useState('');
  const [collegecode, setcollegecode] = useState('');

  const handleFirstChange = (e) => {
    setfirstName(e.target.value);
  }
  const handleLastChange = (e) => {
    setlastName(e.target.value);
  }
  const handleUserChange = (e) => {
    setuserName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleContactChange = (e) => {
    setcontactnumber(e.target.value);
  }
  const handleCollegeCode = (e) => {
    setcollegecode(e.target.value);
}

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  }

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newDriver = {
      id: nanoid(),
      driverId: addData.driverId,
      driverName: addData.driverName,
      driverNumber: addData.driverNumber,
    };

    const newDrivers = [...driver, newDriver];
    setDriver(newDrivers);
  };

  const [popup, setPop] = useState(false);
  const handleClickToOpen = () => {
    setPop(!popup);
  }
  const handleClickToClose = () => {
    setPop(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(collegelocation);
    let formdata = new FormData();
    formdata.append("firstname", firstName);
    formdata.append("lastname", lastName);
    formdata.append("username", userName);
    formdata.append("contactnumber", contactnumber);
    formdata.append("email", email);
    formdata.append("college_code", collegecode);
    const header = getHeaderInfo();
    // axios.post("http://127.0.0.1:5000/college", formdata, header).then(response => {
    //     console.log(response);
    // })
    //     .catch(error => {
    //         console.log(error.response.data);
    //     });
    fetch("http://127.0.0.1:5000/driver", {
      method: "POST",
      body: formdata,
      headers: {
        'x-auth-token': localStorage.getItem('token')
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.status === 201) {
          console.log("success")
          toast.success(" Driver Added!!");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      getRequest();
    }

    const cc = "23567"; 
    const getRequest = async (e) => {
      console.log("cc: ", cc);
      const header = getHeaderInfo();
      await axios.get('http://127.0.0.1:5000/driver?college_code=' + `${cc}`,
        header,
      )
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            console.log("res: ", res.data[i][0]);
            const temp = [];
            temp.push(res.data[i][0].college_code);
            temp.push(res.data[i][0].driver_contactnumber);
            temp.push(res.data[i][0].driver_email);
            temp.push(res.data[i][0].driver_firstname);
            temp.push(res.data[i][0].driver_lastname);
            temp.push(res.data[i][0].driver_username);
            driverData[i] = temp;
          }
          console.log("driver data: ", driverData);
        })
        .catch(error => {
          console.log(error);
        });
    }

    return (
      <div>
        <Nav />
        <div>
          {popup ?
            <dialog className="dialog-box">
              <h1 onClick={handleClickToClose}>X</h1>
              <form onSubmit={(e) => { handleSubmit(e) }} >
                            <div className="div1">
                                <input
                                    type="text"
                                    name='firstname'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => { handleFirstChange(e) }}
                                />
                                <input
                                    type="text"
                                    name='lastname'
                                    autoComplete='off'
                                    required='required'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => {handleLastChange(e)}}
                                />
                                <input
                                    type="text"
                                    name='username'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Username'
                                    value={userName}
                                    onChange={(e) => { handleUserChange(e) }}
                                />
                                <input
                                    type="numerical"
                                    name='çontactnumber'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='Contact Number'
                                    value={contactnumber}
                                    onChange={(e) => { handleContactChange(e) }}

                                />
                                <input
                                    type="email"
                                    name='email'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='email'
                                    value={email}
                                    onChange={(e) => { handleEmailChange(e) }}

                                />
                                <input
                                    type="numerical"
                                    name='college_code'
                                    required='required'
                                    autoComplete='off'
                                    placeholder='College Code'
                                    value={collegecode}
                                    onChange={(e) => { handleCollegeCode(e) }}

                                />
                            </div>
                            <button className='submit'>Submit</button>
                        </form>
             </dialog> : ''}
        </div>
        <div className='container'>
          <div className='container1'>
            <div className="bus-box">
              <div className="color-box"></div>
              <div className="text-box">
                <div></div>
                <div className="add-box" onClick={handleClickToOpen}>
                  <img
                    className="add-logo"
                    src={add}
                    alt="Add Logo"
                  />
                  <h1 className="add-text">Add</h1>
                </div>
              </div>

              <div className='table-box'>
                <DriverTable data={driverData} column={tableColumns} />
                {/* <table>
                                <thead>
                                    <tr>
                                        <th>Driver Id</th>
                                        <th>Driver Name</th>
                                        <th>Driver Number</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driver.map((e, key) => {
                                        return (
                                            <tr key={key} className="row-bor">
                                                <td>{e.driverId}</td>
                                                <td>{e.driverName}</td>
                                                <td>{e.driverNumber}</td>
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
  export default Driver;