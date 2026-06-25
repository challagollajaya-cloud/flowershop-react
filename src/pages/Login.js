import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Spring Security needs form data!
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        try {
            const response = await fetch(
                'https://flowershop-api.politegrass-1122600a.uksouth.azurecontainerapps.io/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded'
                    },
                    body: params,
                    credentials: 'include'
                });

            if (response.ok ||
                response.url.includes('/api/products')) {
                localStorage.setItem('username', username);
                setLoading(false);
                navigate('/shop');
            } else {
                setError('Invalid username or password!');
                setLoading(false);
            }
        } catch (err) {
            setError('Login failed! Check connection.');
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow border-0 mt-5"
                     style={{ borderRadius: '12px' }}>
                    <div className="card-body p-4">

                        <div className="text-center mb-4">
                            <div style={{ fontSize: '48px' }}>
                                🌸
                            </div>
                            <h3 className="fw-bold"
                                style={{ color: '#1B3A5C' }}>
                                Welcome Back!
                            </h3>
                            <p className="text-muted">
                                Login to your account
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                ❌ {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={e =>
                                        setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={e =>
                                        setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="btn w-100 text-white fw-bold py-2"
                                style={{
                                    backgroundColor: '#1B3A5C',
                                    borderRadius: '8px'
                                }}
                                disabled={loading}>
                                {loading ? 'Logging in...' : 'Login 🌸'}
                            </button>
                        </form>

                        <p className="text-center mt-3 text-muted">
                            No account?{' '}
                            <a href="/register"
                               style={{ color: '#1B3A5C' }}>
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;