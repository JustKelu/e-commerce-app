import { Link } from "react-router-dom"
import { useState } from "react"

export default function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressZip, setAddressZip] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const checkBox = document.getElementById('account-type');
            const userData = {
                name: name,
                surname: surname,
                addressStreet: address,
                addressNumber: parseInt(addressNumber),
                addressCity: addressCity,
                addressZip: addressZip,
                phoneNumber: phone,
                email: email,
                password: password,
                userType: checkBox.checked ? "customer" : "user",
            };
            console.log('Sending userData:', userData);
            await fetch('http://localhost:8000/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    addressStreet: address,
                    addressNumber: parseInt(addressNumber),
                    addressCity: addressCity,
                    addressZip: addressZip,
                    phoneNumber: phone,
                    email: email,
                    password: password,
                    userType: checkBox.checked ? "business" : "user",
                }),
            });
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }
    };

    return (
        <section className="register-section">
            <main className="register-content">
                <header className="register-header">
                    <h1>e-commerce</h1>
                    <h2>Register</h2>
                </header>
                
                <form onSubmit={handleRegister} className="register-form">
                    <div className="register-credentials">
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
                    </div>
                    
                    <fieldset className="personal-data">
                        <legend>Personal Information</legend>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input 
                                id="surname" 
                                type="text" 
                                placeholder="Surname" 
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone-number">Mobile</label>
                            <input 
                                id="phone-number" 
                                type="tel" 
                                placeholder="Phone number" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </fieldset>
                    
                    <fieldset className="register-address">
                        <legend>Address Information</legend>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input 
                                id="address" 
                                type="text" 
                                placeholder="Street address" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address-number">Number</label>
                            <input 
                                id="address-number" 
                                type="text" 
                                placeholder="House number" 
                                value={addressNumber}
                                onChange={(e) => setAddressNumber(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address-city">City</label>
                            <input 
                                id="address-city" 
                                type="text" 
                                placeholder="City" 
                                value={addressCity}
                                onChange={(e) => setAddressCity(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address-zip">ZIP Code</label>
                            <input 
                                id="address-zip" 
                                type="text" 
                                placeholder="ZIP code" 
                                value={addressZip}
                                onChange={(e) => setAddressZip(e.target.value)}
                                required 
                            />
                        </div>
                    </fieldset>

                    <fieldset className="regiser-account-type">
                        <legend>Account Type</legend>
                        <label htmlFor="account-type">Business Account</label>
                            <input 
                                id="account-type" 
                                type="checkbox" 
                                placeholder="account-type"
                            />
                    </fieldset>

                    <button type="submit">Register</button>
                </form>
                
                <footer className="register-footer">
                    <nav>
                        <Link className="go-to-login" to="/login">
                            Already registered?
                        </Link>
                    </nav>
                </footer>
            </main>
        </section>
    )
}