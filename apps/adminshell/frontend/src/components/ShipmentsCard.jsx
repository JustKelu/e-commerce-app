import { useEffect, useState } from "react"
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function ShipmentsCard() {
    const [shipments, setShipments] = useState([]);
    const authFetch = useAuthFetch();

    useEffect(() => {
        getShipments();
    }, []);

    const getShipments = async () => {
        const response = await authFetch('/api/shipments/shipments', {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setShipments(data)
    }

    const processShipment = async (orderId, trackingNumber) => {
        const response = await authFetch('/api/shipments/ship-order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                trackingNumber,
            }),
            credentials: "include",
        });
        if (response.ok) {
            console.log('Ordine spedito');
        }
    }

    const updateTrackingNumber = (shipmentId, newTrackingNumber) => {
        setShipments(prev => 
            prev.map(shipment => 
                shipment.id === shipmentId 
                    ? {...shipment, trackingNumber: newTrackingNumber}
                    : shipment
            )
        );
    }

    return (
        <>
            {shipments.map(shipment => (
                <div key={shipment.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    {/* Header dell'ordine */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-500">Ordine #{shipment.id}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    {shipment.status}
                                </span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                                €{parseFloat(shipment.total).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Footer con azioni */}
                    <div className="bg-gray-50 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <button 
                                onClick={() => processShipment(shipment.id, shipment.trackingNumber)}
                                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Conferma Spedizione
                            </button>
                            <input 
                                type="text"
                                placeholder="Numero di tracking"
                                value={shipment.trackingNumber || ''}
                                onChange={(e) => updateTrackingNumber(shipment.id, e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}