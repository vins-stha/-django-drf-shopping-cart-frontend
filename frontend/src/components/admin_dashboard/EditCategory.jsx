import React, {useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests'

export const EditCategory = ({handleClickAction}) => {

    const [cookies, setCookie, getCookie] = useCookies();
    const [categoryName, setCategoryName] = useState();


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "categories",
            body: {name: categoryName},
            method: "put",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });
        if (result.status === 201) {
            alert('New category added');
            window.location = "/admin/dashboard/";
        } else
            alert('Error occured!', result.statusText);

        try {
        } catch (e) {
            console.log('Something went wrong!', e)
        }
    };

    return (
        <>
            <div className="actions-forms admin-forms">
                <div className="input-form">
                    <h3 className={'form-title'}>Edit Category</h3>
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
        </>
    )
};