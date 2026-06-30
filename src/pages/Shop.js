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
    const [filter, setFilter] = useState('All');
    const [sortBy, setSortBy] = useState('default');
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

    const categories = ['All', ...new Set(products.map(p => p.category))];

    let filtered = products
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .filter(p => filter === 'All' || p.category === filter);

    if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'in-stock') filtered = [...filtered].filter(p => p.quantity > 0);

    if (loading) return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', height: '60vh',
            flexDirection: 'column', gap: '16px'
        }}>
            <div style={{ fontSize: '48px' }}>🌸</div>
            <p style={{
                color: '#5C4033', fontWeight: '500',
                letterSpacing: '3px', fontSize: '12px',
                textTransform: 'uppercase', fontFamily: 'Arial, sans-serif'
            }}>Loading...</p>
        </div>
    );

    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div style={{ backgroundColor: '#fdfaf7', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>

            {/* Hero Header */}
            <div style={{
                background: 'linear-gradient(180deg, #fdf6ee 0%, #fdfaf7 100%)',
                textAlign: 'center',
                padding: '60px 20px 40px',
                borderBottom: '1px solid #e8ddd4'
            }}>
                <p style={{
                    letterSpacing: '5px', fontSize: '11px',
                    color: '#b89880', marginBottom: '12px',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    🌿 Fresh · Handcrafted · Delivered with Love
                </p>
                <h1 style={{
                    fontSize: '42px', color: '#3d2314',
                    fontWeight: 'normal', marginBottom: '10px',
                    letterSpacing: '2px'
                }}>
                    Our Flower Collection
                </h1>
                <p style={{
                    color: '#9c7b6b', marginBottom: '28px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px', letterSpacing: '0.5px'
                }}>
                    {products.length} beautiful arrangements, handpicked for you
                </p>

                {/* Search */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <span style={{
                        position: 'absolute', left: '14px',
                        top: '50%', transform: 'translateY(-50%)',
                        color: '#b89880', fontSize: '14px'
                    }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search arrangements..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            padding: '12px 16px 12px 38px',
                            border: '1px solid #e0d0c5',
                            borderRadius: '30px',
                            fontSize: '13px',
                            width: '300px',
                            outline: 'none',
                            background: 'white',
                            fontFamily: 'Arial, sans-serif',
                            color: '#555',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                        }}
                    />
                </div>
            </div>

            {/* Message */}
            {message && (
                <div style={{
                    background: '#5C4033', color: 'white',
                    padding: '12px', textAlign: 'center',
                    fontSize: '13px', letterSpacing: '1px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    ✓ {message}
                </div>
            )}

            {/* Filter Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                borderBottom: '1px solid #e8ddd4',
                flexWrap: 'wrap',
                gap: '12px',
                backgroundColor: '#fff'
            }}>
                {/* Category Filters */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '7px 18px',
                                border: filter === cat
                                    ? '1px solid #5C4033'
                                    : '1px solid #e0d0c5',
                                borderRadius: '30px',
                                background: filter === cat ? '#5C4033' : 'white',
                                color: filter === cat ? 'white' : '#9c7b6b',
                                fontSize: '12px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                fontFamily: 'Arial, sans-serif',
                                transition: 'all 0.2s ease'
                            }}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                        fontSize: '12px', color: '#9c7b6b',
                        letterSpacing: '1px', textTransform: 'uppercase',
                        fontFamily: 'Arial, sans-serif'
                    }}>Sort:</span>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        style={{
                            padding: '7px 14px',
                            border: '1px solid #e0d0c5',
                            borderRadius: '30px',
                            fontSize: '12px',
                            color: '#5C4033',
                            fontFamily: 'Arial, sans-serif',
                            outline: 'none',
                            background: 'white',
                            cursor: 'pointer',
                            letterSpacing: '0.5px'
                        }}>
                        <option value="default">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name A-Z</option>
                        <option value="in-stock">In Stock Only</option>
                    </select>

                    {/* Item Count */}
                    <span style={{
                        fontSize: '12px', color: '#b89880',
                        letterSpacing: '0.5px',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        {filtered.length} items
                    </span>
                </div>
            </div>

            {/* No Results */}
            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌿</div>
                    <p style={{
                        color: '#b89880', fontSize: '14px',
                        letterSpacing: '1px', fontFamily: 'Arial, sans-serif'
                    }}>
                        No arrangements found
                    </p>
                </div>
            )}

            {/* Product Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                padding: '32px 40px',
                backgroundColor: '#fdfaf7'
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
                            overflow: 'hidden',
                            borderRadius: '4px',
                            boxShadow: hoveredId === product.id
                                ? '0 12px 40px rgba(92,64,51,0.15)'
                                : '0 2px 12px rgba(0,0,0,0.06)',
                            transition: 'all 0.3s ease',
                            transform: hoveredId === product.id
                                ? 'translateY(-4px)' : 'translateY(0)'
                        }}>

                        {/* Square Image */}
                        <div style={{
                            position: 'relative',
                            paddingBottom: '100%',
                            overflow: 'hidden',
                            backgroundColor: '#f9f5f1'
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
                                            ? 'scale(1.07)' : 'scale(1)',
                                        transition: 'transform 0.6s ease'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0,
                                    width: '100%', height: '100%',
                                    background: 'linear-gradient(135deg, #f9f0e8, #f0e6d8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '64px'
                                }}>
                                    🌸
                                </div>
                            )}

                            {/* Sold Out */}
                            {product.quantity === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(255,255,255,0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        background: '#5C4033',
                                        color: 'white',
                                        padding: '8px 20px',
                                        fontSize: '11px',
                                        letterSpacing: '3px',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Arial, sans-serif'
                                    }}>Sold Out</span>
                                </div>
                            )}

                            {/* Low Stock */}
                            {product.quantity < 20 && product.quantity > 0 && (
                                <div style={{
                                    position: 'absolute', top: '12px', left: '12px',
                                    background: '#c0392b', color: 'white',
                                    padding: '4px 10px', fontSize: '10px',
                                    letterSpacing: '2px', textTransform: 'uppercase',
                                    fontFamily: 'Arial, sans-serif', borderRadius: '2px'
                                }}>
                                    Low Stock
                                </div>
                            )}

                            {/* Add to Cart Slides Up */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0,
                                transform: hoveredId === product.id
                                    ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.35s ease'
                            }}>
                                {product.quantity > 0 && (
                                    <button
                                        onClick={() => addToCart(product.id, product.name)}
                                        style={{
                                            width: '100%', padding: '16px',
                                            background: 'rgba(92, 64, 51, 0.93)',
                                            color: 'white', border: 'none',
                                            fontSize: '11px', letterSpacing: '3px',
                                            textTransform: 'uppercase', cursor: 'pointer',
                                            fontFamily: 'Arial, sans-serif',
                                            fontWeight: '600'
                                        }}>
                                        + Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: '18px 20px 22px' }}>
                            <h6 style={{
                                fontSize: '16px', color: '#3d2314',
                                marginBottom: '5px', fontWeight: 'normal',
                                letterSpacing: '0.5px'
                            }}>
                                {product.name}
                            </h6>
                            <p style={{
                                color: '#9c7b6b', fontSize: '13px',
                                margin: 0, fontFamily: 'Arial, sans-serif',
                                letterSpacing: '0.3px'
                            }}>
                                from ₹{product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ height: '60px' }} />
        </div>
    );
}

export default Shop;