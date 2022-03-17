import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from "../HandleAdminRequests";
import {Link} from 'react-router-dom'
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {fetchActions} from "../../redux/actions";

export const ProductList = ({handleClickAction}) => {

    const dispatch = useDispatch();
    const [cookies] = useCookies();
    let reload = false;
    const handleClick = async (e, action, pk) => {
        e.preventDefault();

        let result = await HandleAdminRequests({
            type: "products",
            body: "",
            pk: pk,
            method: action === "delete" ? "delete" : "get",
            action: action,
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });

        if (result.code === 204) {
            alert("Deleted Successfully");
            reload = true;
        }
    };

    useEffect(() => {
        dispatch(fetchActions());
    }, [reload]);
    //
    const products = useSelector(state => state.products);

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar handleClickAction={handleClickAction}/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
              
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(prod=>(
                        <tr key={prod.id}>
                            <th scope="row">{prod.id}</th>
                            <td>{prod.title}</td>

                            <td>
                                <div className="btn-container">
                                    <Link  className="btn btn-primary"
                                           to={"/admin/edit-product/"+prod.id}
                                        // onClick={e=>handleClickAction(e, "add-category",prod.id)}
                                    >Edit</Link>
                                    <div className="btn btn-danger" onClick={e=>
                                        window.confirm("Are you sure") ? handleClick(e,'delete',prod.id) :''}>
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