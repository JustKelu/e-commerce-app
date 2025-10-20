import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext'; // Aggiusta il path
import { LayoutDashboard, ShoppingBasket, Warehouse, Gift, Truck, ReceiptEuro, DoorOpen } from 'lucide-react';

export default function AdminNav() {
    const location = useLocation();
    const { adminType } = useAuth();

    // Navigation items con controllo ruoli
    const navItems = [
        {
            path: '/',
            label: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <LayoutDashboard size={20}/>
                </svg>
            ),
            allowedRoles: ['base', 'super']
        },
        {
            path: '/products',
            label: 'Prodotti',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <ShoppingBasket size={20}/>
                </svg>
            ),
            allowedRoles: ['base', 'super']
        },
        {
            path: '/orders',
            label: 'Ordini',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <Warehouse size={20}/>
                </svg>
            ),
            allowedRoles: ['base', 'super']
        },
        {
            path: '/shipments',
            label: 'Spedizioni',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <Truck size={20}/>
                </svg>
            ),
            allowedRoles: ['base', 'super']
        },
        {
            path: '/profit',
            label: 'Fatturato',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <ReceiptEuro size={20}/>    
                </svg>
            ),
            allowedRoles: ['super']
        },
        {
            path: '/giftcard',
            label: 'Gift Cards',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <Gift size={20}/>
                </svg>
            ),
            allowedRoles: ['super']
        }
    ];

    const filteredNavItems = navItems.filter(item => 
        item.allowedRoles.includes(adminType)
    );

    return (
        <nav className="bg-white shadow-lg border-r border-gray-200 max-h-screen w-64 sticky top-0 z-20">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-500 mt-1">
                    {adminType === 'super' ? 'Super Admin' : 'Base Admin'}
                </p>
            </div>

            {/* Navigation Links */}
            <div className="p-4">
                <ul className="space-y-2">
                    {filteredNavItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            {adminType === 'super' ? 'S' : 'A'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">{adminType} access</p>
                    </div>
                    <button className="rounded-xl hover:text-red-600 hover:cursor-pointer hover:bg-red-100 transition"><DoorOpen size={25}/></button>
                </div>
            </div>
        </nav>
    );
}