import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        axios.get('https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io/api/cart', {
            withCredentials: true
        })
            .then(res => {
                console.log('Cart data:', res.data);
                const data = res.data;
                if (Array.isArray(data)) {
                    setCartItems(data);
                    const sum = data.reduce((acc, item) =>
                        acc + (item.product.price *
                            item.quantity), 0);
                    setTotal(sum);
                } else if (data &&
                    Array.isArray(data.items)) {
                    setCartItems(data.items);
                    setTotal(data.total || 0);
                } else {
                    setCartItems([]);
                    setTotal(0);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log('Cart error:',
                    err.response?.status);
                setLoading(false);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            });
    };

    const removeItem = (cartId) => {
        axios.delete(
            'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io/api/cart/' + cartId,
            { withCredentials: true }
        )
            .then(() => {
                setMessage('Item removed!');
                loadCart();
                setTimeout(() => setMessage(''), 2000);
            })
            .catch(() => {
                setMessage('Failed to remove!');
            });
    };

    const checkout = () => {
        axios.post(
            'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io/api/orders/checkout',
            {},
            { withCredentials: true }
        )
            .then(() => {
                setMessage('Order placed! 🎉');
                setCartItems([]);
                setTotal(0);
                setTimeout(() =>
                    navigate('/orders'), 2000);
            })
            .catch(() => {
                setMessage('Checkout failed!');
            });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border"
                     style={{ color: '#1B3A5C' }}>
                </div>
                <p>Loading cart...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4"
                style={{ color: '#1B3A5C' }}>
                🛒 Your Cart
            </h2>

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {cartItems.length === 0 ? (
                <div className="text-center mt-5">
                    <div style={{ fontSize: '64px' }}>
                        🛒
                    </div>
                    <h4 className="text-muted">
                        Your cart is empty!
                    </h4>
                    <button
                        className="btn mt-3 text-white"
                        style={{
                            backgroundColor: '#1B3A5C'
                        }}
                        onClick={() => navigate('/shop')}>
                        Continue Shopping 🌸
                    </button>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {cartItems.map(item => (
                            <div
                                className="card mb-3 shadow-sm border-0"
                                key={item.id}
                                style={{
                                    borderRadius: '12px'
                                }}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1 fw-bold">
                                                🌸 {item.product.name}
                                            </h5>
                                            <p className="text-muted mb-1">
                                                ₹{item.product.price}
                                                {' '}&times;{' '}
                                                {item.quantity}
                                            </p>
                                            <span className="fw-bold text-success">
                                                ₹{item.product.price * item.quantity}
                                            </span>
                                        </div>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                removeItem(item.id)}>
                                            &times; Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <div
                            className="card shadow-sm border-0"
                            style={{ borderRadius: '12px' }}>
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3"
                                    style={{
                                        color: '#1B3A5C'
                                    }}>
                                    Order Summary
                                </h5>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Items ({cartItems.length})</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery</span>
                                    <span className="text-success">
                                        FREE
                                    </span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                                    <span>Total</span>
                                    <span style={{ color: '#1B3A5C' }}>
                                        ₹{total}
                                    </span>
                                </div>
                                <button
                                    className="btn w-100 text-white fw-bold py-2"
                                    style={{
                                        backgroundColor: '#1B3A5C',
                                        borderRadius: '8px'
                                    }}
                                    onClick={checkout}>
                                    Place Order 🌸
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;