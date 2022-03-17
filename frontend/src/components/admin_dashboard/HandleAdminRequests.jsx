import React from 'react';

export async function HandleAdminRequests(params) {

    const get_access_token = async (token) => {
        try {
            let result = await fetch("http://localhost:8000/api/v1/token/refresh/", {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({refresh: token})
            });

            let response = await result.json();
            // console.log('Refresh response', result);
            return response.access

        } catch (e) {
            console.log('Error while refresh token ....', e)

        }
    };

    const BASE_URL = "http://localhost:8000/api/v1/";

    let url;
    let product_create_edit = false;
    if (params && params.type === "products" && (params.pk !== undefined || params.pk !== null) && params.method === "put") {
        url = `products/${params.pk}/`;
        product_create_edit = true;
    }
    if (params && params.type === "products" && params.pk !== undefined && (params.method === "delete" || params.method === "get")) {
        url = `products/${params.pk}/`;
        product_create_edit = false;
    }
    if (params && params.type === "products" && (params.pk === undefined || params.pk === null) && params.method === "post") {
        url = "products/";
        product_create_edit = true;
    }
    if (params && params.type === "products" && params.pk !== undefined)
        url = `products/${params.pk}/`;
    if (params && params.type === "categories")
        url = "categories/";
    if (params && params.pk !== undefined && params.type === "category")
        url = `category/${params.pk}/`;

    try {
        params.access_token = await get_access_token(params.refresh_token);
        // console.log('NOW FETCHIND DATA frome', BASE_URL + url, "params=", params.body)
        let result;
        if (product_create_edit) {
            result = await fetch(BASE_URL + url, {
                'method': params.method,

                headers: {'Authorization': `Bearer ${params.access_token}`},

                body: params.body
            });
        } else {
            result = await fetch(BASE_URL + url, {
                'method': params.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${params.access_token}`
                },
                body: params.method !== "get" ? JSON.stringify(params.body) : null
            });
        }

        // console.log('RESUKT of fetch=>', result)
        if (params.method === "get" || params.method === "post") {
            let response = await result.json();

            // console.log('rESPONSE', response);
            return response
        }
        let results = {
            code: result.status,
            message: result.statusText
        };
        return results

    } catch (error) {
        console.log('Something went wrong', error);
    }
};