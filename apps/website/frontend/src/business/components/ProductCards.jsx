import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi"
import { useNavigate } from "react-router-dom";

export default function ProductCards() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = async () => {
        const response = await fetchWithAuth("/api/business/my-products", {
            credentials: "include",
        });

        const data = await response.json();

        setProducts(data);
    }

    const handleEdit = (productData) => {
        navigate(`/edit/${productData.id}`, {state: productData});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-6">
                        <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2">
                            {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                            {product.description}
                        </p>
                        
                        {/* Price and Button Container */}
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-600">
                                ${product.price}
                            </span>
                            <button 
                                onClick={() => handleEdit(product)} 
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                Modifica
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}