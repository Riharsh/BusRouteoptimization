import React from "react";
import avatar from "./svg/avatar.svg";
import "./css/Nav.css"
import { useNavigate } from "react-router";
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import CodeIcon from '@rsuite/icons/Code';
import PageIcon from '@rsuite/icons/Page';
import DetailIcon from '@rsuite/icons/Detail';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import AdminIcon from '@rsuite/icons/Admin';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SearchIcon from '@rsuite/icons/Search';

function Nav(){
    const navigate = useNavigate();
    return(
        <header className="nav">
            <div className="logo">
                <h1 className="logo-name">Optimized Route Service</h1>
            </div>
            <div className="service-name">
                <a onClick={() => navigate("/")}>Home</a>
                <a onClick={() => navigate("/user-services")}>Services</a>
                <a>
                    {/* <img
                        className="nav__avatar"
                        src={avatar}
                        alt = "Avatar logo"
                    /> */}
                    <Dropdown title="" icon={<AdminIcon/>}>
                        <Dropdown.Item onClick={() => navigate("/login")}>
                            Login
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/signup")}>
                            Signup
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {localStorage.removeItem('token'); navigate("/login")}}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown>
                </a>
            </div>
        </header>
    )
}

export default Nav;