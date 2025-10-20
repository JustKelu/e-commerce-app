import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi"

export default function AddPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    stock_quantity: "",
    brand: "",
    category: "",
  });

  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  useEffect(() => {
    const urls = {};
    ["image1", "image2", "image3", "image4"].forEach((key) => {
      const file = product[key];
      if (file instanceof File) urls[key] = URL.createObjectURL(file);
      else urls[key] = null;
    });
    setPreviews(urls);

    return () => {
      Object.values(urls).forEach((u) => {
        if (u) URL.revokeObjectURL(u);
      });
    };
  }, [product.image1, product.image2, product.image3, product.image4]);

  const handleFile = (key, file) =>
    setProduct((prev) => ({ ...prev, [key]: file }));

  const handleAdd = async () => {
    const formData = new FormData();
    const data = { 
      name: product.name, 
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
      brand: product.brand,
      category: product.category
    };

    formData.append('product', JSON.stringify(data));

    if (product.image1) formData.append('images', product.image1);
    if (product.image2) formData.append('images', product.image2);
    if (product.image3) formData.append('images', product.image3);
    if (product.image4) formData.append('images', product.image4);
    
    const response = await fetchWithAuth('/api/business/add-product', {
      method: 'POST',
      body: formData,
    });

    console.log(response, await response.json())
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        {/* area immagini */}
        <div className="flex flex-col items-center">
          {/* main image */}
          <label className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
            {previews.image1 ? (
              <img
                src={previews.image1}
                alt="Anteprima principale"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Carica immagine principale</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile("image1", e.target.files[0])}
            />
          </label>

          {/* thumbnails centrati */}
          <div className="flex justify-center items-center gap-4 mt-5">
            {[2, 3, 4].map((num) => {
              const key = `image${num}`;
              return (
                <label
                  key={key}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  {previews[key] ? (
                    <img
                      src={previews[key]}
                      alt={`Anteprima ${num}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Immagine {num}</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(key, e.target.files[0])}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Form dettagli prodotto */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Nome prodotto"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            placeholder="Descrizione"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Prezzo (€)"
              value={product.price}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="number"
              placeholder="Disponibilità"
              value={product.stock_quantity}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  stock_quantity: e.target.value,
                }))
              }
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Brand"
            value={product.brand}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, brand: e.target.value }))
            }
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            placeholder="Categoria"
            value={product.category}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Bottone debug */}
          <button
            onClick={handleAdd}
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Mostra prodotto Debug
          </button>
        </div>
      </div>
    </div>
  );
}