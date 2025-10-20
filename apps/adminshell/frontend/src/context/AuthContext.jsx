import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [ isSignIn, setIsSignIn ] = useState(false);
    const [ adminType, setAdminType ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/auth/verify-token", {
                credentials: 'include',
            });

            const data = await response.json();
            
            if (data.error) {
                console.log(data);
                setIsSignIn(false);
                return;
            }
            setAdminType(data.adminType);
            setIsSignIn(true);
            console.log({message: "success", userType: data.adminType});
        } catch (err) {
            if (err.message === "Session expired. Please log in again.") {
                setIsSignIn(false);
                setAdminType(null);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                isSignIn,
                setIsSignIn,
                adminType,
                setAdminType,
                isLoading,
                verifyToken, 
            }}
        >
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