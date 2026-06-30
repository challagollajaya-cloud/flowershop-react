import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <>
            {/* Top thin bar */}
            <div style={{
                backgroundColor: '#3d2314',
                color: '#d4b896',
                textAlign: 'center',
                padding: '8px',
                fontSize: '11px',
                letterSpacing: '3px',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'uppercase'
            }}>
                🌿 Free delivery on orders above ₹500 · Fresh flowers daily
            </div>

            {/* Main Navbar */}
            <nav style={{
                backgroundColor: '#fdf6ee',
                borderBottom: '1px solid #e8ddd4',
                padding: '0 40px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    height: '70px'
                }}>

                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '28px' }}>🌸</span>
                            <div>
                                <div style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '20px',
                                    color: '#3d2314',
                                    letterSpacing: '2px',
                                    lineHeight: '1.2'
                                }}>
                                    Flower Shop
                                </div>
                                <div style={{
                                    fontSize: '9px',
                                    letterSpacing: '3px',
                                    color: '#b89880',
                                    textTransform: 'uppercase'
                                }}>
                                    Fresh · Handcrafted
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '32px'
                    }}>
                        <Link to="/shop" style={{
                            textDecoration: 'none',
                            color: '#5C4033',
                            fontSize: '12px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: '500',
                            transition: 'color 0.2s'
                        }}>
                            Shop
                        </Link>

                        <Link to="/cart" style={{
                            textDecoration: 'none',
                            color: '#5C4033',
                            fontSize: '12px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: '500'
                        }}>
                            🛒 Cart
                        </Link>

                        <Link to="/orders" style={{
                            textDecoration: 'none',
                            color: '#5C4033',
                            fontSize: '12px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: '500'
                        }}>
                            Orders
                        </Link>

                        {/* Admin Links */}
                        {username === 'admin' && (
                            <>
                                <Link to="/admin/products" style={{
                                    textDecoration: 'none',
                                    color: '#9c7b6b',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontWeight: '500',
                                    borderBottom: '1px solid #9c7b6b',
                                    paddingBottom: '2px'
                                }}>
                                    🌸 Products
                                </Link>

                                <Link to="/admin/orders" style={{
                                    textDecoration: 'none',
                                    color: '#9c7b6b',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontWeight: '500',
                                    borderBottom: '1px solid #9c7b6b',
                                    paddingBottom: '2px'
                                }}>
                                    📦 Orders
                                </Link>
                            </>
                        )}

                        {/* Auth */}
                        {username ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <span style={{
                                    color: '#9c7b6b',
                                    fontSize: '12px',
                                    letterSpacing: '1px'
                                }}>
                                    👤 {username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #5C4033',
                                        color: '#5C4033',
                                        padding: '6px 16px',
                                        fontSize: '11px',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        borderRadius: '20px',
                                        fontFamily: 'Arial, sans-serif'
                                    }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Link to="/login" style={{
                                    textDecoration: 'none',
                                    color: '#5C4033',
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontWeight: '500'
                                }}>
                                    Login
                                </Link>
                                <Link to="/register" style={{
                                    textDecoration: 'none',
                                    background: '#5C4033',
                                    color: 'white',
                                    padding: '8px 20px',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    borderRadius: '20px',
                                    fontWeight: '500'
                                }}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;