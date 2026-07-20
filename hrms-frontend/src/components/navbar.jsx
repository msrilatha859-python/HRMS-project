import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
    };
    return (
        <nav className=" bg-indigo-700 shadow-md">
            <div className=" max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className=" text-2xl font-boldt text-white">
                    Employee Dashboard
                </h1>
                <div className=" flex items-center gap-6">
                    <Link 
                    to="/dashboard" className=" text-white hover:text-yellow-500 transition">
                        Dashboard
                    </Link>
                    <Link to="/employees" className=" text-white hover:text-yellow-500 transition">
                        Employees
                    </Link>
                    <button onClick={handleLogout} className=" bg-red-500 hover:bg-red-700 px-4 py-3 rounded text-white">
                        Logout
                    </button>
                </div>
            </div>

        </nav>
    );
}
export default Navbar;


                   
                   