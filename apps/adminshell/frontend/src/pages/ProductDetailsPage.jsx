import { useState, useEffect } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { useNavigate } from "react-router";

export default function ProductDetailsPage() {
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState(0);
    const authFetch = useAuthFetch();
    const navigate = useNavigate();
    
    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const orderId = window.location.pathname.split('/').pop();
        try {
            const response = await authFetch(`/api/products/product/${orderId}`);
            const data = await response.json();
            console.log(data);

            setProduct(data.result);
        } catch (err) {
            console.log(err);
        }
    }

    const judgeProduct = async (judgment) => {
        try {
            const method = judgment === 'approve' ? 'PUT' : 'DELETE'; 
            const response = await authFetch(`/api/products/product/${product.id}`, {
                method: method,
            });
            if (response.ok) navigate('/products');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                Anteprima Prodotto
                            </h2>
                            <h1 className="text-2xl font-bold text-gray-900 mt-1">
                                Valutazione per Approvazione
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 grid gap-2">
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src={product?.images?.[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-96 lg:h-[500px] object-contain"
                                />
                                    {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    -{product.discount}%
                                </div>
                                )}
                            </div>
                
                            {/* Thumbnail */}
                            <div className="grid grid-cols-4 gap-3">
                                {product?.images?.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative bg-white rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-20 object-contain"
                                    />
                                </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 lg:p-12 space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 uppercase tracking-wider">
                                        {product.brand}
                                    </span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-700 mb-1">Prezzo di vendita</p>
                                    <span className="text-4xl font-bold text-green-600">
                                        €{product.price}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">Descrizione</h3>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    {product.description}
                                </p>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <p className="text-2xl font-bold text-gray-900">{product.stock_quantity}</p>
                                <p className="text-sm text-gray-600">Unità Disponibili</p>
                            </div>

                            <div className="px-16 py-4 flex justify-between items-center">
                                    <button 
                                        onClick={() => judgeProduct('approve')}
                                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                                    >
                                        Approva Prodotto
                                    </button>
                                    <button
                                        onClick={() => judgeProduct('reject')} 
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                                    >
                                        Rifiuta Prodotto
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}