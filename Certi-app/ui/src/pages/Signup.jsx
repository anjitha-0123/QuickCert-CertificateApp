import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            navigate("/");
        } catch (error) {
            setError(error.message || "Signup Failed: Please try again!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div className="bg-white border-2 border-black w-[400px]  mt-32 rounded-md mx-auto shadow-md">
                    <h1 className="text-2xl flex justify-center mt-24  text-purple-900">Sign Up</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <label className="pl-8">Name:</label>
                    <input
                        type="text"
                        className="border-2 ml-8 mt-2 w-64 h-9"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Name"
                        required
                    />

                    <label className="pl-8">Email:</label>
                    <input
                        type="email"
                        className="border-2 ml-8 mt-2 w-64 h-9"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter Email"
                        required
                    />

                    <label className="pl-8">Password:</label>
                    <input
                        type="password"
                        className="border-2 ml-2 mt-2 w-64 h-9"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter Password"
                        required
                    />

                    <button className="bg-purple-800 w-20 h-8 rounded-md text-white ml-32 mt-4">Sign Up</button>

                    <div className="flex justify-center mt-2">
                        <p>Already have an account?</p>
                        <Link to="/" className="mb-8 text-purple-900">
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;
