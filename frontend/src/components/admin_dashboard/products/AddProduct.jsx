import React, {useState, useEffect} from 'react';
import {AdminNavbar} from "../../admin_layout/AdminNavbar";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {HandleAdminRequests} from "../HandleAdminRequests";
import {AdminSidebar} from "../../admin_layout/AdminSidebar";
import {categoriesAction, fetchActions} from "../../redux/actions";


export const AddProduct = ({handleClickAction}) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies();
    const [categoryName, setCategoryName] = useState('');
    const inStockOptions = ["no", "yes"];
    const colors = ["red", "blue", "black", "white", "grey"]

    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        inStock: "no",
        colors: '',
        available: 0,
        barcode: 0,
    });
    const [productImage, setProductImage] = useState(null);

    useEffect(async () => {
        dispatch(categoriesAction());

    }, []);
    const categories = useSelector(state => state.categories);

    const handleOnChange = (e) => {

        if (e.target.name === "product_image") {
            setProductImage(
                e.target.files[0]
            )
        } else {
            setProductData({...productData, [e.target.name]: e.target.value});
        }

    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        Object.entries(productData).forEach(([key, value]) => {
                formData.append(key, value)
            }
        );

        await formData.append('product_image', productImage);

        Object.entries(productData).forEach(([key, value]) => {
                console.log("key", key, "value", value)
            }
        );

        let result = await HandleAdminRequests({
            type: "products",
            body: formData,
            method: "post",
            access_token: cookies.access_token,
            refresh_token: cookies.refresh_token
        });
        console.log('result', result, result.id);
        if (result.id !== undefined) {
            alert('New product added');
            window.location = "/admin/products/";
        } else {
            console.log('Could not create product.', result.statusText)
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <AdminSidebar handleClickAction={handleClickAction}/>

                <div className="actions-forms admin-forms">
                    <div className="input-form">

                        <h3 className={'form-title'}> Add Product</h3>

                        <form className={'form_container'} onSubmit={e => {
                            e.preventDefault();
                            handleFormSubmit(e)
                        }}>

                            <label htmlFor="Prodcut" className={'label'}>Product name
                                : <i>{productData['title']}</i></label>
                            <input type="text" name="title" className={'form-inputbox'}
                                   defaultValue={productData['title']}
                                   onChange={e => handleOnChange(e)}
                            />
                            <label htmlFor="Prodcut" className={'label'}>Price :</label>
                            <input type="number" name="price" className={'form-inputbox'}
                                   defaultValue={productData['price']}
                                   onChange={e => handleOnChange(e)}
                            />
                            <label htmlFor="Prodcut" className={'label'}>Barcode :</label>
                            <input type="number" name="barcode" className={'form-inputbox'}
                                   defaultValue={productData['barcode']}
                                   onChange={e => handleOnChange(e)}
                            />
                            <label htmlFor="Prodcut" className={'label'}>Available :</label>
                            <input type="number" name="available" className={'form-inputbox'}
                                   defaultValue={productData['available']}
                                   onChange={e => handleOnChange(e)}
                            />

                            <label htmlFor="Prodcut" className={'label'}>Colors :</label>
                            <select type="select" name={"colors"} className={'form-inputbox'}
                                    onChange={e => handleOnChange(e)}>
                                {
                                    colors.map(opt => {
                                        return <option key={opt}>{opt}</option>
                                    })

                                }
                            </select>
                            <label htmlFor="Prodcut" className={'label'}>Description :</label>
                            <textarea name="description" className={'form-inputbox'}
                                      defaultValue={productData['description']} rows={"10"} cols={"500"}
                                      onChange={e => handleOnChange(e)}
                            />
                            <img className="card-img-top prod-image contain" src={productData['product_image']} alt=""/>
                            <input type="file" name="product_image" className={'form-inputbox'}
                                   defaultValue={productData.product_image}
                                   onChange={e => handleOnChange(e)}
                            />
                            <label htmlFor="description" className={'name'}>Category : </label>
                            <select type="select" name={"category"} className={'form-inputbox'}>
                                {categories.map(cat => {
                                        return (<option key={cat.id}>{cat.name}</option>)
                                    }
                                )}
                            </select>

                            <label htmlFor="description" className={'name'}>inStock : </label>
                            <select type="select" name={"inStock"} className={'form-inputbox'}
                                    onChange={e => handleOnChange(e)}>
                                {
                                    inStockOptions.map(opt => {
                                        return <option key={opt.key}>{opt}</option>
                                    })

                                }
                            </select>

                            <button type={"submit"} className="btn btn-primary submit"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        handleFormSubmit(e)
                                    }}> Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};