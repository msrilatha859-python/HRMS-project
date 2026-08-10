import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import API from "../services/api";


function EditEmployee () {
    const { id } = useParams();
    const navigate = useNavigate();
const [employee, setEmployee ] = useState({
    employee_id: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joining_date: "",
    status: "Active",
});

useEffect (() => {
    fetchEmployee();
}, []);
const fetchEmployee = async () => {
    try {
        const response = await API.get(`employees/${id}/`);
        setEmployee(response.data);
    } catch (error) {
        console.log (error);
    }
};
const handleUpdate = async (e) => {
  e.preventDefault();
  try{
    await API.put(`employees/${id}/`, employee);

    alert("employee updated successfully!");

    navigate("/employees");
  } catch(error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);
    console.log(error.response?.status)
    alert("Failed to update employee.")
  }
};


    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>
            <form onSubmit={handleUpdate} className='space-y-4'>

            <div className='space-y-4'>
                <input type="text"
                placeholder='Employee Name'
                value={employee.name}
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        name: e.target.value,
                    })
                } />
                <input  type="text" placeholder='Employee Name' value={employee.name}
                onChange={(e) => setEmployee({...employee, name: e.target.value,                  
                })
                } 
                className='w-full border rounded-lg p-3'
                />
                <input type='email' placeholder='Email' value={employee.email}
                onChange={(e) => setEmployee({...employee, email: e.target.value,                  
                })
                }
                className='w-full border rounded-lg p-3' />
                <input type="phone" placeholder='Phone Number' value={employee.phone}
                onChange={(e) => setEmployee({...employee, phone: e.target.value,                  
                })
                } 
                className=' w-full border rounded-lg p-3'/>
                <input type="text" placeholder='Depertment' value={employee.department}
                onChange={(e) => setEmployee({...employee, department: e.target.value,                  
                })
                }
                className='w-full border rounded-lg p-3' />
                <button type="submit" className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold'>
                    Update Employee</button>               
               
            </div>
        </form>
        </div>
    )
}
export default EditEmployee;