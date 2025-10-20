import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi";
import { Link } from "react-router-dom";
import { Bell, ShoppingBag, UserRound, Store } from "lucide-react";
import NotificationsCards from "./NotificationsCards";

export default function BusinessNav() {
    const [open, setOpen] = useState(false);

    const [ notifications, setNotifications ] = useState([]);

    useEffect(() => {
        getNotifications();
    }, [])

    const getNotifications = async () => {
        try {
            const response = await fetchWithAuth('/api/business/notifications');
            console.log(response)
            const notifications = await response.json();
            console.log(notifications);
            setNotifications(notifications.data);
        } catch (err) {
            console.log(err);
        }
    }

    const readNoitifications = async () => {
        try {
            const response = await fetchWithAuth('/api/business/notifications/read-all', {
                method: 'POST'
            });
            if (response.ok) {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
            }
        } catch (err) {
            console.log(err);
        } 
    }

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
                                {notifications ? <NotificationsCards notifications={notifications}/> : <h2>Nessuna notifica</h2>}
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
