import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/api'
import { Link } from 'react-router-dom';

function Employees () {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate ();

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = async () => {
        const response = await API.get('employees/')
        setEmployees(response.data)
    }
    const handleDelete = async(id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try{
            await API.delete(`employees/${id}/`);
            alert("Employee deleted successfully!")
            fetchEmployees();
        } catch (error) {
            console.log(error);
            alert("Failed to delete employee.")
        }
    };
    
    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4'>Employees</h1>
            <div className=' flex justify-between items-center mb-4'>
                <input type='text'
                placeholder='Search Employee...'
                className=' border rounded px-4 py-2 w-72' />
                <Link
                to= "/employees/add"
                className='bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2'>Add Employee</Link>
            </div>
           
            <table className="w-full border border-collapse">
    <thead>
        <tr>
            <th className=' border p-2'>Photo</th>
            <th className=' border p-2'>Employee ID</th>
            <th className="border p-2">Name</th>
            <th className='border'>Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
            <th className=' border p-2'>Designation</th>
            <th className=' border p-2'>Status</th>
            <th className=' border p-2'>Actions</th>
        </tr>
    </thead>
    

    <tbody>
        {employees.map((emp) => (
            <tr key={emp.id}>
                <td className=' border p-2'>
                    {emp.photo ? (
                        <img 
                        src={emp.photo}
                        alt={emp.name}
                        className=' w-12 h-12 rounded-full object-cover' />
                    ) : (
                        "No Photo"
                    )}                  
                </td>
                <td className=' border p-2'>{emp.employee_id} </td>
                <td className=' border p-2'>{emp.name} </td>
                <td className='border p-2'>{emp.phone} </td>
                <td className=' border p-2'>{emp.email} </td>
                <td className=' border p-2'>{emp.department} </td>
                <td className=' border p-2'>{emp.designation} </td>
                <td className=' border p-2'>{emp.status} </td>
                <td className=' border p-2'>
                    <button onClick=
                    {() => navigate(`/employees/edit/${emp.id}`) } 
                    className=' bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2'>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}
                        className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-2'>Delete</button>
                    
                </td>
            </tr>
        ))}
    </tbody>
    
</table>

        </div>
    )
}
export default Employees
