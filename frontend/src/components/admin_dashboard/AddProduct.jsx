import React from 'react';


export const AddProduct = ({categories, handleFormSubmit}) => {

    return (
        <>
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
        </>
    )
};