import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <>
            {/* Top thin bar - hidden on mobile */}
            <div style={{
                backgroundColor: '#3d2314',
                color: '#d4b896',
                textAlign: 'center',
                padding: '8px',
                fontSize: '11px',
                letterSpacing: '2px',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'uppercase'
            }}>
                🌿 Free delivery on orders above ₹500
            </div>

            {/* Main Navbar */}
            <nav style={{
                backgroundColor: '#fdf6ee',
                borderBottom: '1px solid #e8ddd4',
                fontFamily: 'Arial, sans-serif',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px',
                    height: '65px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>

                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '24px' }}>🌸</span>
                            <div>
                                <div style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '18px',
                                    color: '#3d2314',
                                    letterSpacing: '1px',
                                    lineHeight: '1.2'
                                }}>
                                    Flower Shop
                                </div>
                                <div style={{
                                    fontSize: '8px',
                                    letterSpacing: '2px',
                                    color: '#b89880',
                                    textTransform: 'uppercase'
                                }}>
                                    Fresh · Handcrafted
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '28px'
                    }}
                         className="desktop-nav">

                        {['Shop', 'Cart', 'Orders'].map(item => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#5C4033',
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontWeight: '500'
                                }}>
                                {item === 'Cart' ? '🛒 Cart' : item}
                            </Link>
                        ))}

                        {username === 'admin' && (
                            <>
                                <Link to="/admin/products" style={{
                                    textDecoration: 'none',
                                    color: '#9c7b6b',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
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
                                    borderBottom: '1px solid #9c7b6b',
                                    paddingBottom: '2px'
                                }}>
                                    📦 Orders
                                </Link>
                            </>
                        )}

                        {username ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#9c7b6b', fontSize: '12px' }}>
                                    👤 {username}
                                </span>
                                <button onClick={handleLogout} style={{
                                    background: 'transparent',
                                    border: '1px solid #5C4033',
                                    color: '#5C4033',
                                    padding: '6px 16px',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    borderRadius: '20px'
                                }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <Link to="/login" style={{
                                    textDecoration: 'none',
                                    color: '#5C4033',
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase'
                                }}>Login</Link>
                                <Link to="/register" style={{
                                    textDecoration: 'none',
                                    background: '#5C4033',
                                    color: 'white',
                                    padding: '8px 18px',
                                    fontSize: '11px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    borderRadius: '20px'
                                }}>Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Menu Button (Mobile) */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="mobile-nav"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: '#5C4033',
                            padding: '8px'
                        }}>
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div
                        className="mobile-nav"
                        style={{
                            backgroundColor: '#fdf6ee',
                            borderTop: '1px solid #e8ddd4',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>

                        {[
                            { label: '🌸 Shop', path: '/shop' },
                            { label: '🛒 Cart', path: '/cart' },
                            { label: '📦 Orders', path: '/orders' }
                        ].map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: '#5C4033',
                                    fontSize: '14px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: '500',
                                    padding: '8px 0',
                                    borderBottom: '1px solid #f0e6d8'
                                }}>
                                {item.label}
                            </Link>
                        ))}

                        {username === 'admin' && (
                            <>
                                <Link to="/admin/products"
                                      onClick={() => setMenuOpen(false)}
                                      style={{
                                          textDecoration: 'none',
                                          color: '#9c7b6b',
                                          fontSize: '13px',
                                          letterSpacing: '2px',
                                          textTransform: 'uppercase',
                                          padding: '8px 0',
                                          borderBottom: '1px solid #f0e6d8'
                                      }}>
                                    ⚙️ Manage Products
                                </Link>
                                <Link to="/admin/orders"
                                      onClick={() => setMenuOpen(false)}
                                      style={{
                                          textDecoration: 'none',
                                          color: '#9c7b6b',
                                          fontSize: '13px',
                                          letterSpacing: '2px',
                                          textTransform: 'uppercase',
                                          padding: '8px 0',
                                          borderBottom: '1px solid #f0e6d8'
                                      }}>
                                    ⚙️ Manage Orders
                                </Link>
                            </>
                        )}

                        {username ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ color: '#9c7b6b', fontSize: '13px' }}>
                                    👤 {username}
                                </span>
                                <button onClick={handleLogout} style={{
                                    background: '#5C4033',
                                    border: 'none',
                                    color: 'white',
                                    padding: '8px 20px',
                                    fontSize: '12px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    borderRadius: '20px'
                                }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Link to="/login"
                                      onClick={() => setMenuOpen(false)}
                                      style={{
                                          textDecoration: 'none',
                                          color: '#5C4033',
                                          fontSize: '13px',
                                          letterSpacing: '2px',
                                          textTransform: 'uppercase',
                                          padding: '10px 20px',
                                          border: '1px solid #5C4033',
                                          borderRadius: '20px'
                                      }}>
                                    Login
                                </Link>
                                <Link to="/register"
                                      onClick={() => setMenuOpen(false)}
                                      style={{
                                          textDecoration: 'none',
                                          background: '#5C4033',
                                          color: 'white',
                                          fontSize: '13px',
                                          letterSpacing: '2px',
                                          textTransform: 'uppercase',
                                          padding: '10px 20px',
                                          borderRadius: '20px'
                                      }}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* CSS for responsive */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-nav { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .mobile-nav { display: none !important; }
                    .desktop-nav { display: flex !important; }
                }
            `}</style>
        </>
    );
}

export default Navbar;