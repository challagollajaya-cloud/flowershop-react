import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg"
             style={{ backgroundColor: '#1B3A5C' }}>
            <div className="container">

                <Link
                    className="navbar-brand text-white fw-bold fs-4"
                    to="/">
                    🌸 Flower Shop
                </Link>

                <div className="d-flex gap-3 align-items-center">
                    <Link
                        className="nav-link text-white"
                        to="/shop">
                        Shop
                    </Link>
                    <Link
                        className="nav-link text-white"
                        to="/cart">
                        🛒 Cart
                    </Link>
                    <Link
                        className="nav-link text-white"
                        to="/orders">
                        📦 Orders
                    </Link>

                    {username === 'admin' && (
                        <div className="d-flex gap-2">
                            <Link
                                className="nav-link text-white"
                                to="/admin/products">
                                🌸 Manage Products
                            </Link>
                            <Link
                                className="nav-link text-white"
                                to="/admin/orders">
                                📋 Manage Orders
                            </Link>
                        </div>
                    )}

                    {username ? (
                        <div className="d-flex gap-2
                            align-items-center">
                            <span className="text-white">
                                👤 {username}
                            </span>
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link
                                className="nav-link text-white"
                                to="/login">
                                Login
                            </Link>
                            <Link
                                className="btn btn-outline-light btn-sm"
                                to="/register">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;