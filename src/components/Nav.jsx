import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to="/">Login</Link>
                </li>
                <li>
                    <Link to="/gallery">Gallery</Link>
                </li>
            </ul>
        </nav>
    );
}