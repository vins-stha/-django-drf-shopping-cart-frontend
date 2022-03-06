import React from 'react';
import {Header} from "./Header";


export const Dashboard = () => {
    return(
        <>
            <Header/>
            <div className="input-form">
                <h1 className={'form-title'}>Add Category</h1>
                <form className={'form_container'}>
                    <label htmlFor="Category" className={'label'}>Category name : </label>
                    <input type="text" name={"category"} className={'form-inputbox'}/>
                    <button type={"submit"} className="btn btn-primary submit"> Add</button>
                </form>
            </div>

            <div className="input-form">
                <h1 className={'form-title'}>Add Product</h1>
                <form className={'form_container'}>
                    <label htmlFor="Category" className={'name'}>Category name : </label>
                    <input type="text" name={"category"} className={'form-inputbox'}/>

                    <label htmlFor="Title" className={'name'}>Title : </label>
                    <input type="text" name={"title"} className={'form-inputbox'}/>

                    <label htmlFor="description" className={'name'}>Description : </label>
                    <input type="textarea" name={"description"} className={'form-inputbox'}/>

                    <label htmlFor="barcode" className={'name'}>Barcode : </label>
                    <input type="number" name={"barcode"} className={'form-inputbox'}/>

                    <label htmlFor="price" className={'name'}>Price : </label>
                    <input type="number" name={"price"} className={'form-inputbox'}/>

                    <label htmlFor="instock" className={'name'}>Category name : </label>
                    <input type="text" name={"stock"} className={'form-inputbox'}/>


                    <button className="btn btn-primary submit"> Submit</button>
                </form>
            </div>

            <div className="input-form">
                <h1 className={'form-title'}>Admin login</h1>
                <form className={'form_container'}>
                    <label htmlFor="Username" className={'name'}>Username: </label>
                    <input type="text" name={"username"} className={'form-inputbox'}/>
                    <label htmlFor="Password" className={'name'}>Password: </label>
                    <input type="password" name={"password"} className={'form-inputbox'}/>
                    <button className="btn btn-primary submit"> Submit</button>
                </form>
            </div>


        </>
    )


};