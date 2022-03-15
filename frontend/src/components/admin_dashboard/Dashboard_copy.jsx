Dashboard.jsximport React, {useState, useEffect} from 'react';
import {AdminNavbar} from '../admin_layout/AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import{useParams} from "react-router";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests';
import {AdminSidebar} from "../admin_layout/AdminSidebar";
import {AdminLogin} from "./Login";
import {AddProduct} from "../extras/AddProduct";
import {AddCategory} from "../extras/AddCategory";
import {CategoryList} from "../extras/CategoryList";


export const Dashboard = () => {
    const actions = [
        {"category_list": "Category List"},
        {"product_list": "Product List"},
    ];
    const dispatch = useDispatch();
    const [cookies] = useCookies();

    const [categoryName, setCategoryName] = useState();
    const [formProps, setFormProps] = useState();
    const [action, setAction] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [addProduct, setAddProduct] = useState(true);
    const [categoryList, setCategoryList] = useState(false);
    const [productList, setProductList] = useState(false);
    const [id,setId] = useState(null);
    useEffect(() => {
        dispatch(categoriesAction());

    }, []);

    const categories = useSelector(state => state.categories);

    const handleClickAction = (e, action = "", id="") => {
        id !== undefined ? setId(id) : setId(null);
        e.preventDefault();
        if (action === "add-category") {
            setAddCategory(true);
            setAddProduct(false);
            setProductList(false);
            setCategoryList(false);

        } else if (action === "category-list") {
            setCategoryList(true);
            setAddCategory(false);
            setAddProduct(false);
            setProductList(false);

        } else if (action === "add-product") {
            setAddProduct(true);
            setAddCategory(false);
            setProductList(false);
            setCategoryList(false);
        } else if (action === "product-list") {
            setProductList(true);
            setAddCategory(false);
            setAddProduct(false);
            setCategoryList(false);
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "categories",
            body: {name: categoryName},
            method: "post",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });
        result.status === 201 ? window.location = "/" : alert('Error occured!', result.statusText);

        try {
        } catch (e) {
            console.log('Something went wrong!', e)
        }
    };

    return (
        <>
            <AdminNavbar/>
            <div className="dashboard-container">
                <AdminSidebar handleClickAction={handleClickAction}/>
                {
                    (() => {
                        if (addCategory) {
                            return (<AddCategory handleFormSubmit={handleFormSubmit} id={id}/>)
                        } else if (addProduct) {
                            return (
                                <AddProduct categories={categories} handleFormSubmit={handleFormSubmit} id={id}/>
                            )
                        } else if (productList) {
                            return (
                                <p>ProductLISt</p>
                            )
                        } else if (categoryList) {
                            return (
                                <CategoryList handleClickAction={handleClickAction}/>
                            )
                        }
                    })()
                }
            </div>
        </>
    )
};