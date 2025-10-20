import OrdersCard from "../components/OrdersCard";

export default function OrdersPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Ordini Da Processare</h1>
                
                <div className="space-y-6">
                    <OrdersCard />                    
                </div>
            </div>
        </div>
    )
}