import { useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignUp(){
        const response = await axios.post('https://chatyhb-api.vercel.app/user/signup', {
            username: name,
            email,
            password
        });
        localStorage.setItem("token", 'Bearer ' + response.data.token);
        navigate('https://chatyhb.vercel.app/chat/' + response.data.id);
    }

    return (
        <div>
            <Navbar />
            <div className="flex gap-20 flex-col justify-start items-center h-screen pt-72">
                <h1 className="text-3xl md:text-5xl font-semibold bg-teal-500 text-white p-2 rounded">Sign up @ ChatYHB</h1>
                <div className="flex flex-col w-2/3 xl:w-1/4 gap-8">
                    <input type="text" placeholder="Name" className="border rounded p-2" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Email" className="border rounded p-2" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="border rounded p-2" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col gap-5 w-2/3 xl:w-1/4 items-center">
                    <button className="bg-teal-500 text-white text-xl font-semibold hover:bg-teal-600 p-2 w-full rounded transition ease-in-out" onClick={handleSignUp}>Sign Up</button>
                    <div>Already have an account? <a href="https://chatyhb.vercel.app/login" className="underline">Login</a> here</div>
                </div>
            </div>
        </div>
    )
}