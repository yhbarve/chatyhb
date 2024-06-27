import axios from "axios"
import { useEffect, useState } from "react"
import { Router, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

    }, [email, password]);

    async function handleLogin(){
        console.log("EMAIL: " + email);
        const response = await axios.post('http://localhost:3000/user/signin', {
            email: email,
            password: password
        });
        localStorage.setItem("token", 'Bearer ' + response.data.token);
        navigate('/chat/' + response.data.id);
    }

    return (
        <div>
            <Navbar />
            <div className="flex gap-20 flex-col justify-start items-center h-screen pt-72">
                <h1 className="text-3xl md:text-5xl font-semibold bg-teal-500 text-white p-2 rounded">Login @ ChatYHB</h1>
                <div className="flex flex-col w-2/3 xl:w-1/4 gap-8">
                    <input type="text" placeholder="Email" value={email} className="border rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" className="border rounded p-2" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col gap-5 w-2/3 xl:w-1/4 items-center">
                    <button onClick={handleLogin} className="bg-teal-500 text-white text-xl font-semibold hover:bg-teal-600 p-2 w-full rounded transition ease-in-out">Login</button>
                    <div classname="text-center">Don't have an account? <a href="/signup" className="underline">Sign up</a> here</div>
                </div>
            </div>
        </div>
    )
}