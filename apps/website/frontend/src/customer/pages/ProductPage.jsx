import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Truck, Shield, RotateCcw, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { fetchApi, fetchWithAuth } from '../../shared/api/fetchApi';
import { useNavigate } from 'react-router-dom';

const ProductPage = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({images: []});
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetchApi(`/api/user/product/${id}`);
      const data = await response.json();

      if (!data.product) return navigate('/');
      console.log(data.product)
      setProduct(data.product);
    } catch (err) {
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetchWithAuth('/api/user/add-cart', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              productId: product.id,
              quantity: quantity,
          }),
          credentials: 'include',
      });
      if (response.ok) {
          const data = await response.json();
      }
    } catch (err) {
      
    }
  };

  const share = () => {

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galleria Immagini */}
          <div className="space-y-4">
            {/* Immagine Principale */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
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
              {product.images.map((image, index) => (
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

          {/* Dettagli Prodotto */}
          <div className="space-y-6">
            {/* Header Prodotto */}
            <div>
              <p className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {product.name}
              </h1>
              
              {/* Rating }
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(products.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {products.rating} ({products.reviews} recensioni)
                </span>
              </div>*/}
            </div>

            {/* Prezzo */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                €{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  €{product.originalPrice}
                </span>
              )}
            </div>

            {/* Descrizione */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantità e Carrello */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quantità</h3>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Disponibili: {product.stock_quantity}</p>
                  <p className="text-sm text-green-600 font-medium">✓ In Stock</p>
                </div>
              </div>

              {/* Pulsanti Azione */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={addToCart}
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Aggiungi al Carrello</span>
                </button>
                
                <button 
                  onClick={share} 
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 size={18} />
                  <span>Condividi</span>
                </button>
              </div>
            </div>

            {/* Servizi */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t">
              <div className="flex items-start space-x-3">
                <Truck className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Spedizione Gratuita</p>
                  <p className="text-sm text-gray-600">Consegna in 2-3 giorni lavorativi</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <RotateCcw className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Resi Gratuiti</p>
                  <p className="text-sm text-gray-600">30 giorni per cambiare idea</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Garanzia 2 anni</p>
                  <p className="text-sm text-gray-600">Copertura completa del prodotto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;