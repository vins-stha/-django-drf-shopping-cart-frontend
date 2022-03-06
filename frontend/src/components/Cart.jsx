import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, emptyCart, addToCart, removeItemFromCart} from "./redux/actions";


export const Cart = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    var total = 0;
    const handleChangeItem = (val, item) => {

        if (val === "+") {
            dispatch(addToCart(item));
        } else if (val === "-") {
            dispatch(removeFromCart(item));
        } else if (val === "remove") {
            dispatch(removeItemFromCart(item));
        } else {
            dispatch(emptyCart());
        }

    };
    var cart_Total = 0;
    const CartItems = () => state.cartItems.length > 0 && state.cartItems.map(item => {
        console.log('items=>', item.product.id, item.item_qty)
        return (
            <>
                <div key={item.product.id} className="cart-card d-flex border">
                    <Link to={`/product/${item.product.id}`}>
                        <img className="cart-card__img" src="" alt=""/>
                    </Link>

                    <div className="cart-item-detail">
                        <h5 className='display-7'>{item.product.title}</h5>

                        {/*quantity and price*/}
                        <div className="qty_amount d-flex">

                            <div className="btn border" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("-", item.product)
                            }}>-
                            </div>
                            <div type="number" min="1" className='item-qty border'> {item.item_qty}</div>
                            <div className="btn border m-r-1" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("+", item.product)
                            }}>+
                            </div>

                            <h6 className='lead display-7'>Price : $ {item.product.price * item.item_qty}</h6>

                        </div>
                        {/*quantity and price end */}

                        <div className="prod-buttons buttons d-flex">
                            <Link className="btn btn-outline-dark "
                                  to={`/product/${item.product.id}`}>
                                <i className="fas fa-cart-plus m-r-1"/> details
                            </Link>
                            <a className="btn btn-outline-dark" onClick={(e) => {
                                e.preventDefault();
                                handleChangeItem("remove", item.product)
                            }}>
                                <i className="fa fa-shopping-cart m-r-1"/>Remove
                            </a>
                        </div>
                    </div>

                </div>
            </>
        )
    });


    if (state.cartItems.length > 0)
        state.cartItems.forEach(item => {
            cart_Total += (item.product.price * item.item_qty)
        });

    return (
        <div className='border p-3 center'>
            <h1 className='center'>Your Cart Items</h1>
            {state.cartItems.length > 0 && <div className="btn btn-outline-primary" onClick={e => {
                e.preventDefault();
                handleChangeItem('delete_cart')
            }}> Delete cart</div>}

            {state.cartItems.length > 0 ? (
                <>
                    <div className="container d-flex flex-column">
                        <CartItems/>
                        <div className="cart-footer d-flex justify-content-center">
                            <div className="cart-total border-bottom display-6 bold  m-r-3"> Cart Total :
                                ${cart_Total.toFixed(2)}</div>
                            <div className=" btn btn-danger  btn-danger-outline m-l-1 p-2" onClick={e => {
                                e.preventDefault();
                                handleChangeItem("EMPTY_CART")
                            }}><h6>Clear up!</h6></div>
                        </div>
                    </div>
                </>
            ) : (<img className=" img-fluid mt-5 center" src="/assets/images/empty_cart.png"></img>)}
        </div>
    )
};
