import CodesCard from "../components/CodesCard";


export default function GiftCardPage() {
    return (
        <div>
            <section className="mb-8">
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Genera nuova Gift Card</h2>
                    <form id="keygen-form" className="flex space-x-4">
                        <select id="card-format" className="border rounded-lg px-3 py-2">
                            <option value="" disabled>Seleziona un formato</option>
                            <option value="5">€5</option>
                            <option value="10">€10</option>
                            <option value="25">€25</option>
                            <option value="50">€50</option>
                            <option value="100">€100</option>
                        </select>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
                            Genera
                        </button>
                    </form>
                </div>
            </section>

            <section>
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Gift Card Generate</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left text-gray-700">
                                <th className="px-4 py-2">Codice</th>
                                <th className="px-4 py-2">Valore</th>
                                <th className="px-4 py-2">Stato</th>
                                <th className="px-4 py-2">Data</th>
                                </tr>
                            </thead>
                            <tbody id="giftTable">
                                <CodesCard />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}