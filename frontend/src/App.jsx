import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import {BrowserRouter, Routes} from 'react-router-dom'
import {Route} from 'react-router-dom';
import {AuthProvider} from "./components/services/Auth";
import {ProtectedRoute} from "./components/admin_dashboard/ProtectedRoutes";
import {Home} from './components/client/Home';
import {Cart} from './components/client/Cart';
import Products from './components/client/Product';
import ProductDetail from './components/client/ProductDetail';
import {Dashboard} from './components/admin_layout/Dashboard'
import {UserLogin} from './components/client/UserLogin';
import {AdminLogin} from "./components/admin_dashboard/Login";

import {AddCategory} from "./components/admin_dashboard/categories/AddCategory";
import {EditCategory} from "./components/admin_dashboard/categories/EditCategory";
import {CategoryList} from './components/admin_dashboard/categories/CategoryList'

import {ProductList} from "./components/admin_dashboard/products/ProductList";
import {EditProduct} from "./components/admin_dashboard/products/EditProduct";
import {AddProduct} from "./components/admin_dashboard/products/AddProduct";



function App() {

    return (

            <AuthProvider>

                <div className='container m-t-5'>
                    <BrowserRouter>
                        <Home/>
                        <Routes>
                            <Route exact path="/" element={<Products/>}/>
                            <Route exact path="/products" element={<Products/>}/>
                            <Route exact path="/product/:id" element={<ProductDetail/>}/>
                            <Route exact path="/cart/" element={<Cart/>}/>
                            <Route exact
                                   path={"/admin/login"}
                                   element={<AdminLogin/>}/>

                            {/*<Route exact path={"/admin/dashboard/:type/:id"} element={<Dashboard/>}/>*/}
                            <Route exact
                                   path={"/admin/add-category/"}
                                   element={<ProtectedRoute> <AddCategory/></ProtectedRoute>}
                            />
                            <Route exact
                                   path={"/admin/edit-category/:id/"}
                                   element={<ProtectedRoute> <EditCategory/></ProtectedRoute>}
                            />
                            <Route exact
                                   path={"/admin/categories/"}
                                   element={<ProtectedRoute> <CategoryList/></ProtectedRoute>}
                            />
                            <Route exact
                                   path={"/admin/products/"}
                                   element={<ProtectedRoute> <ProductList/></ProtectedRoute>}
                            />
                            <Route exact
                                   path={"/admin/edit-product/:product_id"}
                                   element={<ProtectedRoute> <EditProduct/></ProtectedRoute>}
                            />
                            <Route exact
                                   path={"/admin/add-product/"}
                                   element={<ProtectedRoute> <AddProduct/></ProtectedRoute>}
                            />
                            <Route
                                exact
                                path={"/admin/dashboard/"}
                                element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}
                            />
                        </Routes>
                    </BrowserRouter>

                </div>
            </AuthProvider>


    );
}

export default App;
