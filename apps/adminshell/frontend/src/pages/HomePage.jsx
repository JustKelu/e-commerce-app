import { useEffect, useState } from 'react';
import { useAuthFetch } from '../hooks/useAuthFetch';
import { Search, Package, Eye, Edit, Download, RefreshCw, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('product');
    const [selectedTab, setSelectedTab] = useState('overview');
    const [recentOrders, setRecentOrders] = useState([]);
    const authFetch = useAuthFetch();
    

    useEffect(() => {
        getRecentOrders();
    }, []);

    const getRecentOrders = async () => {
        const response = await authFetch('/api/dashboard/recent-orders');
        const data = await response.json();
        console.log(data)
        setRecentOrders(data.result);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'shipped': return 'text-blue-600 bg-blue-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            case 'processing': return 'text-purple-600 bg-purple-100';
            case 'active': return 'text-green-600 bg-green-100';
            case 'out_of_stock': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'shipped': return <Package className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            case 'processing': return <RefreshCw className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const handleSearch = () => {
        // Simulazione ricerca
        console.log(`Searching for: ${searchTerm} in ${searchType}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                    <p className="text-gray-600">Pannello di supporto e gestione sistema</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Inserisci ID, nome prodotto, email cliente..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <select 
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="product">Prodotti</option>
                            <option value="order">Ordini</option>
                            <option value="user">Utenti</option>
                            <option value="all">Tutto</option>
                        </select>
                        <button 
                            onClick={handleSearch}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Cerca
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {['overview', 'orders', 'users'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                        selectedTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab === 'overview' && 'Panoramica'}
                                    {tab === 'orders' && 'Ordini'}
                                    {tab === 'users' && 'Utenti'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {selectedTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Ordini Recenti</h3>
                                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                        <Download className="w-4 h-4" />
                                        Esporta
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID Ordine</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Cliente</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Stato</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Importo</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Data</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Azioni</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recentOrders.map((order) => (
                                                <tr key={order.orderid} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{order.orderid}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{`${order.name}  ${order.surname}`}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {getStatusIcon(order.status)}
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">€ {order.total}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button className="text-blue-600 hover:text-blue-700">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button className="text-gray-600 hover:text-gray-700">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'users' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Gestione Utenti</h3>
                                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                        <Download className="w-4 h-4" />
                                        Esporta Lista
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nome</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ordini</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Totale Speso</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Registrato</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Azioni</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{user.id}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{user.orders}</td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{user.spent}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{user.joined}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button className="text-blue-600 hover:text-blue-700">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button className="text-gray-600 hover:text-gray-700">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selectedTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Tutti gli Ordini</h3>
                                    <div className="flex gap-2">
                                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                            <option>Tutti gli stati</option>
                                            <option>Completati</option>
                                            <option>In attesa</option>
                                            <option>Spediti</option>
                                            <option>Cancellati</option>
                                        </select>
                                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                            <Download className="w-4 h-4" />
                                            Esporta
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-blue-700">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="font-medium">Filtri Rapidi:</span>
                                    </div>
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-sm text-blue-700 hover:bg-blue-100">
                                            Ordini di oggi
                                        </button>
                                        <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-sm text-blue-700 hover:bg-blue-100">
                                            In ritardo
                                        </button>
                                        <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-sm text-blue-700 hover:bg-blue-100">
                                            Alto valore (€500)
                                        </button>
                                        <button className="px-3 py-1 bg-white border border-blue-300 rounded-md text-sm text-blue-700 hover:bg-blue-100">
                                            Problematici
                                        </button>
                                    </div>
                                </div>
                                {/* Qui si ripete la tabella degli ordini */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}