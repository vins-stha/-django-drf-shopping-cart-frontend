import React from "react";
import {Link} from "react-router-dom/index";

export const AdminSidebar = ({handleClickAction}) => {
    return(
        <div className="actions-bar">
            <Link to={"/admin/categories/"} className="btn btn-outline-light action_lists" >
                <i className="fa fa-sign-in m-r-1"/>
                Categories List
            </Link>
            <Link to={"/admin/add-category/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Add Category
            </Link>

            <Link to={"/admin/products/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Product List
            </Link>
            {/*<div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "add-product")}>*/}
            {/*    <i className="fa fa-sign-in m-r-1"/>*/}
            {/*    Add Product*/}
            {/*</div>*/}
            <Link to={"/admin/add-product/"} className="btn btn-outline-light action_lists">
                <i className="fa fa-sign-in m-r-1"/>
                Add Product
            </Link>
        </div>
    )
};
