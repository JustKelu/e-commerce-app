import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../../shared/api/fetchApi";

export default function EditPage() {
    const { state: productData } = useLocation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: productData.name,
        price: productData.price,
        description: productData.description,
        image_url: productData.image_url,
    })

    const [editable, setEditable] = useState({
        name: false,
        price: false,
        description: false,
        image_url: false,
    });

    const [values, setValues] = useState(form);

    const toggleEdit = (field) => {
        setEditable((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log({
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    image_url: values.image_url,
                })
        try { 
            const response = await fetchWithAuth(`/api/business/my-products/${productData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    image_url: values.image_url,
                }),
                credentials: "includes",
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                navigate("/showcase")
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
    <div className="max-w-xl mx-auto border rounded-lg shadow-lg p-6 space-y-4">
      {/* Immagine */}
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

      {/* Titolo */}
      <div onClick={() => toggleEdit("name")} className="cursor-pointer">
        {editable.name ? (
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="text-2xl font-bold w-full border-b focus:outline-none"
            autoFocus
          />
        ) : (
          <h2 className="text-2xl font-bold">{values.name}</h2>
        )}
      </div>

      {/* Prezzo */}
      <div onClick={() => toggleEdit("price")} className="cursor-pointer">
        {editable.price ? (
          <input
            type="number"
            value={values.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="text-xl text-green-600 w-full border-b focus:outline-none"
            autoFocus
          />
        ) : (
          <p className="text-xl text-green-600">${values.price}</p>
        )}
      </div>

      {/* Descrizione */}
      <div onClick={() => toggleEdit("description")} className="cursor-pointer">
        {editable.description ? (
          <textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded px-2 py-1 focus:outline-none"
            autoFocus
          />
        ) : (
          <p>{values.description}</p>
        )}
      </div>

      {/* Pulsante Salva */}
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700" onClick={handleEdit}>
        Salva modifiche
      </button>
    </div>
  );
}