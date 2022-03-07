import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchActions, addToCart} from "./redux/actions";


export default function Products() {

    // const [products, setProducts] = useState([])
    // const [filteredData, setFilteredData] = useState([])
    // const [loading, setLoading] = useState(true);
    // const [productId, setProductId] = useState(null)
    // const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    // fetch products on load
    useEffect(async() => {

          dispatch(fetchActions());

    }, []);
    const stateProducts =  useSelector(state => state.isSearch ? state.searchResults :  state.products);
    console.log('current state', stateProducts);

    // dispatch addto cart on click
    const handleAddtoCart = (product) => {
       dispatch(addToCart(product));

    };

    return (
        <>
            <div className="product-contents clearfix">
                <div className="product-nav  d-flex justify-content-center py-1" >
                    <a className="btn btn-outline-dark m-r-1">
                        <i className="far fa-gem m-r-1"></i>
                        Mobiles
                    </a>
                    <a className="btn btn-outline-dark m-r-1">
                        <i className="fas fa-tshirt"></i>
                        Laptops
                    </a>
                    <a className="btn btn-outline-dark m-r-1" href="products/category/jewelery">
                        <i className="fas fa-tshirt"></i>
                        Women's Clothing
                    </a>
                    <a className="btn btn-outline-dark m-r-1" href="products/category/jewelery">
                        <i className="fas fa-laptop-house"></i>
                        Electronics
                    </a>

                    <a className="btn btn-outline-dark m-r-1" href="products/category/jewelery">
                        <i className="fa fa-shopping-cart m-r-1"></i>
                        All
                    </a>


                </div>
                <div className="product-lists container d-flex">
                    {stateProducts && stateProducts.map((product, id) => {
                        return (
                            <div key={product.id} className="card product-card center">
                                <Link to={`product/${product.id}`}

                                      key={product.id} >
                                    <img className="card-img-top prod-image contain" src={product.product_image} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text small">{(product.title).length < 35 ? (product.title) : (product.title).substring(0, 32) + "..."}</p>
                                        <div className="card-text small">Price : ${product.price}</div>
                                    </div>
                                </Link>
                                <a className="btn btn-primary block"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       handleAddtoCart(product)
                                   }
                                   }
                                >Add to Cart</a>
                            </div>
                        )
                    })}
                </div>

            </div>

        </>

    )
}
