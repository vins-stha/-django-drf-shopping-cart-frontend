import React from 'react';
import {AdminNavbar} from './AdminNavbar';
import {AdminSidebar} from "./AdminSidebar";


export const Dashboard = () => {

    return (
        <>
            <AdminNavbar/>
            <div className="dashboard-container">
                <AdminSidebar/>

            </div>
        </>
    )
};