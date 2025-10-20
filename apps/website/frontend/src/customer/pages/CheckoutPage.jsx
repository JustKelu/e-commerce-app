import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../../shared/api/fetchApi";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { state: cartData } = useLocation();
  const navigate = useNavigate();

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  
  const [formError, setFormError] = useState(false);

  const [shipmentData, setShipmentData] = useState({});
  const [productsData, setProductsData] = useState({
    items: cartData?.[0] || [],
    subtotal: cartData?.[1] || 0,
  });

  const subtotal = Number(productsData.subtotal || 0);  
  const iva = subtotal * 0.22;
  const totalPrice = subtotal + iva;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetchWithAuth("/api/user/profile");
      const data = await response.json();
      setShipmentData(data);
    } catch (err) {

    }
  }

  const checkForm = () => {
    if (
      !shipmentData.name ||
      !shipmentData.surname ||
      !shipmentData.address_street ||
      !shipmentData.address_number ||
      !shipmentData.address_city ||
      !shipmentData.address_zip ||
      !shipmentData.province
    ) return true;
    return false;
  }

  const handlePayment = async () => {
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }

    const hasFormErrors = checkForm();
    setFormError(checkForm());

    if (hasFormErrors) return;

    try {
      const response = await fetchWithAuth("/api/user/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productsData, shipmentData}),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("error on payment: " + err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonna sinistra - Form di checkout */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Sezione Indirizzo di Spedizione */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                Indirizzo di Spedizione
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Mario"
                    value={shipmentData.name || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cognome *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Rossi"
                    value={shipmentData.surname || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, surname: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indirizzo *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Via Roma"
                    value={shipmentData.address_street || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, address_street: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numero Civico *
                  </label>
                    <input 
                      type="text" 
                      placeholder="123"
                      value={shipmentData.address_number || ''}
                      onChange={(e) => setShipmentData(prev => ({...prev, address_number: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Città *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Milano"
                    value={shipmentData.address_city || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, address_city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CAP *
                  </label>
                  <input 
                    type="text" 
                    placeholder="20100"
                    value={shipmentData.address_zip || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, address_zip: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Milano"
                    value={shipmentData.province || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, province: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></input>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+39 123 456 7890"
                    value={shipmentData.phone_number || ''}
                    onChange={(e) => setShipmentData(prev => ({...prev, phone_number: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {formError ?
                <div className="mt-2">
                    <span className="text-xs text-red-600">
                      Compila tutti i campi per continuare.
                    </span>
                </div> :
                null
              }
            </div>

            {/* Sezione Metodo di Pagamento */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                Metodo di Pagamento
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="carta" 
                    name="payment" 
                    value="carta"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    defaultChecked
                  />
                  <label htmlFor="carta" className="ml-3 text-sm font-medium text-gray-700">
                    💳 Saldo
                  </label>
                </div>
              </div>
            </div>

            {/* Note Aggiuntive */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Note per la Consegna
              </h2>
              <textarea 
                rows="4" 
                placeholder="Aggiungi eventuali note per la consegna..."
                value={shipmentData.notes || ''}
                onChange={(e) => setShipmentData(prev => ({...prev, notes: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
          </div>
          
          {/* Colonna destra - Riepilogo Ordine */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-3">
                Riepilogo Ordine
              </h2>
              
              {/* Prodotti nel carrello */}
              <div className="space-y-3 mb-6">
                {productsData.items.map(product => (
                  <div key={product.id} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <img 
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">€{product.quantity * product.price}</span>
                  </div>
                ))}
              </div>
              
              {/* Calcoli totali */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotale:</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (22%):</span>
                  <span>€{iva.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Totale:</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkbox privacy */}
              <div className="mb-6">
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={privacyAccepted}
                    onChange={(e) => {setPrivacyAccepted(e.target.checked); setPrivacyError(!e.target.checked)}}
                  />
                  <span className="text-xs text-gray-600">
                    Accetto i <span className="text-blue-600 underline cursor-pointer">termini e condizioni</span> e 
                    la <span className="text-blue-600 underline cursor-pointer">privacy policy</span>
                  </span>
                </label>
              </div>
              
              {privacyError ?
                <div className="mb-6">
                    <span className="text-xs text-red-600">
                      Accetta i termini e condizioni per continuare.
                    </span>
                </div> :
                null
              }

              {/* Pulsante conferma */}
              <button onClick={() => handlePayment()} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Conferma Ordine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}