import { useEffect, useState } from "react"

export default function CodesCard() {

    const [codes, setCodes] = useState([]);

    useEffect(() => {
        getCodes();
    }, []);

    const getCodes = async () => {
        try {
            const response = await fetch('http://localhost:5001/get-all-keys');
            const data = await response.json();
            setCodes(data.giftCards);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            {codes.map(code => {
                const statusClass = code.used ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
                const statusText = code.used ? "Usata" : "Valida";

                return (                
                    <tr key={code.id || code.code}>
                        <td className="border px-4 py-2 font-mono text-sm">{code.code}</td>
                        <td className="border px-4 py-2">€{code.value}</td>
                        <td className="border px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                                {statusText}
                            </span>
                        </td>
                        <td className="border px-4 py-2">
                            {code.created_at ? code.created_at.split('T')[0] : new Date().toISOString().split('T')[0]}
                        </td>
                    </tr>
                )
            })}
        </>
    )
}