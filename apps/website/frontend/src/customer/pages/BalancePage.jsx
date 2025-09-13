import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi";

export default function BalancePage() {
    const [code, setCode] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function getBalance() {
            const result = await fetchWithAuth("/api/user/balance", {
                credentials: "includes",
            });
            const data = await result.json();
            setBalance(data.balance);
        }
        getBalance();
    }, [])

    const handleGiftCard = async (e) => {
        e.preventDefault();
        try {
            const result = await fetchWithAuth("/api/user/balance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    giftCard: code
                }),
                credentials: "includes",
            });
                
            const data = await result.json();
            setBalance(data.balance);
            
        } catch (err) {
            console.error("Gift Card non valida o già utilizzata.")
        }
    }

    return(
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            {/* Titolo saldo */}
            <h1 className="text-2xl font-bold text-gray-800">
                Il tuo saldo: <span className="text-green-600">{balance}€</span>
            </h1>

            {/* Form Gift Card */}
            <form onSubmit={handleGiftCard} className="space-y-4">
                <div>
                <label
                    htmlFor="gift-card"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Inserisci la tua Gift Card
                </label>
                <input
                    type="text"
                    id="gift-card"
                    placeholder="AAAABBBBCCCCDDDD"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength="16"
                />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                    Verifica
                </button>
            </form>
        </div>
    )
}