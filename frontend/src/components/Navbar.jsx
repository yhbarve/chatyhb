import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <div className="bg-teal-500 py-5 px-6 xl:px-48 flex flex-wrap gap-4 justify-center sm:justify-between items-center fixed top-0 left-0 right-0">
            <div className="text-4xl font-bold text-white">ChatYHB</div>
            <div className="flex justify-center gap-2 md:gap-12">
                <Link to="/login" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in">Login</Link>
                <Link to="/signup" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in">Sign Up</Link>
            </div>
        </div>
    )
}