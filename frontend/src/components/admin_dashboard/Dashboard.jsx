import React, {useState, useEffect} from 'react';
import {AdminNavbar} from './AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests';
import {AdminSidebar} from "./AdminSidebar";
import {AdminLogin} from "./Login";
import {AddProduct} from "./AddProduct";
import {AddCategory} from "./AddCategory";
import {CategoryList} from "./CategoryList";


export const Dashboard = () => {
    const actions = [
        {"category_list": "Category List"},
        {"product_list": "Product List"},
    ];
    const dispatch = useDispatch();
    const [cookies, setCookie, getCookie] = useCookies();
    const [categoryName, setCategoryName] = useState();
    const [formProps, setFormProps] = useState();
    const [action, setAction] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [categoryList, setCategoryList] = useState(false)


    useEffect(() => {
        dispatch(categoriesAction());
    }, []);

    const categories = useSelector(state => state.categories);

    const handleClickAction = (e, action = "") => {
        e.preventDefault();
        if( action === "add-category")
            setAddCategory(true);
        else if( action === "category-list")
            setCategoryList(true)
        console.log('do this', action)
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
                {addCategory &&  <AddCategory  handleFormSubmit={handleFormSubmit}/> }
                {  categoryList &&  <CategoryList/>}
                {/*<AddProduct categories={categories} handleFormSubmit={handleFormSubmit}/> }*/}

            </div>

        </>
    )
};