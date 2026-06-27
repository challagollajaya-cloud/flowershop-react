import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
    const isLoggedIn = localStorage.getItem('username');

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/"
                           element={
                               isLoggedIn ?
                                   <Navigate to="/shop" /> :
                                   <Navigate to="/login" />
                           }
                    />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;