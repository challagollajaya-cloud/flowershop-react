import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [hoveredId, setHoveredId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/api/products`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load products!');
                setLoading(false);
            });
    }, []);

    const addToCart = (productId, productName) => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        axios.post(`${API}/api/cart/add`, null, {
            params: { productId, quantity: 1 },
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                setMessage(`${productName} added to cart!`);
                setTimeout(() => setMessage(''), 2000);
            })
            .catch(() => {
                setMessage('Please login first!');
                setTimeout(() => { setMessage(''); navigate('/login'); }, 1500);
            });
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', height: '60vh',
            flexDirection: 'column', gap: '16px'
        }}>
            <div style={{ fontSize: '48px' }}>🌸</div>
            <p style={{
                color: '#1B3A5C', fontWeight: '500',
                letterSpacing: '3px', fontSize: '12px',
                textTransform: 'uppercase'
            }}>Loading...</p>
        </div>
    );

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>

            {/* Top Banner */}
            <div style={{
                textAlign: 'center',
                padding: '50px 20px 30px',
                borderBottom: '1px solid #ebebeb'
            }}>
                <p style={{
                    letterSpacing: '4px', fontSize: '11px',
                    color: '#aaa', marginBottom: '10px',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    Fresh · Handcrafted · Local
                </p>
                <h1 style={{
                    fontSize: '38px', color: '#1B3A5C',
                    fontWeight: 'normal', marginBottom: '16px',
                    letterSpacing: '1px'
                }}>
                    Our Flower Collection
                </h1>
                <p style={{
                    color: '#888', marginBottom: '24px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px'
                }}>
                    {products.length} beautiful arrangements
                </p>

                {/* Search Bar */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                        type="text"
                        placeholder="Search arrangements..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            padding: '10px 40px 10px 16px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            width: '280px',
                            outline: 'none',
                            letterSpacing: '0.5px',
                            fontFamily: 'Arial, sans-serif',
                            color: '#555'
                        }}
                    />
                    <span style={{
                        position: 'absolute', right: '12px',
                        top: '50%', transform: 'translateY(-50%)',
                        color: '#aaa', fontSize: '14px'
                    }}>🔍</span>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div style={{
                    background: '#1B3A5C', color: 'white',
                    padding: '12px', textAlign: 'center',
                    fontSize: '13px', letterSpacing: '1px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    ✓ {message}
                </div>
            )}

            {/* Count */}
            <div style={{
                padding: '16px 40px',
                color: '#aaa', fontSize: '12px',
                letterSpacing: '1px',
                fontFamily: 'Arial, sans-serif',
                textTransform: 'uppercase',
                borderBottom: '1px solid #ebebeb'
            }}>
                {filtered.length} items
            </div>

            {/* No Results */}
            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <p style={{ color: '#aaa', fontSize: '14px', letterSpacing: '1px' }}>
                        No arrangements found for "{search}"
                    </p>
                </div>
            )}

            {/* Product Grid - Square like Redmond Floral */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1px',
                backgroundColor: '#ebebeb',
                margin: '0'
            }}>
                {filtered.map(product => (
                    <div
                        key={product.id}
                        onMouseEnter={() => setHoveredId(product.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>

                        {/* Square Image */}
                        <div style={{
                            position: 'relative',
                            paddingBottom: '100%', /* Square ratio */
                            overflow: 'hidden',
                            backgroundColor: '#f9f7f5'
                        }}>
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={{
                                        position: 'absolute',
                                        top: 0, left: 0,
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        transform: hoveredId === product.id
                                            ? 'scale(1.06)' : 'scale(1)',
                                        transition: 'transform 0.6s ease'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0,
                                    width: '100%', height: '100%',
                                    background: '#f0ede8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '64px'
                                }}>
                                    🌸
                                </div>
                            )}

                            {/* Sold Out Overlay */}
                            {product.quantity === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(255,255,255,0.65)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        background: '#1B3A5C',
                                        color: 'white',
                                        padding: '8px 20px',
                                        fontSize: '11px',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Arial, sans-serif'
                                    }}>
                                        Sold Out
                                    </span>
                                </div>
                            )}

                            {/* Low Stock Badge */}
                            {product.quantity < 20 && product.quantity > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '14px', left: '14px',
                                    background: '#C0392B',
                                    color: 'white',
                                    padding: '4px 10px',
                                    fontSize: '10px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Arial, sans-serif'
                                }}>
                                    Low Stock
                                </div>
                            )}

                            {/* Hover Add to Cart */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0,
                                transform: hoveredId === product.id
                                    ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.3s ease',
                                padding: '0'
                            }}>
                                {product.quantity > 0 && (
                                    <button
                                        onClick={() => addToCart(product.id, product.name)}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            background: 'rgba(27, 58, 92, 0.92)',
                                            color: 'white',
                                            border: 'none',
                                            fontSize: '11px',
                                            letterSpacing: '3px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            fontFamily: 'Arial, sans-serif',
                                            fontWeight: '600',
                                            backdropFilter: 'blur(4px)'
                                        }}>
                                        + Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Info - Clean & Minimal */}
                        <div style={{ padding: '16px 20px 20px' }}>
                            <h6 style={{
                                fontSize: '15px',
                                color: '#1B3A5C',
                                marginBottom: '4px',
                                fontWeight: 'normal',
                                letterSpacing: '0.5px'
                            }}>
                                {product.name}
                            </h6>
                            <p style={{
                                color: '#555',
                                fontSize: '13px',
                                margin: 0,
                                fontFamily: 'Arial, sans-serif',
                                letterSpacing: '0.3px'
                            }}>
                                from ₹{product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Space */}
            <div style={{ height: '60px' }} />
        </div>
    );
}

export default Shop;