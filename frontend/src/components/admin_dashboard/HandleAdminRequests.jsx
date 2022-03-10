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
            console.log('Refresh response', result);
            return response.access

        } catch (e) {
            console.log('Error while refresh token ....', e)

        }
    };

    const BASE_URL = "http://localhost:8000/api/v1/";

    let url;
    if (params && params.type === "products")
        url = "products/";
    if (params && params.type === "categories")
        url = "categories/";
    if (params && params.pk !== undefined && params.type === "category")
        url = `category/${params.pk}`;
    console.log('URL', url)

    try {
        params.access_token = await get_access_token(params.refresh_token);

        let result = await fetch(BASE_URL + url, {
            'method': params.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${params.access_token}`
            },
            body: JSON.stringify(params.body)
        });
        console.log('RESUKT', result)
        let response = await result.json();
        console.log('rESPONSE', response)
        return result
    } catch (error) {
        console.log('Something went wrong', error);
    }
};