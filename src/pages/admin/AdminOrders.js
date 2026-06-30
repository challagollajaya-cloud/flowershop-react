import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io';

const getAuthHeader = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        axios.get(`${API}/api/admin/orders`, getAuthHeader())
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const updateStatus = (orderId, status) => {
        axios.put(`${API}/api/admin/orders/${orderId}/status`,
            { status },
            getAuthHeader())
            .then(() => {
                setMessage(`Order #${orderId} updated! ✅`);
                loadOrders();
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(() => setMessage('Failed to update!'));
    };

    const getStatusBadge = (status) => {
        const colors = {
            'PENDING': 'warning',
            'CONFIRMED': 'primary',
            'DELIVERED': 'success',
            'CANCELLED': 'danger'
        };
        return colors[status] || 'secondary';
    };

    if (loading) return (
        <div className="text-center mt-5">
            <div className="spinner-border"
                 style={{ color: '#1B3A5C' }}></div>
        </div>
    );

    return (
        <div>
            <h2 className="mb-4" style={{ color: '#1B3A5C' }}>
                📦 Admin — Orders
            </h2>

            {message && (
                <div className="alert alert-success">{message}</div>
            )}

            {orders.length === 0 ? (
                <div className="text-center mt-5">
                    <h4 className="text-muted">No orders yet!</h4>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead style={{
                            backgroundColor: '#1B3A5C',
                            color: 'white'
                        }}>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Update Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.user?.username}</td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                        <span className={`badge bg-${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={order.status}
                                        onChange={e => updateStatus(order.id, e.target.value)}
                                        style={{ width: '150px' }}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminOrders;