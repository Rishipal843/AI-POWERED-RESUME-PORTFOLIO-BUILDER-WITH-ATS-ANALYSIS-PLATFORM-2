import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user_context from '../UseContext'; // Import your context

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { notlogin } = useContext(user_context); // Get setlogin
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/verify",
                    {},
                    { withCredentials: true }
                );

                if (response.data.status === true) {
                    setIsAuthorized(true);
                    notlogin(true); // CRITICAL: This updates your Navbar!
                } else {
                    setIsAuthorized(false);
                    notlogin(false); 
                    navigate("/login");
                }
            } catch (err) {
                console.error("Auth Error:", err);
                setIsAuthorized(false);
                notlogin(false);
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate, notlogin]);

    if (isAuthorized === null) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2>Verifying Security...</h2>
            </div>
        );
    }

    return isAuthorized ? children : null;
};


export default ProtectedRoute;