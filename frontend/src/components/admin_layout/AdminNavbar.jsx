import React, {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom/index'
import {useCookies} from "react-cookie"
import {useAuth} from "../services/Auth";


export const AdminNavbar = () => {
    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout =  (e) => {
        e.preventDefault();
        removeCookies('access_token','');
        removeCookies('refresh_token','');
        removeCookies('is_admin','');

        navigate('/admin/login');
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark p-2">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Client-Home <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/admin/dashboard" className="nav-link">Dashboard <span className="sr-only"></span></Link>
                    </li>

                </ul>
                <div className="buttons ml-10">
                    <a  className="btn btn-outline-light" onClick={e=>handleLogout(e)}>
                        <i className="fa fa-sign-in m-r-1"/>
                        Logout
                    </a>
                </div>
            </div>
        </nav>
        </>
    )
};
