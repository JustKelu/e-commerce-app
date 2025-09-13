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
      <div className="w-full">
        <img
          src={values.image_url}
          alt={values.name}
          className="w-full h-64 object-cover rounded-lg mb-2 cursor-pointer"
          onClick={() => toggleEdit("image_url")}
        />
        {editable.image_url && (
          <input
            type="text"
            value={values.image_url}
            onChange={(e) => handleChange("image_url", e.target.value)}
            className="w-full border rounded px-2 py-1"
            autoFocus
          />
        )}
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