import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi, fetchWithAuth } from '../../shared/api/fetchApi';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

export default function ProductCards() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    const fetchProducts = async (searchQuery) => {
        const url = searchQuery 
            ? `/api/user/products?search=${encodeURIComponent(searchQuery)}`
            : `/api/user/products`;
        
        console.log(url);

        const response = await fetchApi(url);
        return response.json();
    };

    useEffect(() => {
        setLoading(true);
        const searchQuery = searchParams.get('search') || null;
        
        fetchProducts(searchQuery).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log(data)
                setProducts(data);
            }
            setLoading(false);
        });
    }, [searchParams]);

    const handleAddToCart = async (productId) => {
        try {
            const response = await fetchWithAuth('/api/user/add-cart', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1,
                }),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-gray-200">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Price badge overlay */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                            ${product.price}
                        </div>
                        
                        {/* Quick view overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => navigate(`product/${product.id}`)} 
                                className="bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg transform translate-y-4 group-hover:translate-y-0"
                            >
                                Quick View
                            </button>
                        </div>
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-3">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">(4.5) 127 reviews</span>
                        </div>
                        
                        
                        {/* Price and Button Container */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${product.price}
                                </span>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(product.id)} 
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                        
                        {/* Additional info */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-green-600 font-medium">Free Shipping</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                In Stock
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}