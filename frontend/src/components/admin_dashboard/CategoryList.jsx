import React, {useState, useEffect} from 'react';
import {AdminNavbar} from './AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests';
import {EditCategory} from'./EditCategory'



export const CategoryList = () => {
    //
    const dispatch = useDispatch();
    const [cookies] = useCookies();
    //

    const handleClick = async (e,action,pk) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "category",
            body: "",
            pk: pk,
            method: action === "delete" ? "delete" : "get",
            action: action,
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });

        try {
        } catch (e) {
            console.log('Something went wrong!', e)
        }
    };

    useEffect(() => {
        dispatch(categoriesAction());
    }, []);
    //
    const categories = useSelector(state => state.categories);
    const test = () =>{
        return <EditCategory/>
    }
    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category-name</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(cat=>(
                    <tr key={cat.id}>
                        <th scope="row">{cat.id}</th>
                        <td>{cat.name}</td>
                        <td>{cat.created_at}</td>
                        <td>
                            <div className="btn-container">
                                <div className="btn btn-primary"onClick={test}>Edit</div>
                                <div className="btn btn-danger" onClick={e=>
                                    window.confirm("Are you sure") ? handleClick(e,'delete',cat.id) :''}>
                                    Delete
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}


                </tbody>
            </table>
        </>
    )
};