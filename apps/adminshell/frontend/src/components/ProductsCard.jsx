import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function ProductsCard() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const fetchAuth = useAuthFetch();
        
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetchAuth('/api/products/products');
            const data = await response.json();

            setProducts(data.result);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const productDetailsPage = (productId) => {
        navigate(`/products/${productId}`);
    }

    return (
        <div className="">
            {!products[0] ? <h1>Nessun Prodotto da mostrare</h1> :
                products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        {/* Header dell'ordine */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-500">Prodotto #{product.id}</span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        In attesa di revisione
                                    </span>
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-shrink-0">
                                    <img 
                                        src={product.image_url} 
                                        alt={product.name}
                                        className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                                    />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                            <button 
                                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => productDetailsPage(product.id)}
                            >
                                Guarda Dettagli
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}