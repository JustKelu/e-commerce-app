import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const response = await fetch("http://localhost:8000/api/auth/verify-token", {
                headers: {
                    "Authorization": `Beraer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            
            const data = await response.json();
            console.log(data)
            if (!data) return

            setIsSignIn(true);
            console.log("You are alredy logged in!");
        } catch (err) {
            console.log(err)
            console.log("Internal server error on Auto-Auth");
        }
    } 
    return (
        <AuthContext.Provider value={{
            isSignIn,
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