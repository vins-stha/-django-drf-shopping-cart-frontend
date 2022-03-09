import React, {useState, useEffect} from 'react';
import {AdminNavbar} from './AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";


export async function HandleAdminRequests(params) {
    setTimeout(async()=>{
        let token = false;
        console.log('params', params, params.type)
        const BASE_URL = "http://localhost:8000/api/v1/";

        let url;
        if (params && params.type === "products")
            url = "products/";
        if (params && params.type === "categories")
            url = "categories/";
        if (params && params.pk !== undefined)
            url = `category/${params.pk}`
        console.log('URL', BASE_URL+url)
        try {
            // if (!token)
            params.access_token = await get_access_token(params.refresh_token);

            let result = fetch(BASE_URL + url, {
                'method': params.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: JSON.stringify({name:params.body})
            });

            let response = result.json();
            console.log('Final Result =>', response);

        } catch (error) {
            console.log('Something went wrong', error);
        }

    },0)

    const get_access_token = async (token) => {
        console.log('REFRESH TOKEN ',token)
        // let formData = new FormData();
        // formData.append('refresh',params.refresh_token);
        const data = JSON.stringify({refresh :token})
        console.log(' DATA',data)
        try {
            let result = await fetch("http://localhost:8000/api/v1/token/refresh/", {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${tokens.refresh_token ? tokens.refresh_token : '' }`
                },
                body: data//JSON.stringify(data)
            });
            console.log('tRESILT ===',result)
            let response = await result.json();
            console.log('tokenreceive=',response)
            return response.access

        } catch (e) {
            console.log('Error while refresh token ....', e)

        }
    };
    return (
        <>

        </>


    )


};