import { useAuth } from "../../context/AuthContext";
import { fetchApi } from "../api/fetchApi";
import { useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react'


export default function Logout(props) {
    const navigate = useNavigate();
    const {setIsSignIn, setUserType} = useAuth();

    const handleLogout = async () => {
        try {
            await fetchApi("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            
            setIsSignIn(false);
            setUserType("customer");
            navigate('/');
        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    return (
        <button className={props.className} onClick={() => handleLogout()}><LogOut size={14} strokeWidth={1.5} /></button>
    )
}