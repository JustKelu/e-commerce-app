import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi"
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Package } from "lucide-react";

export default function ProductCards() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await fetchWithAuth("/api/business/my-products", {
                credentials: "include",
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Errore nel caricamento prodotti:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (productData) => {
        navigate(`/edit/${productData.id}`, {state: productData});
    }

    const handleDelete = async (productId) => {
        if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
            try {
                const response = await fetchWithAuth(`/api/business/products/${productId}`, {
                    method: 'DELETE',
                    credentials: "include",
                });
                
                if (response.ok) {
                    // Rimuovi il prodotto dalla lista locale
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    alert("Errore nell'eliminazione del prodotto");
                }
            } catch (error) {
                console.error("Errore nell'eliminazione:", error);
                alert("Errore nell'eliminazione del prodotto");
            }
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-slate-600">Caricamento prodotti...</span>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Nessun prodotto trovato</h3>
                <p className="text-slate-500">Inizia aggiungendo il tuo primo prodotto!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative bg-slate-50 h-48 flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                            <img 
                                src={product.images[0].url} 
                                alt={product.name} 
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <Package className="h-16 w-16 text-slate-300" />
                        )}
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-4">
                        <h3 className="font-semibold text-lg text-slate-900 mb-2">
                            {product.name.length > 21 ? product.name.substring(0, 20) + '...' : product.name}
                        </h3>
                        
                        {product.description && (
                            <p className="text-slate-600 text-sm mb-3 h-10 line-clamp-2">
                                {product.description}
                            </p>
                        )}
                        
                        {/* Price */}
                        <div className="mb-4">
                            <span className="text-xl font-bold text-emerald-600">
                                €{parseFloat(product.price).toFixed(2)}
                            </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleEdit(product)} 
                                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Edit className="h-4 w-4 mr-1" />
                                Modifica
                            </button>
                            
                            <button 
                                onClick={() => handleDelete(product.id)} 
                                className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}