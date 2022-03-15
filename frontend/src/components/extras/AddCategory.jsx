import React, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from '../admin_dashboard/HandleAdminRequests'
import {AdminNavbar} from "../admin_layout/AdminNavbar";
import {AdminSidebar} from "../admin_layout/AdminSidebar";

export const AddCategory = ({handleClickAction, id}) => {

    const [cookies, setCookie, getCookie] = useCookies();
    const [categoryName, setCategoryName] = useState();

    // useEffect(async () => {
    //
    //     id !== undefined ? setIsFetch(true) : setIsFetch(false);
    //     if (isFetch) {
    //         try {
    //             let result = await HandleAdminRequests({
    //                 type: "category",
    //                 body: "",
    //                 method: "get",
    //                 pk: id,
    //                 access_token: cookies.access_token,
    //                 refresh_token: cookies.refresh_token
    //             });
    //             result !== undefined ? await setCategoryData(result) : setCategoryData([]);
    //
    //         } catch (e) {
    //             console.log('Something went wrong while fetching category data!', e)
    //         }
    //     }
    // }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "categories",
            body: {name: categoryName},
            method: "post",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });
        if (result.status === 201) {
            alert('New category added');
            window.location = "/admin/categories/";
        } else
            alert('Error occured!', result.statusText);
    };

    return (
        <>
            <AdminNavbar/>
            <div className="dashboard-container">
                <AdminSidebar handleClickAction={handleClickAction}/>
                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Add Category</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit(e)
                        }}>
                            <label htmlFor="Category" className={'label'}>Category name : </label>
                            <input type="text" name={"category"} className={'form-inputbox'}
                                   onChange={e => setCategoryName(e.target.value)}/>
                            <button type={"submit"} className="btn btn-primary submit"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleFormSubmit(e)
                                    }}> Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};