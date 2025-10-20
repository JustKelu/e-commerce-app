import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../shared/api/fetchApi"

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [openShippingDropdown, setOpenShippingDropdown] = useState(null);

    
    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response = await fetchWithAuth('/api/user/my-orders');

            const data = await response.json();
            console.log(data)
            setOrders(data.response);

        } catch (err) {
            console.log(err);
        }
    }

    const toggleShippingDropdown = (orderId) => {
        setOpenShippingDropdown(openShippingDropdown === orderId ? null : orderId);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('it-IT', {
            timeZone: 'Europe/Rome'
        });
    }

    return (
        <div className="flex justify-center items-center">
            <div className="p-2 text-center w-2/5 "> 
                {orders.map(order => (
                    <div className="mt-3 gap-3" key={order.id}>
                        <div className="flex items-center justify-center gap-20 border border-black border-b-0 rounded-t-xl bg-gray-200 p-2 text-xs">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">ORDINE EFFETTUATO IL:</span>
                                <time>{formatDate(order.created_at)}</time>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">TOTALE:</span>
                                <span>€ {order.total_amount}</span>
                            </div>
                            <div className="flex flex-col items-center relative">
                                <span className="font-semibold">SPEDITO A:</span>
                                <span 
                                    className="cursor-pointer text-blue-600 hover:bg-gray-300 hover:text-blue-800 px-2 py-1 rounded transition-colors underline"
                                    onClick={() => toggleShippingDropdown(order.id)}
                                >
                                    Dettagli
                                </span>
                                
                                {/* Dropdown */}
                                {openShippingDropdown === order.id && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
                                        <div className="text-left">
                                            <h4 className="font-semibold mb-2 text-sm">Dettagli Spedizione</h4>
                                            {order.shipping_addresses.map((shipping, i) => (
                                                i == 0 ? <div key={shipping.shipping_id} className="mb-3 last:mb-0">
                                                    <div className="text-xs space-y-1">
                                                        <p><strong>Indirizzo:</strong> {shipping.address}</p>
                                                        <p><strong>Città:</strong> {shipping.city}, {shipping.postal_code}</p>
                                                        <p>
                                                            <strong>Status:</strong> 
                                                            <span className={`ml-1 font-medium`}>
                                                                {shipping.status}
                                                            </span>
                                                        </p>
                                                        {shipping.tracking_number && (
                                                            <p><strong>Tracking:</strong> {shipping.tracking_number}</p>
                                                        )}
                                                    </div>
                                                </div> : null
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold">ORDINE #:</span>
                                <span>{order.id}</span>
                            </div>
                        </div>
                        <div className="rounded-b-xl border border-black">
                            {order.products.map((product, i) => (
                                <div 
                                    key={product.product_id} 
                                    className={
                                        i < order.products.length - 1 ? 
                                        "grid grid-cols-[auto_1fr_auto] border border-b-black p-4 gap-6 items-center min-h-[100px]" : 
                                        "grid grid-cols-[auto_1fr_auto] p-4 gap-6 items-center min-h-[100px]"}
                                >
                                    <img src={product.image_url} alt="Immagine Prodotto" className="object-contain h-[70px] w-auto"/>
                                    <h2 className="truncate">{product.name}</h2>
                                    <p className="text-green-600 whitespace-nowrap">Arriverà Lunedì</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}