import Logout from "../../shared/components/Logout";

export default function BusinessHome() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Business</h1>

            {/* Statistiche */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white rounded-xl shadow">
                    <p className="text-sm text-gray-500">Fatturato mese</p>
                    <p className="text-xl font-bold">€ 12.430</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow">
                    <p className="text-sm text-gray-500">Ordini</p>
                    <p className="text-xl font-bold">128</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow">
                    <p className="text-sm text-gray-500">Prodotti attivi</p>
                    <p className="text-xl font-bold">42</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow">
                    <p className="text-sm text-gray-500">Esauriti</p>
                    <p className="text-xl font-bold">5</p>
                </div>
            </div>

            {/* Ultimi ordini */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Ultimi ordini</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-500 text-sm border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Cliente</th>
                            <th className="py-2">Prodotto</th>
                            <th className="py-2">Stato</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td>#1024</td>
                            <td>Mario Rossi</td>
                            <td>Sneakers X</td>
                            <td className="text-green-600">Completato</td>
                        </tr>
                        <tr className="border-b">
                            <td>#1023</td>
                            <td>Lucia Bianchi</td>
                            <td>Borsa Y</td>
                            <td className="text-yellow-600">In elaborazione</td>
                        </tr>
                        <tr>
                            <td>#1022</td>
                            <td>Gianni Verdi</td>
                            <td>Orologio Z</td>
                            <td className="text-blue-600">Spedito</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Avvisi */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-4">Avvisi</h2>
                <ul className="list-disc ml-5 text-gray-700">
                    <li>3 prodotti in esaurimento scorte</li>
                    <li>2 ordini in attesa di spedizione</li>
                </ul>
            </div>

            <div className="mt-6">
                <Logout />
            </div>
        </div>
    )
}
