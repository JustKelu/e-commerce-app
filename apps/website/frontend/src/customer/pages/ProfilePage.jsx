    import { useNavigate } from "react-router-dom";
    import Logout from "../../shared/components/Logout";

    export default function ProfilePage() {
        const navigate = useNavigate();

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Il mio account</h1>
                        <Logout 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition-colors h-9"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Il mio saldo</h2>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Converti le tue Gift Card in denaro.</p>
                            <button 
                            onClick={() => navigate("/balance")} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Gestisci saldo
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">I miei ordini</h2>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Visualizza e gestisci i tutti tuoi ordini.</p>
                            <button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                            onClick={() => navigate("/my-orders")}
                            >
                            Gestisci ordini
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Modifica dati personali</h2>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Aggiungi o modifica i tuoi dati personali</p>
                            <button 
                            onClick={() => navigate("/ship-addresses")} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Gestisci dati
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Modifica credenziali</h2>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Cambia la tua password o le impostazioni di sicurezza.</p>
                            <button 
                            onClick={() => navigate("/profile")} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Gestisci credenziali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }