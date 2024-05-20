import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../features/auth/authSlice'; 
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function LoginForm({ onSignupClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', formData);
            console.log(response.data);
            const { token, user } = response.data;

            // Store the token in a cookie instead of local storage
            Cookies.set('jwtToken', token, { expires: 1 }); // Expires in 1 day
            toast.success('Logged in successfully!');

            if (user) {
                if (user !== null) {
                    dispatch(clearUser());
                }
                dispatch(setUser(user));
            }

            navigate('/api/dashboard');
        } catch (error) {
            toast.error('Invalid credentials, try again');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="mt-4 mb-4 text-center">
                    <p className="text-gray-700">
                        Don't have an account?{' '}
                        <button
                            onClick={onSignupClick}
                            className="text-blue-500 hover:text-blue-700 font-bold"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
