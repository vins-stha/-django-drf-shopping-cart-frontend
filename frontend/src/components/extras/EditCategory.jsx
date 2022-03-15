import React, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from '../admin_dashboard/HandleAdminRequests'
import {AdminNavbar} from "../admin_layout/AdminNavbar";
import {useParams} from "react-router/index";
import {AdminSidebar} from "../admin_layout/AdminSidebar";

export const EditCategory = ({handleClickAction}) => {

    const [cookies] = useCookies();
    const [categoryName, setCategoryName] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const {id} = useParams();

    useEffect(async () => {
console.log('refresh token inside edit cat', cookies.refresh_token)
        if (id !== undefined) {
            try {
                let result = await HandleAdminRequests({
                    type: "category",
                    body: "",
                    method: "get",
                    pk: id,
                    access_token: cookies.access_token,
                    refresh_token: cookies.refresh_token
                });

                result !== undefined ? await setCategoryData(result) : setCategoryData([]);

            } catch (e) {
                console.log('Something went wrong while fetching category data!', e)
            }
        }
    }, []);
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "category",
            body: {name: categoryName},
            pk:id,
            method: "put",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });

        if (result.status === 200) {
            alert('Data updated');
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

                        <h3 className={'form-title'}> Edit Category</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit(e)
                        }}>
                            <label htmlFor="Category" className={'label'}>Category name : <i>{categoryData.name}</i></label>
                            <input type="text" name={"category"} className={'form-inputbox'}
                                   // value={categoryData.name}
                                   onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <button type={"submit"} className="btn btn-primary submit"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleFormSubmit(e)
                                    }}> Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};