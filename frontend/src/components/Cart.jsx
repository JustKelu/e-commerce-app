import { useEffect } from "react";

export default function Cart() {
    
    useEffect(() => {
        loadCart()
    }, []);

    const loadCart = async () => {
        const token = localStorage.getItem("token");
        const result = await fetch("http://localhost:8000/api/user/cart", {
            method: "GET",
            headers: {
                "Authorization": `Baerer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        console.log(data);
    }
    
    const handleOrder = () => {
        //Order logic
    }

    return (
        <section className="cart-container">
            <h1>Carrello</h1>
            <main className="cart-content">
                <div className="cart-items">
                    <div className="cart-items-container">
                        <ul className="cart-items-list">
                            <li className="cart-item">Test</li>
                        </ul>
                    </div>
                </div>
                <aside className="cart-total">
                    <div className="cart-total-container">
                        <h2 className="cart-total-items">Articoli totiali: 0</h2>
                        <p className="cart-total-price">Prezzo totale provvisorio: 0 eur</p>
                        <button onClick={handleOrder}>Procedi all'ordine</button>
                    </div>
                </aside>
            </main>
        </section>
    )
} 