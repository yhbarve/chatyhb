export default function Navbar(){
    return (
        <div className="bg-teal-500 py-5 px-6 xl:px-48 flex flex-wrap gap-4 justify-center md:justify-between items-center fixed top-0 left-0 right-0">
            <div className="text-4xl font-bold text-white">ChatYHB</div>
            <div className="flex justify-center gap-12">
                <a href="https://chatyhb-api.vercel.app/user/login" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in">Login</a>
                <a href="https://chatyhb-api.vercel.app/user/signup" className="bg-white p-2 px-5 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition ease-in">Sign Up</a>
            </div>
        </div>
    )
}