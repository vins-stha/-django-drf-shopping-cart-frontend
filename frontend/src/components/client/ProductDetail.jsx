import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom/index'
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/actions";

export default function ProductDetail(props) {
    const {id} = useParams();
    const dispatch = useDispatch();

    const [productDetail, setPrdouctDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const baseUrl = 'http://localhost:8000/api/v1/';
    useEffect(() => {
        getProduct(id);
    }, []);

    const getProduct = (id) => {
        let searchUrl = baseUrl + `all-products/${id}/`;
        console.log('url', searchUrl);
        fetch(searchUrl)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setPrdouctDetail(json);
                setIsLoading(false);
            })
    };

    // add to cart
    const handleAddtoCart = (product) => {
        dispatch(addToCart(product));
        alert('Added!');
    };
    const SingleProduct = () => {
        return (
            <>
                <div className="d-flex">
                    <img src={`http://localhost:8000${productDetail.product_image}`}className=" prod-detail-image card-img-top" alt="" height="250px"
                         border="1px solid black"/>
                    <div className="details flex-column">
                        <h4 className="text-uppercase text-black-50">{productDetail.category}</h4>
                        <h1 className='display-5'>{productDetail.title}</h1>
                        <h3>Price : $ {productDetail.price}</h3>
                        <p className='lead'> Description: {productDetail.description}</p>
                        <h6>Colors : {productDetail.colors}</h6>
                        <h6>Available Quantity : {productDetail.available} </h6>
                        <h6>Barcode : <strong>{productDetail.barcode} </strong></h6>

                        <div className="prod-buttons buttons d-flex">
                            <a className="btn btn-outline-dark "
                               href="/buy" onClick={e => {
                                e.preventDefault();
                                alert('This feature is not available yet')
                            }}>
                                <i className="fas fa-cart-plus m-r-1"/>Buy now</a>

                            <a className="btn  btn-outline-dark"
                               onClick={(e) => {
                                   e.preventDefault();
                                   handleAddtoCart(productDetail)
                               }
                               }
                            >
                                <i className="fa fa-shopping-cart m-r-1"/>Add to Cart</a>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    const Loading = () => {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    };
    return (
        <div>
            <div className="container justify-content-center position-relative mt-5 p-b-7" height="auto">

                {isLoading ? <Loading/> : <SingleProduct/>}

            </div>

        </div>
    )
}
