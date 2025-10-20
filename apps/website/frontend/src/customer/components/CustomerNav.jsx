import { useState } from "react";
import { Store, ShoppingCart, TextSearch, UserRound } from 'lucide-react';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function CustomerNav() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchTerm}`);

    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-20">
            <div id="test" className="flex items-center gap-6">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
                <Link to="/" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <Store size={28} strokeWidth={1.5} />
                </Link>
            </div>
            <form className="flex items-center mx-auto w-full max-w-md" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    className="border border-gray-300 rounded-l-lg rounded-r-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="px-2 items-center">
                    <TextSearch size={40} strokeWidth={1} />
                </button>
            </form>
            <div className="flex items-center gap-4">
                <Link to="/cart" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <ShoppingCart size={28} strokeWidth={1.5} />
                </Link>
                <Link to="/profile" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <UserRound size={30} strokeWidth={1.5} />
                </Link>
            </div>
        </nav>
    );
}