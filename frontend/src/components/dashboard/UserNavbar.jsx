import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../features/auth/authSlice';

const UserNavbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            dispatch(clearUser());
            navigate('/');
        } catch (error) {
            console.log('Error logging out: ', error);
        }
    };

    return (
        <nav className="w-64 border-2 h-28 border-cyan-300 rounded-full p-4">
            <div className="flex flex-col">
                <div className="text-white">
                    {user && (
                        <div className="flex flex-col">
                            <span>{user.username}</span>
                            <span>{user.email}</span>
                        </div>
                    )}
                </div>
                <div className="text-white">
                    <button className="text-red-500 hover:text-red-700" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
