import React from 'react'
import {useAuth} from "../services/Auth";
import {AdminNavbar} from "../admin_layout/AdminNavbar";
import {Navbar} from "./Navbar";

export const Home = () => {
    const auth = useAuth();
    console.log('widnwo.location', window.location.pathname)
    return (
        <>
            <div className="hero bg-dark text-white">
                <img src="/assets/images/hero.jpg" className="card-img hero-img cover " alt="" />
                <div className='hero-text card-img-overlay'>
                    <p className='heading1 display-3 center text-black'>NEW ARRIVALS</p>
                    <p className='display-6 center text-black'>Checkout Now!!!!</p>
                </div>
            </div>
            <Navbar></Navbar>
            {/*{auth.userLoggedIn || window.location.pathname !== "/admin/login" ? <AdminNavbar/> : <Navbar/>}*/}
        </>


    )
}
