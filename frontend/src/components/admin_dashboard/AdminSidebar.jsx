import React from "react";

export const AdminSidebar = ({handleClickAction}) => {
    return(
        <div className="actions-bar">
            <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "category-list")}>
                <i className="fa fa-sign-in m-r-1"/>
                Categories List
            </div>
            <div className="btn btn-outline-light action_lists" onClick={e => handleClickAction(e, "add-category")}>
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
    )
};
