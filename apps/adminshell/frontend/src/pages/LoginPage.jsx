import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authFetch = useAuthFetch();
    const navigate = useNavigate();
    const { verifyToken } = useAuth();   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await authFetch('/api/auth/login', {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
        if (response && response.ok) {
                const data = await response.json();
                console.log('Login success:', data);

                await verifyToken();    
                
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
            <form 
                onSubmit={e => handleSubmit(e)} 
                className="flex flex-col items-center justify-center border border-gray-300 rounded-xl w-100 p-20 bg-white shadow-lg gap-6"
            >
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium">Email</label>
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium">Password</label>
                    <input 
                        type="password" 
                        className="border border-gray-300 rounded px-3 py-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="rounded-xl w-2/5 border border-gray-300 hover:bg-gray-100">Login</button>
            </form>
        </div>
    )
}