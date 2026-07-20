import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        employee_id:"",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        joining_date: "",
        status: "Active",
        photo: null,
    });
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("employees/", employee);
            alert("Employee added successfully!");
        } catch(error) {
            console.error(error);
            alert("Failed to add employee.")
        }
    };
    return(
        <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className=" text-2xl font-bold mb-6">Add Employee</h2>
            <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-4">
                <input name="employee_id"
                placeholder="Employee ID"
                className="border p-2 rounded"
                onChange={handleChange} 
                />
                <input name="name"
                placeholder="Full Name"
                className="border p-2 rounded-2xl"
                onChange={handleChange}
                 />
                 <input name="email"
                 placeholder="Email"
                 className="border p-2 rounded"
                 onChange={handleChange} 
                 />
                 <input name="phone"
                 placeholder="Phone"
                 className="border p-2 rounded"
                 onChange={handleChange}
                  />
                  <input name="department"
                  placeholder="Department"
                  className="border p-2 rounded"
                  onChange={handleChange} 
                  />
                  <input name="designation"
                  placeholder="Designation"
                  className="border p-2 rounded"
                  onChange={handleChange}
                   />
                   
                   <input name="joining_date"
                   type="date"
                   className="border p-2 rounded"
                   onChange={handleChange} 
                   />
                   <select name="status" className="border p-2 rounded" onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                   </select>
                   <div className="col-span-2">
                        <button className=" bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded">
                            Save Employee
                        </button>
                   </div>
            </form>
        </div>
    )
}
export default AddEmployee;       
