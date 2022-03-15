import React, {useState, useEffect} from 'react';
import {AdminNavbar} from './AdminNavbar';
import {useDispatch, useSelector} from "react-redux";
import {categoriesAction} from '../redux/actions';
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from './HandleAdminRequests';
import {Link} from 'react-router-dom'
import {AdminSidebar} from "./AdminSidebar";



export const CategoryList = ({handleClickAction}) => {

    const dispatch = useDispatch();
    const [cookies] = useCookies();
    const [refresh, setRefresh] = useState(false);

    const handleClick = async (e, action, pk) => {
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

        if (result.status === 204)
           {alert(result.status); setRefresh(true);}
    };

    useEffect(() => {
        dispatch(categoriesAction());
    }, [refresh]);
    //
    const categories = useSelector(state => state.categories);

    return (
        <>
            <AdminNavbar/>
            <div className="dashboard-container">
                <AdminSidebar handleClickAction={handleClickAction}/>
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
                                <Link  className="btn btn-primary"
                                       to={"/admin/edit-category/"+cat.id}
                                      // onClick={e=>handleClickAction(e, "add-category",cat.id)}
                                >Edit</Link>
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
            </div>
        </>
    )
};