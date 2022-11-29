import React, {useState} from "react";
import { useNavigate } from "react-router";
import Footbar from "./Footbar";
import Nav from "./Nav";
import axios from 'axios';
import "./css/Signup.css";
import {toast}  from 'react-toastify';

function Signup(){
    const navigate = useNavigate();
    const [firstName , setfirstName] = useState('');
    const [lastName , setlastName] = useState('');
    const[ userName , setuserName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [phoneno , setPhoneNo] = useState('');

    const handleFirstChange =(e)=>{
        setfirstName(e.target.value);
      }
    const handleLastChange =(e)=>{
        setlastName(e.target.value);
      }
   const handleUserChange =(e)=>{
        setuserName(e.target.value);
      }

    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
      }
      
      const handlePasswordChange =(e)=>{
        setPassword(e.target.value);
      }
       
      const handleConfirmPasswordChange =(e)=>{
        setConfirmPassword(e.target.value);
      }

      const handlePhoneNoChange = (e) =>{
        setPhoneNo(e.target.value);
      }

      const handleSubmit= async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
        {   
          toast.error("Password doesn't match!!");
        }
        else{
          e.preventDefault();
          let formdata = new FormData();    //formdata object
          formdata.append("fname", firstName); 
          formdata.append("lname", lastName);  
          formdata.append("contact_number", phoneno); 
          formdata.append("email", email); 
          formdata.append("user_name", userName);
          formdata.append("password", password);
          const response = await axios.post("http://127.0.0.1:5000/signup", formdata)
          console.log(response);
            if(response.status === 201){
             console.log("success")
             navigate('/login')
             toast.success("Account Created!!");
            }
        }
      }
    return(
        <div>
        <Nav/>
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className="main-box1">
                <h1 className="signup-text">SIGN UP</h1>
                <div className="input-box1">
                    <div className="input-names">
                        <input className="input-text" id="firstName" placeholder="First Name*" autoComplete='off'  value={firstName} required onChange={(e)=> {handleFirstChange(e)}}/>
                        <input className="input-text" id="lastName" placeholder="Last Name*" autoComplete='off'  value={lastName} required onChange={(e)=> {handleLastChange(e)}}/>
                    </div>
                    <div className="input-username">
                        <input className="input-text1" id="userName" autoComplete='off' placeholder="User Name*" value={userName} required onChange={(e)=> {handleUserChange(e)}}/>
                    </div>
                    <div className="email-box">
                        <input  type="email" id="email" className="input-email" placeholder="Enter Email*" autoComplete='off' value={email} required onChange={(e) => {handleEmailChange(e)}}/>
                    </div>
                    <div className="password-box">
                        <input type="password" id="password" className="input-password" placeholder="Create Password*" autoComplete='off' value={password} required onChange={(e) => {handlePasswordChange(e)}} />
                    </div>
                    <div className="confirm-box">
                        <input type="password" id="confirmPassword" className="input-confirm" placeholder="Confirm Password*" autoComplete='off' value={confirmPassword} required onChange={(e) => {handleConfirmPasswordChange(e)}}/>
                    </div>
                    <div className="phone-box">
                        <input type="numerical" id="phoneNumber" className="input-phone" autoComplete='off'  placeholder="Enter Mobile Number" value={phoneno} required onChange={(e) => {handlePhoneNoChange(e)}}/>
                    </div>
                    {/* <div className="div-checkbox">
                        <input type="checkbox" className="text-checkbox"/>
                        <h1 className="term-text">By signing up, you agree to Photo’s <span className="span-1">Terms of Service</span> and <span className="span-1">Privacy Policy</span></h1>
                    </div> */}
                </div>
                <div>
                    
                </div>
                <button id="registerButton" className="register-button" >Register</button>
                {/* onClick={()=>navigate("/")} */}
            </div>
        </form>
        <Footbar/>
        </div>

    )
}

export default Signup;