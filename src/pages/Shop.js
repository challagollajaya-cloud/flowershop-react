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
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/login');
            return;
        }

        axios.post(
            `${API}/api/cart/add`,
            null,
            {
                params: {
                    productId: productId,
                    quantity: 1
                },
                withCredentials: true
            }
        )
            .then(() => {
                setMessage(productName + ' added to cart! 🛒');
                setTimeout(() => setMessage(''), 2000);
            })
            .catch(() => {
                setMessage('Please login first!');
                setTimeout(() => {
                    setMessage('');
                    navigate('/login');
                }, 1500);
            });
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border"
                     style={{ color: '#1B3A5C' }}>
                </div>
                <p>Loading flowers...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: '#1B3A5C' }}>
                    🌸 Our Flowers
                </h2>
                <span className="badge"
                      style={{
                          backgroundColor: '#1B3A5C',
                          fontSize: '14px'
                      }}>
                    {products.length} flowers
                </span>
            </div>

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="🔍 Search flowers..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ borderColor: '#1B3A5C' }}
                />
            </div>

            {filtered.length === 0 && (
                <div className="text-center mt-5">
                    <h4 className="text-muted">
                        No flowers found for "{search}"
                    </h4>
                </div>
            )}

            <div className="row">
                {filtered.map(product => (
                    <div className="col-md-4 mb-4"
                         key={product.id}>
                        <div
                            className="card h-100 shadow-sm border-0"
                            style={{ borderRadius: '12px' }}>

                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '12px 12px 0 0'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    backgroundColor: '#1B3A5C',
                                    borderRadius: '12px 12px 0 0',
                                    padding: '20px',
                                    textAlign: 'center',
                                    fontSize: '48px'
                                }}>
                                    🌸
                                </div>
                            )}

                            <div className="card-body d-flex flex-column p-3">
                                <h5 className="card-title fw-bold mb-1">
                                    {product.name}
                                </h5>
                                <span className="badge mb-2"
                                      style={{
                                          backgroundColor: '#2E7D8C',
                                          width: 'fit-content'
                                      }}>
                                    {product.category}
                                </span>
                                <p className="card-text text-muted small flex-grow-1">
                                    {product.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fw-bold fs-5 text-success">
                                        ₹{product.price}
                                    </span>
                                    <span className="text-muted small">
                                        Stock: {product.quantity}
                                    </span>
                                </div>
                                <button
                                    className="btn w-100 text-white fw-bold"
                                    style={{
                                        backgroundColor: '#1B3A5C',
                                        borderRadius: '8px'
                                    }}
                                    onClick={() => addToCart(product.id, product.name)}
                                    disabled={product.quantity === 0}>
                                    {product.quantity === 0
                                        ? 'Out of Stock'
                                        : '🛒 Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;