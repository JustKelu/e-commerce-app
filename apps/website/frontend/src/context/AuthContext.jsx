import { createContext, useContext, useState, useEffect } from "react";
import { fetchWithAuth } from "../shared/api/fetchApi";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userType, setUserType] = useState("customer");

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        setIsLoading(true);
        try {
            const response = await fetchWithAuth("/api/auth/verify-token", {
                credentials: 'include',
            });
            const data = await response.json();
            if (data.error) return console.log(data);
            setUserType(data.userType);
            setIsSignIn(true);
        } catch (err) {
            if (err.message === "Session expired. Please log in again.") {
                setIsSignIn(false);
                setUserType("customer");
            }
            console.log("Internal server error on Auto-Auth");
        } finally {
            setIsLoading(false);
        };
    };
    return (
        <AuthContext.Provider value={{
            userType,
            isSignIn,
            isLoading,
            setIsSignIn,
            setUserType,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};