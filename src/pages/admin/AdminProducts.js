import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [form, setForm] = useState({
        name: '', description: '', price: '',
        quantity: '', category: '', imageUrl: ''
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        axios.get(`${API}/api/products`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            price: parseFloat(form.price),
            quantity: parseInt(form.quantity)
        };

        if (editProduct) {
            axios.put(`${API}/api/admin/products/${editProduct.id}`,
                data, { withCredentials: true })
                .then(() => {
                    setMessage('Product updated! ✅');
                    resetForm();
                    loadProducts();
                })
                .catch(() => setMessage('Failed! Login as admin first!'));
        } else {
            axios.post(`${API}/api/admin/products`,
                data, { withCredentials: true })
                .then(() => {
                    setMessage('Product added! ✅');
                    resetForm();
                    loadProducts();
                })
                .catch(() => setMessage('Failed! Login as admin first!'));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this product?')) {
            axios.delete(`${API}/api/admin/products/${id}`,
                { withCredentials: true })
                .then(() => {
                    setMessage('Product deleted! ✅');
                    loadProducts();
                })
                .catch(() => setMessage('Failed!'));
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            imageUrl: product.imageUrl || ''
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setForm({
            name: '', description: '', price: '',
            quantity: '', category: '', imageUrl: ''
        });
        setEditProduct(null);
        setShowForm(false);
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: '#1B3A5C' }}>
                    🌸 Admin — Products
                </h2>
                <button
                    className="btn text-white"
                    style={{ backgroundColor: '#1B3A5C' }}
                    onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Product'}
                </button>
            </div>

            {message && (
                <div className="alert alert-success">{message}</div>
            )}

            {showForm && (
                <div className="card shadow mb-4 border-0">
                    <div className="card-body p-4">
                        <h5 className="fw-bold mb-3">
                            {editProduct ? 'Edit Product' : 'Add New Product'}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Product name"
                                        value={form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                        required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Category"
                                        value={form.category}
                                        onChange={e => setForm({...form, category: e.target.value})}
                                        required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Price"
                                        type="number"
                                        value={form.price}
                                        onChange={e => setForm({...form, price: e.target.value})}
                                        required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Quantity"
                                        type="number"
                                        value={form.quantity}
                                        onChange={e => setForm({...form, quantity: e.target.value})}
                                        required />
                                </div>
                                <div className="col-12 mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Image URL"
                                        value={form.imageUrl}
                                        onChange={e => setForm({...form, imageUrl: e.target.value})}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Description"
                                        value={form.description}
                                        onChange={e => setForm({...form, description: e.target.value})}
                                        required />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn text-white"
                                style={{ backgroundColor: '#1B3A5C' }}>
                                {editProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead style={{ backgroundColor: '#1B3A5C', color: 'white' }}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => handleEdit(product)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProducts;