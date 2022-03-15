import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import {Link} from "react-router-dom";

import '../styles/styles.css'

export const Header = (isLoggedIn) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [isAuthorized, setIsAuthorized] = useState(cookies.auth_token && cookies.isAuthorized ? true : false)

    const navigate = useNavigate();

    useEffect(() => {

    }, [isAuthorized,isLoggedIn,cookies]);

    const handleLogout = () => {
        if (window.confirm("Are you sure ?")) {
            removeCookie(['auth_token']);
            removeCookie(['isAuthorized']);
            setIsAuthorized(false);
            navigate("/");
        }
    };

    return (
        <>
            <section className="header">
                <h1>Admin Dashboard</h1>
                <div className="header__logo" aria-label="logo" role="banner">
                </div>
                <div id="nav-menus" className="header__navMenus" role="navigation" aria-label="nav menus">
                    <a href="/" aria-label="Tasks">Tasks</a>
                    {!isAuthorized ?
                        (<>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" onClick={e => {
                                e.preventDefault();
                                navigate('/signup', {state:'new_user'})
                            }}>Create User</Link>
                        </>)
                        :
                        (<>
                            <Link to="/logout" onClick={e => {
                                e.preventDefault();
                                handleLogout()
                            }}>Logout</Link>
                            <Link to="/add-new-task" onClick={e => {
                                e.preventDefault();
                                navigate('/task')
                            }}>Add new task</Link>
                        </>)
                    }

                </div>
            </section>


        </>
    )
};