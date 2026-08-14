import {useEffect, useState } from "react";
import API from "../services/api";

function MarkAttendance() {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employee: "",
    status: "Present",
  });

  useEffect(() =>{
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try{
      const response = await API.get("employees/");
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.employee) {
      alert("Please select employee.");
      return;
    }

    try {
      await API.post("attendance/", formData);

      alert("Attendance marked successflly!!");

      setFormData({
        employee: "",
        status: "Present",
      });
    } catch (error) {
        console.log("Error marking attendance:", error);

        if (error.response) {
          console.log("Server response:", error.response.data);
        }

        alert("Failed to mark attendance.");
    }
  };
  return(
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>
      <form onSubmit={handleSubmit}
       className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <div>
            <label className="block font-semibold mb-2">Employee</label>
            <select
             name="employee" value={formData.employee}
              onChange={handleChange} className="w-full border rounded-lg p-3" required>
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id}
                   value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
          
          <label className="block font-semibold mb-2">Attendance Status</label>
          <select name="status" value={formData.status}
           onChange={handleChange} className="w-full border rounded-lg p-3" >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
          </div>
          <button type="submit"
           className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold">
            Mark Attendance
          </button>
       </form>
    </div>    
  );
}
export default MarkAttendance;

          
       