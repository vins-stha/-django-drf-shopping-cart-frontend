import React, {useState, useEffect} from 'react';
import {AdminNavbar} from './AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests'


export const Dashboard = () => {
    const actions = [
        {"category_list": "Category List"},
        {"product_list": "Product List"},
    ];
    const dispatch = useDispatch();
    const [cookies, setCookie, getCookie] = useCookies();
    const [categoryName, setCategoryName] = useState();
    const [formProps, setFormProps] = useState();
    const [action,setAction] = useState(false);

    useEffect(() => {
        dispatch(categoriesAction());
    }, []);

    const categories = useSelector(state => state.categories);

    const handleClickAction = (e, action = "") => {
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            name: categoryName
        });
        console.log('user submitted');
        await setFormProps({
            type: "categories",
            body: categoryName,
            method: "post",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });
       setTimeout(()=>{HandleAdminRequests({
           type: "categories",
           body: categoryName,
           method: "post",
           access_token: cookies.access_token,
           refresh_token: cookies.refresh_token       })},0);
        setAction(true);

        try {


        } catch (e) {
            console.log('Errrrrro', e)
        }


        // try {
        //     let access_token = cookies.access_token;
        //     // if (!access_token || access_token === undefined || access_token ==="")
        //     //     await get_access_token();
        //     // let result = await fetch("http://localhost:8000/api/v1/categories/", {
        //     //     'method':'POST',
        //     //     headers: {
        //     //         'Content-Type':  'application/json',
        //     //         'Authorization': `Bearer ${cookies.access_token}`
        //     //     },
        //     //     body: JSON.stringify({name:body.name})
        //     // });
        //     //
        //     // let response = await result.json();
        //     // console.log('Final Result =>', response);
        //
        //
        //     // setMessage({
        //     //     status: result.status,
        //     //     message: result.status === 200 ? 'Login Successful!' : response.message
        //     // });
        //     // response.refresh ? setCookie('refresh_token',response.refresh):setCookie('refresh_token','');
        //     //
        //     // response.access !== undefined ? navigate('/admin/dashboard'): navigate('/');
        //
        // } catch (error) {
        //     console.log('Something went wrong', error);
        // }
    };

    const get_access_token = async () => {

        try {

            let result = await fetch("http://localhost:8000/api/v1/token/refresh/", {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${cookies.access_token ? cookies.access_token : }`
                },
                body: JSON.stringify({refresh: cookies.refresh_token})
            });

            let response = await result.json();
            console.log('we got the token now =>', response);
            response.access ? setCookie('access_token', response.access) : setCookie('access_token', '');

        } catch (e) {
            console.log('Error while refresh token ....', e)

        }
    };
    return (
        <>
            <AdminNavbar/>

            <div className="dashboard-container">
                <div className="actions-bar">
                    <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "")}>
                        <i className="fa fa-sign-in m-r-1"/>
                        Categories List
                    </div>
                    <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "")}>
                        <i className="fa fa-sign-in m-r-1"/>
                        Add Category
                    </div>

                    <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "")}>
                        <i className="fa fa-sign-in m-r-1"/>
                        Product List
                    </div>
                    <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "")}>
                        <i className="fa fa-sign-in m-r-1"/>
                        Add Product
                    </div>
                </div>

                <div className="input-form admin-forms" encType={"multipart/form-data"}>
                    <h3 className={'form-title'}>Add Product</h3>
                    <form className={'form_container'} onSubmit={e => handleFormSubmit(e)}>
                        <label htmlFor="Category" className={'name'}>Category name : </label>
                        <input type="text" name={"category"} className={'form-inputbox'}/>

                        <label htmlFor="Title" className={'name'}>Title : </label>
                        <input type="text" name={"title"} className={'form-inputbox'}/>

                        <label htmlFor="description" className={'name'}>Description : </label>
                        <input type="textarea" name={"description"} className={'form-inputbox'}/>

                        <label htmlFor="description" className={'name'}>Image : </label>
                        <input type="file" name={"product_name"} className={'form-inputbox'}/>

                        <label htmlFor="description" className={'name'}>Category : </label>
                        <select type="select" name={"category"} className={'form-inputbox'}>
                            {categories.map(cat => (<option key={cat.id}>{cat.name}</option>))}
                        </select>

                        <label htmlFor="barcode" className={'name'}>Barcode : </label>
                        <input type="number" name={"barcode"} className={'form-inputbox'}/>

                        <label htmlFor="price" className={'name'}>Price : </label>
                        <input type="number" name={"price"} className={'form-inputbox'}/>

                        <label htmlFor="instock" className={'name'}>Category name : </label>
                        <input type="text" name={"stock"} className={'form-inputbox'}/>


                        <button className="btn btn-primary submit"> Submit</button>
                    </form>
                </div>

            </div>

            <div className="actions-forms">

                <div className="input-form" >
                    <h1 className={'form-title'}>Add Category</h1>
                    <form className={'form_container'} onSubmit={e =>{
                        e.preventDefault();

                        handleFormSubmit(e)
                    }
                    }>
                        <label htmlFor="Category" className={'label'}>Category name : </label>
                        <input type="text" name={"category"} className={'form-inputbox'}
                               onChange={e => setCategoryName(e.target.value)}/>
                        <button type={"submit"} className="btn btn-primary submit"
                                onClick={e =>{
                                    // e.preventDefault();
                                    // console.log('CLICE',categoryName);
                                    // HandleAdminRequests (formProps );
                                    // handleFormSubmit(e)
                                }
                                }
                        > Add</button>
                    </form>
                </div>
            </div>
        </>
    )
};