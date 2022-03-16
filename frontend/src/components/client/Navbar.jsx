import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom/index'
import {useDispatch, useSelector} from "react-redux";
import {fetchActions} from "../redux/actions";
import {useAuth} from "../services/Auth";
import {useCookies} from "react-cookie";

export const Navbar = (props) => {
    const auth = useAuth();
    let qty = 0;
    const [searchText, setSearchText] = useState();
    const dispatch = useDispatch();

    const [totalItemsInCart, setTotalItemsInCart] = useState(0)
    const state = useSelector((state) => state);

    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        removeCookies('access_token');
        removeCookies('refresh_token');
        removeCookies('is_admin');

        auth.loggedOut();
        navigate('/admin/login');
    };

    useEffect(() => {

        if (state.cartItems.length > 0)
            state.cartItems.forEach(item => {
                qty += item.item_qty

            });
        setTotalItemsInCart(qty)

    }, [state,auth]);

    useEffect(async () => {

        dispatch(fetchActions());

    }, [searchText]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(fetchActions(searchText));
    };
    const isLoggedIn = auth.userLoggedIn;
    const isLoginPage = window.location.pathname === "/admin/login";

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark p-2">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <Link to="/" className="nav-link"> <span className="sr-only">Home</span></Link>
            </div>

            {!isLoggedIn &&
            (<>
                {!isLoginPage &&
                <form className="form-flex" name="search-form" id="search-form" onSubmit={e => handleSubmit(e)}>
                    <input className="form-control mr-sm-2 " type="search"
                           placeholder="Search by name or barcode" aria-label="Search"
                           onChange={e => setSearchText(e.target.value)}/>
                    <button className="btn btn-outline-success" type="submit" onClick={e => handleSubmit(e)}>Search
                    </button>
                </form>
                }


                <div className="buttons ml-10">
                    <Link className="btn btn-outline-light" to='/admin/login'>
                        <i className="fa fa-sign-in m-r-1"/>
                        Login
                    </Link>
                    <a className="btn btn-outline-light" href=''>
                        <i className="fa fa-user-plus m-r-1"></i>
                        Register
                    </a>
                </div>
            </>)
            }

            {isLoggedIn && <>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {/*<li className="nav-item active">*/}
                        {/*    <Link to="/" className="nav-link">Client-Home <span className="sr-only"></span></Link>*/}
                        {/*</li>*/}
                        <li className="nav-item active">
                            <Link to="/admin/dashboard" className="nav-link">Dashboard <span className="sr-only"></span></Link>
                        </li>

                    </ul>
                    <div className="buttons ml-10">
                        <a className="btn btn-outline-light" onClick={e => handleLogout(e)}>
                            <i className="fa fa-sign-in m-r-1"/>
                            Logout
                        </a>
                    </div>
                </div>

            </>}

            {!isLoginPage &&
            <Link to="/cart" className="btn btn-outline-light">
                <i className="fa fa-shopping-cart m-r-1"></i>
                Cart({totalItemsInCart})
            </Link>
            }

        </nav>

    </>

};
