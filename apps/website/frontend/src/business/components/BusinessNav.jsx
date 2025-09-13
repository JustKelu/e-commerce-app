import { Link } from "react-router-dom";
import { Bell, ShoppingBag, UserRound, Store } from "lucide-react";
import { useState } from "react";

export default function BusinessNav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
            {/* Logo + Home */}
            <div className="flex items-center gap-6">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
                <Link to="/" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <Store size={28} strokeWidth={1.5} />
                </Link>
            </div>

            {/* Titolo */}
            <div>
                <h1 className="text-center font-semibold">E-COMMERCE BUSINESS ZONE</h1>
            </div>

            {/* Azioni */}
            <div className="flex items-center gap-4 relative">
                {/* Notifiche */}
                <div className="relative">
                    <button 
                        className="relative mt-1 pr-1 hover:text-blue-600"
                        onClick={() => setOpen(!open)}
                    >
                        <Bell size={24} strokeWidth={1.5} />
                        {/* Badge numerico */}
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                            3
                        </span>
                    </button>

                    {/* Dropdown notifiche */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
                            <h2 className="font-semibold mb-2">Notifiche</h2>
                            <ul className="divide-y divide-gray-200 text-sm">
                                <li className="py-2">
                                    <p className="font-medium">📦 Nuovo ordine ricevuto</p>
                                    <p className="text-gray-600">Hai ricevuto un nuovo ordine #1042 da Mario Rossi</p>
                                    <span className="text-xs text-gray-400">2 min fa</span>
                                </li>
                                <li className="py-2">
                                    <p className="font-medium">⏳ Ordine in attesa</p>
                                    <p className="text-gray-600">L'ordine #1039 deve essere spedito entro 24h</p>
                                    <span className="text-xs text-gray-400">1 ora fa</span>
                                </li>
                                <li className="py-2">
                                    <p className="font-medium">🛒 Prodotto in esaurimento</p>
                                    <p className="text-gray-600">Sneakers X (5 pezzi rimasti)</p>
                                    <span className="text-xs text-gray-400">Ieri</span>
                                </li>
                                <li className="py-2">
                                    <p className="font-medium">💳 Pagamento ricevuto</p>
                                    <p className="text-gray-600">Nuovo payout: €1.250 inviato</p>
                                    <span className="text-xs text-gray-400">2 giorni fa</span>
                                </li>
                            </ul>
                            <div className="text-center mt-3">
                                <Link to="/notifications" className="text-blue-600 text-sm font-medium hover:underline">
                                    Vedi tutte le notifiche
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Showcase */}
                <Link to="/showcase" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <ShoppingBag size={28} strokeWidth={1.5}/>
                </Link>

                {/* Profilo */}
                <Link to="/profile" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                    <UserRound size={30} strokeWidth={1.5} />
                </Link>
            </div>
        </nav>
    );
}
