import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/LoginPage.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Here you would usually send a request to your backend to authenticate the user
        // For the sake of this example, we're using a mock authentication
        if (username === "user" && password === "password") {
            // Replace this with actual authentication logic
            await login({ username });
        } else {
            alert("Invalid username or password");
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
    
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Log in</h1>
                
                <section>
                    <label htmlFor="username">Email</label>
                    <input id="username" name="username" type="text" placeholder="username" autoComplete="username" required onChange={(e) => setUsername(e.target.value)}/>
                </section>
                <section>
                    <label htmlFor="current-password">Password</label>
                    <input 
                    id="current-password" 
                    name="current-password" 
                    type={isPasswordVisible ? "text" : "password"}
                    autoComplete="current-password" 
                    aria-describedby="password-constraints"
                    required 
                    onChange={(e) => setPassword(e.target.value)}/>
                    <button 
                    id="toggle-password" 
                    type="button" 
                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                    onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? "Hide password" : "Show password"}
                    </button>
                    <div id="password-constraints">Eight or more characters, with at least one&nbsp;lowercase and one uppercase letter.</div>
                </section>
                
                <button id="login">Log in</button>
            </form>
        </div>
    );
};
