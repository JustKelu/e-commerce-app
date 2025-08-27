import { Link } from "react-router-dom"
import { use, useEffect } from "react"

export default function NavBar() {
    useEffect(() => {
        
    }, [])

    return (
        <div className="navbar">
            <div className="navbar-content">
                <ul className="navbar-items">
                    <li>Ciao</li>
                    <li>2</li>
                    <Link to="/login">Login</Link>
                </ul>
            </div>
        </div>
    )
}