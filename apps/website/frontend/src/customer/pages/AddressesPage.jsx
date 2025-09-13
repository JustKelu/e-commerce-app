import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../shared/api/fetchApi";

export default function AdressesPage() {
    const [data, setData] = useState("")
    useEffect(() => {
        takeData();
    }, []);

    const takeData = async () => {
        const response = await fetchWithAuth("/api/user/profile");
        const data = await response.json();
        setData(data);
    }

    return (
        <div>
            <h1>{data.name} {data.surname}</h1>
            <h2>{data.address_street} {data.address_number}</h2>
            <h3>{data.address_city} {data.address_zip}</h3>
        </div>
    )
}