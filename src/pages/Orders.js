import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/api/orders`, {
            withCredentials: true
        })
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            });
    }, [navigate]);

    const getBadgeColor = (status) => {
        if (status === 'DELIVERED') return '#2E7D4F';
        if (status === 'CANCELLED') return '#C0392B';
        return '#1B3A5C';
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border"
                 style={{ color: '#1B3A5C' }}>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="mb-4"
                style={{ color: '#1B3A5C' }}>
                📦 My Orders
            </h2>

            {orders.length === 0 ? (
                <div className="text-center mt-5">
                    <div style={{ fontSize: '64px' }}>📦</div>
                    <h4 className="text-muted">No orders yet!</h4>
                    <button
                        className="btn mt-3 text-white"
                        style={{ backgroundColor: '#1B3A5C' }}
                        onClick={() => navigate('/shop')}>
                        Start Shopping 🌸
                    </button>
                </div>
            ) : (
                orders.map(order => (
                    <div className="card mb-4 shadow-sm border-0"
                         key={order.id}
                         style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="fw-bold mb-0">
                                        Order #{order.id}
                                    </h6>
                                    <small className="text-muted">
                                        {order.orderDate}
                                    </small>
                                </div>
                                <span className="badge px-3 py-2"
                                      style={{
                                          backgroundColor: getBadgeColor(order.status)
                                      }}>
                                    {order.status}
                                </span>
                            </div>

                            {order.items && order.items.map(item => (
                                <div className="d-flex justify-content-between py-2 border-bottom"
                                     key={item.id}>
                                    <span>🌸 {item.product.name} × {item.quantity}</span>
                                    <span className="fw-bold">₹{item.price * item.quantity}</span>
                                </div>
                            ))}

                            <div className="d-flex justify-content-between mt-3 fw-bold fs-5">
                                <span>Total</span>
                                <span style={{ color: '#1B3A5C' }}>
                                    ₹{order.totalAmount}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;