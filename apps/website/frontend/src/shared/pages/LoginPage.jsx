import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../api/fetchApi";

export default function LoginPage() {
    const { setIsSignIn, setUserType } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchApi("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: "include",
            });

            console.log(response)

            if (response.ok) {
                const data = await response.json();

                setIsSignIn(true);
                setUserType(data.userType);
                
                navigate('/');
            } else {
                if (response.status == 401) {
                    console.log("Error wrong Email or Password.");
                }
            }
        } catch (err) {
            console.log(err)
            console.log("Error internal server error.")
        };
    };

    return (
        <section className="login-section">
            <main className="login-content">
                <header className="login-header">
                    <h1>e-commerce</h1>
                    <h2>Login</h2>
                </header>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                
                <footer className="login-footer">
                    <nav>
                        <Link className="password-recovery" to="/password-recovery">
                            I forgot my password
                        </Link>
                        <Link className="go-to-register" to="/register">
                            Not registered yet?
                        </Link>
                    </nav>
                </footer>
            </main>
        </section>
    )
}