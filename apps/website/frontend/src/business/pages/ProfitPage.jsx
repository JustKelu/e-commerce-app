import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../shared/api/fetchApi";

export default function ProfitPage() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function getBalance() {
            const result = await fetchWithAuth("/api/business/my-profit", {
                credentials: "includes",
            });
            const data = await result.json();
            setBalance(data.balance);
        }
        getBalance();
    }, []);

    return(
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Il tuo saldo: <span className="text-green-600">{balance}€</span>
            </h1>
        </div>
    )
}