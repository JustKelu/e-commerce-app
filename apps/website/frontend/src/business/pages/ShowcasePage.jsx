import ProductCards from "../components/ProductCards";
import { useNavigate } from "react-router-dom";
import { Plus, Package, ShoppingBag } from "lucide-react";

export default function ShowcasePage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Gestione Prodotti
                                </h1>
                                <p className="text-sm text-slate-600 mt-1">
                                    Aggiungi, modifica ed elimina i tuoi prodotti
                                </p>
                            </div>
                        </div>
                        
                        {/* Add Product Button */}
                        <button 
                            onClick={() => navigate('/add')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Aggiungi Prodotto
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Product Cards Container */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <ProductCards />
                </div>
            </div>
        </div>
    );
}