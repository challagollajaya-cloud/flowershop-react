import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [form, setForm] = useState({
        username: '', password: '', email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io/api/auth/register', form)
            .then(res => setMessage('Registered successfully!'))
            .catch(err => setMessage('Registration failed!'));
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow mt-5">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4"
                            style={{ color: '#1B3A5C' }}>
                            🌸 Register
                        </h3>
                        {message && (
                            <div className="alert alert-info">{message}</div>
                        )}
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" name="username"
                                       className="form-control"
                                       onChange={handleChange}
                                       placeholder="Enter username" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email"
                                       className="form-control"
                                       onChange={handleChange}
                                       placeholder="Enter email" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password"
                                       className="form-control"
                                       onChange={handleChange}
                                       placeholder="Enter password" />
                            </div>
                            <button type="submit"
                                    className="btn btn-primary w-100"
                                    style={{ backgroundColor: '#1B3A5C' }}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;