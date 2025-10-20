import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
const url = import.meta.env.VITE_API_URL; 

export const useAuthFetch = () => {
    const { setIsSignIn, setAdminType } = useAuth();
    const navigate = useNavigate();

    const authFetch = async (path, options = {}) => {
        try {
            const response = await fetch(url + path, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (response.status === 401) {
                setIsSignIn(false);
                setAdminType(null);
                navigate('/login');
                return;
            }

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    return authFetch;
};