import { useEffect, useState } from "react"
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function OrdersCard() {
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState(new Set());
    const authFetch = useAuthFetch();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await authFetch('/api/orders/orders', {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setOrders(data)
    }

    const toggleOrderDetails = (orderId) => {
        setExpandedOrders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                newSet.add(orderId);
            }
            return newSet;
        });
    };

    const processOrder = async (orderId) => {
        const response = await authFetch('/api/orders/process-order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId
            }),
            credentials: "include",
        });
        if (response.ok) {
            const filteredOrders = orders.filter(order => order.id !== orderId);
            setOrders(filteredOrders);

            const message = await response.json();
            console.log(message)
        }
    };

    return (
        <>
            {!orders[0] ? <h1>Nessun ordine da processare.</h1> : 
                orders.map((order, i) => {
                    const items = order.products.reduce((total, product) => total + product.qty, 0);
                    return (
                        <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                            {/* Header dell'ordine */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-gray-500">Ordine #{order.id}</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            {order.status}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {items} oggett{items !== 1 ? 'i' : 'o'}
                                        </span>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">
                                        €{parseFloat(order.total).toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Lista prodotti (collapsibile) */}
                            {expandedOrders.has(order.id) && (
                                <div className="p-6 border-b border-gray-200">
                                    <div className="space-y-4">
                                        {order.products.map((product, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                {/* Immagine prodotto */}
                                                <div className="flex-shrink-0">
                                                    <img 
                                                        src={product.image_url} 
                                                        alt={product.name}
                                                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                                                    />
                                                </div>
                                                
                                                {/* Info prodotto */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                                        {product.name}
                                                    </h3>
                                                </div>

                                                {/* Badge quantità */}
                                                <div className="flex-shrink-0">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                        x{product.qty}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer con azioni */}
                            <div className="bg-gray-50 px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <button 
                                        onClick={() => toggleOrderDetails(order.id)}
                                        className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {expandedOrders.has(order.id) ? 'Nascondi Dettagli' : 'Dettagli'}
                                    </button>
                                    <button 
                                        onClick={() => processOrder(order.id)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Segna come Processato
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}