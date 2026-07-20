import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaCalendarCheck, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa"

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className=' w-64 bg-indigo-800 text-white h-screen flex flex-col'>
            <div className='text-center py-6 border-b border-indigo-600'>
                <h2 className='text-2xl font-bold'>Employee Dashboard</h2>
            </div>
            <nav className='flex-1 p-4'>
                <Link to='/dashboard' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaHome/>Dashboard
                </Link>
                <Link to='/employees' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaUsers/>Employees
                </Link>
                <Link to='/attendance' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaCalendarCheck/>Attendance
                </Link>
                <Link to='/leave' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaClipboardList/>Leave
                </Link>
                <Link to='/reports' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaChartBar/>Reports
                </Link>
                <Link to='/settings' className='flex items-center gap-3 p-3 rounded hover:bg-indigo-700'>
                    <FaCog/>Settings
                </Link>
            </nav>
            <button onClick={logout} className=' flex m-4 bg-red-500 hover:bg-red-600 rounded p-3 items-center justify-center gap-2'>
                <FaSignOutAlt/>Logout
            </button>
        </div>
    );
}
export default Sidebar;   
       

     