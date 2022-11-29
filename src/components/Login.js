import React, { useState } from "react";
import './css/Login.css';
import axios from 'axios';
import githubLogo from '../components/img/gitLogo.jpg';
import googleLogo from '../components/img/gogLogo.jpg';
import { toast } from 'react-toastify';
import Nav from "./Nav";
import Footbar from "./Footbar";
import { useNavigate } from "react-router";
import { BrowserRouter as  Route, Link } from "react-router-dom";
import Home from "./HomeD/Home";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token , settoken] = useState(localStorage.getItem(localStorage.getItem("token")|| false));
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = async e => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);
        const response = await axios.post("http://127.0.0.1:5000/login", formdata);
        if (response.status == 200) {
            toast.success("Succesfully Login!!");
            console.log(response.data);
            navigate('/');
            localStorage.setItem('token', response.data["auth-token"]);
            console.log(localStorage.getItem('token'));
        }

    }

    const token_value = localStorage.getItem('token');
    console.log(token_value);

    return (
        <form onSubmit={submitHandler}>
            <Nav></Nav>
            <div className="main">
                <div className="sub">
                    <div className="firstbox">
                        <div className="col"></div>
                        <div className="heading">
                            <h1>LOG IN</h1>
                        </div>

                        <div className="login">
                            <div className="alter">
                                <img src={githubLogo} className="logo2" alt=""></img>
                                <h2 className="para">LOG IN WITH GITHUB</h2>
                            </div>
                            <div className="alt1">
                                <a className="alt">OR</a>
                            </div>
                            <div className="alter2">
                                <img src={googleLogo} className="logo2" alt=""></img>
                                <h3 className="para2">LOG IN WITH GOOGLE</h3>
                            </div>
                            <div className="inputdiv">
                                <input type="text" placeholder="Username or E-Mail" className="inputbox" id="name" value={email} required onChange={(e) => { handleEmailChange(e) }} />
                            </div>
                            <div className="inputdiv">
                                <input type="text" placeholder="Password" className="inputbox" id="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} />
                            </div>
                            <div className="btn">
                                <button>LOG IN</button>
                            </div>
                            <div className="ref">
                                <a className="text">Forget Password?</a>
                                {/* <a className="text">Sign Up</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footbar></Footbar>
        </form>
    )
}
export default Login;