import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ChatNavbar({name, userId}){
    const navigate = useNavigate();
    var update = 0

    useEffect(() => {
        
    }, [update])

    function handleLogout(){
        localStorage.setItem("token", "");
        navigate('/login');
    }

    async function handleDelete(){
        const response = await axios.delete('https://chatyhb-api.vercel.app/request/bloglist/'+userId, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        console.log(response);
        window.location.reload();
    }

    return (
        <div className="bg-teal-500 py-5 px-6 xl:px-48 flex flex-wrap gap-4 justify-center md:justify-between items-center fixed top-0 left-0 right-0">
            <div className="text-4xl font-bold text-white">ChatYHB</div>
            {name != "" && <div className="flex justify-center gap-5 lg:gap-12 items-center">
                <div className="text-white text-md">Hi, {name}</div>
                <button className="bg-white p-2 lg:px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in cursor-pointer" onClick={handleDelete}>Delete Chats</button>
                <a className="bg-white p-2 lg:px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in cursor-pointer" onClick={handleLogout}>Log out</a>
            </div>}
            {name == "" && <div className="flex justify-center gap-12">
                <Link to="/login" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in cursor-pointer">Login</Link>
                <Link to="/signup" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in cursor-pointer">Sign Up</Link>
            </div>}
        </div>
    )
}