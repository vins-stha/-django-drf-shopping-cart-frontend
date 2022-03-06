import {
    FETCH_ALL_PRODUCTS,
    FETCH_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DELETE_CART,
    REMOVE_ITEM_FROM_CART,
    LOGIN_ACTION,
    LOGOUT_ACTION


} from "./actions";

const initialState = {
    products: [],
    productsInCart: [],
    cartState: {
        productsInCart: [],
        cart: []

    },

    cartItems: [],
    totalItem: 0,
    admin: [],
    user: [],
    searchResults: [],
    isSearch: false

};

const allReducer = (state = initialState, action) => {
    console.log('aciton', action.type);

    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                isSearch: false
            };
        case SEARCH_PRODUCT:
            // let items =  state.products && state.products.filter(prod => prod.id === action.payload.id);
            return {
                ...state,
                searchResults: action.payload,
                isSearch: true
            };
        case ADD_TO_CART:
            const product = action.payload;

            const itemInCart = state.cartItems.length > 0 && state.cartItems.find(item => item.product.id === product.id);

            const itemExists = itemInCart !== undefined && itemInCart ? true : false;

            return {
                ...state,
                cartItems: !itemExists ?
                    [...state.cartItems,
                        {
                            product,
                            item_qty: 1
                        }
                    ] :
                    state.cartItems.map(item => item.product.id === product.id ?
                        {
                            ...item,
                            item_qty: item.item_qty + 1
                        } : item
                    )

            };

        case REMOVE_FROM_CART:
            const prod = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.product.id === prod.id ?
                        {
                            ...item,
                            item_qty : item.item_qty > 1 ? item.item_qty - 1 : 1
                        }:item
                )


            };
        case DELETE_CART:
            return {
                ...state,
                cartItems: []
            };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item =>item.product.id !== action.payload.id
                    // console.log('XXX=>',item,
                    //         'itemproduct=', item.product.id ,
                    //         'pyaloadid',action.payload.id,
                    //         '===?',item.product.id === action.payload.id
                    // )
                    // item.product.id !== action.payload.id ? {
                    // ...item
                    // }:''

                )
            };
        case LOGOUT_ACTION:
            return {
                state
            };
        case LOGIN_ACTION:
            return {
                state
            };
        default:
            return state


    }
    return state;
};


export default allReducer