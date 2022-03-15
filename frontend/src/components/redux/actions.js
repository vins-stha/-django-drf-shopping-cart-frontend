
export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const FETCH_PRODUCT_DETAIL = "FETCH_PRODUCT_DETAIL";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_CART = "DELETE_CART";
export const LOGIN_ACTION = "LOGIN_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";


export const baseUrl = "http://localhost:8000/api/v1/";

export const fetchAll = (data) => {
    return {
        type: FETCH_ALL_PRODUCTS,
        payload: data
    }
};

export const fetchSingleProduct = (data) => {
    return {
        type: FETCH_PRODUCT_DETAIL,
        payload: data
    }
};

export const searchProduct = (data) => {
    console.log('data',data)
    return {
        type: SEARCH_PRODUCT,
        payload: data
    }
};

export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
};

export const removeFromCart = (data) => {
    return {
        type: REMOVE_FROM_CART,
        payload: data
    }
};

export const removeItemFromCart = (data) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: data
    }
};


export const emptyCart = (data) => {
    return {
        type: DELETE_CART,
        payload: data
    }
};

export const fetchActions = (searchTerm, pk) => {
    // console.log('search=', searchTerm, 'product_id', pk);
    return async (dispatch, getState) => {

        let url;
        if (pk) {
            url = `${baseUrl}all-products/${pk}`;
        } else if (searchTerm) {
            url = `${baseUrl}all-products/?search=${searchTerm}`;
        } else {
            url = `${baseUrl}all-products/`;
        }
        console.log('final ulr', url)
        try {
            const response = await fetch(url);
            const results = await response.json();
            console.log('restuls=',results)
            if (pk) {
                dispatch(fetchSingleProduct(results));
            } else
            if (searchTerm) {
                console.log('search payload', results);
                dispatch(searchProduct(results));
            }
            else {
                dispatch(fetchAll(results));
            }

        } catch (error) {
            console.log( error);
        }

    }
};
/************admin actions *******************************/
export const categoriesAction = (fetchall=true, type="",pk="") => {
    return async (dispatch, getState) => {
       var url;
        if (fetchall)
            url = `${baseUrl}categories/`;
       let result = await fetch(url);
       let results = await result.json();

       dispatch(categoriesList(results))

    }
};

export const categoriesList = (data) => {
    return {
        type: FETCH_CATEGORIES,
        payload: data
    }
};


