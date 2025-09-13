import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        loadCart()
    }, []);

    useEffect(() => {
        setQuantity(cart.reduce((sum, item) => sum + item.quantity, 0));
        setPrice(cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0));
    }, [cart])

    const loadCart = async () => {
        try {
            const result = await fetchWithAuth("/api/user/cart");
            const data = await result.json();
            
            const cartItems = data.cart;

            console.log(cartItems);

            setCart(cartItems);
        } catch (err) {
            console.error("Error loading cart:", err);
            setCart([]);
            setQuantity(0);
        }
    }
    
    const handleOrder = () => {
        const cartData = [cart, price]
        navigate("/checkout", {state: cartData});
    }

    const handleDelete = async (productId) => {
        const response = await fetchWithAuth('/api/user/remove-cart', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId: productId}),
        });
        if (response.ok) {
            setCart(cart.filter(item => item.id !== productId))
        }
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Carrello</h1>
            
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonna prodotti - occupa 2/3 dello spazio su desktop */}
                {cart.length == 0 ? 
                    <h1 className="lg:col-span-2 text-sm text-gray-600 mt-1">Nessun prodotto da mostrare</h1> : 
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="space-y-3">
                            {cart.map(product => (
                                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                    <img 
                                        src={product.image_url} 
                                        alt={product.name} 
                                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                                        <p className="text-xl font-bold text-blue-600 mt-1">€{product.price}</p>
                                        <p className="text-sm text-gray-600 mt-1">Quantità: {product.quantity}</p>
                                    </div>
                                    <button onClick={() => handleDelete(product.id)}><Trash size={20} strokeWidth={1.2} className="fill-gray-500 hover:fill-gray-700 transition-colors"/></button>
                                </div>            
                            ))}
                        </div>
                    </div>
                }
                
                {/* Sidebar totale - occupa 1/3 dello spazio su desktop */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                            Riepilogo ordine
                        </h2>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Articoli totali:</span>
                                <span className="font-medium">{quantity}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                                <span>Prezzo parziale:</span>
                                <span>€{price.toFixed(2)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleOrder}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Procedi all'ordine
                        </button>
                    </div>
                </aside>
            </main>
        </section>
    )
} 