import { useState, useEffect } from "react"

export default function ProfitPage() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getProfit();
    }, []);

    const getProfit = async () => {
        const response = await fetch('http://localhost:5001/api/orders/profit', {
            credentials: "include",
        });
        const data = await response.json();
        setBalance(balance + Number(data.balance))
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-md w-full">
                <div className="space-y-6">
                {/* Profitto Lordo */}
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                    <div className="mb-2">
                        <svg className="w-8 h-8 text-yellow-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <h2 className="text-sm font-medium text-gray-600 mb-1">Profitto Lordo</h2>
                    <p className="text-2xl font-bold text-yellow-600">€ {balance}</p>
                </div>

                {/* Separatore con icona */}
                <div className="flex items-center justify-center">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <div className="px-3">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Profitto Netto */}
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="mb-2">
                        <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <h2 className="text-sm font-medium text-gray-600 mb-1">Profitto Netto Stimato</h2>
                    <p className="text-2xl font-bold text-green-600">€ {(balance * 100 / 122).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">IVA esclusa (22%)</p>
                </div>

                {/* Footer informativo */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                        <p className="text-xs text-blue-700">
                            Il profitto netto è una stima basata sul calcolo IVA standard del 22%
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}