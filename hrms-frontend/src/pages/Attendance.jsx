import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceTable from "../components/attendanceTable";

function Attendance() {
    const [records, setRecords] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [editingRecord, setEditingRecord] = useState(null);    

    useEffect(() => {
        fetchAttendance();
        fetchEmployees();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await API.get("attendance/");
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await API.get("employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const filterRecords = records.filter((record) => {
        return (
            (selectedEmployee === "" ||
                record.employee === Number(selectedEmployee)) &&
            (selectedStatus === "" ||
                record.status === selectedStatus) &&
            (selectedDate === "" ||
                record.date === selectedDate)
        );
    });
    const clearFilters = () => {
        setSelectedEmployee("");
        setSelectedStatus("");
        setSelectedDate("");
    };
    const handleEdit = (record) => {
        setEditingRecord(record);
    };
    const handleUpdate = async () => {
        try {
            const response = await API.patch(
                `attendance/${editingRecord.id}/`,
                {
                    employee: editingRecord.employee,
                    status: editingRecord.status,
                    check_in:
                        editingRecord.status === "Absent" ||
                        editingRecord.status === "Leave"
                            ? null: editingRecord.check_in || null,
                    check_out:
                        editingRecord.status === "Absent" ||
                        editingRecord.status === "Leave"
                            ? null: editingRecord.check_out || null,
                }
            );
            setRecords((prevRecords) =>
                prevRecords.map((record) =>
                    record.id === editingRecord.id
                        ? response.data : record
                )
);

            setEditingRecord(null);
            alert("Attendance updated successfully!");
        } catch (error) {
            console.error("Error updating attendance:", error);
            console.error("Server response:", error.resonse?.data);
            console.error("Failed to update the attendance.")
        }
    };   

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure, you want to delete this attendance record?"
        );       
        

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`attendance/${id}/`);

            setRecords((prevRecords) => 
             prevRecords.filter((record) => record.id !== id)
        );
        alert ("Attendance record deleted successfully!")
        } catch (error) {
            console.error("Error deleting attendance:", error);
            alert("Failed to delete attendance record.")
        }
    };  
    
    
    
    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-4">
                Attendance History
            </h1>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Employee Filter */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Employee
                        </label>
                        <select value={selectedEmployee}
                         onChange={(e) => setSelectedEmployee(e.target.value)}
                         className="w-full border rounded-lg p-3" >
                            <option value="">All Employees</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>    

                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Status
                        </label>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">All Status</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    {/* Clear Filters */}
                    <div className="flex items-end">
                        <button type="button" onClick={clearFilters}
                         className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold">
                            Clear Filters
                         </button>
                    </div>     


                </div>
            </div>
            {editingRecord && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2>Edit Attendance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-2">Employee</label>
                        <select
                         value={editingRecord.employee}
                          onChange={(e) => 
                            setEditingRecord({
                                ...editingRecord,
                                employee: Number(e.target.value),
                            })
                          }
                          className="w-full border rounded-lg p-3">
                            {employees.map((employee) => (
                                <option key={employee.id}
                                 value={employee.id}>
                                    {employee.name}
                                 </option>
                            ))}
                            
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Status</label>
                        <select
                         value={editingRecord.status}
                         onChange={(e) => {
                            const newStatus = e.target.value;
                            const clearTimes =
                                newStatus === "Absent" || newStatus === "Leave";

                                setEditingRecord({
                                    ...editingRecord,
                                    status: newStatus,
                                    check_in: clearTimes ? "" : editingRecord.check_in || "",
                                    check_out: clearTimes ? "" : editingRecord.check_out || ","
                                });                            
                         }}
                         className="w-full border rounded-lg p-3">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">
                            Check-in Time
                        </label>
                        <input 
                         type="time"
                         value={editingRecord.check_in || ""}
                         onChange={(e) =>
                            setEditingRecord({
                                ...editingRecord,
                                check_in: e.target.value,
                            })
                         }
                         disabled={
                            editingRecord.status === "Absent" ||
                            editingRecord.status === "Leave"
                         }
                         className="w-full border rounded-lg p-3 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                        <label>Check-out Time</label>
                        <input 
                            type="time"
                            value={editingRecord.check_out || ""}
                            onChange={(e) => 
                            setEditingRecord({
                            ...editingRecord,
                            check_out: e.target.value,
                            })
                        } 
                        disabled={
                            editingRecord.status === "Absent" ||
                            editingRecord.status === "Leave"
                        }
                        className="w-full border rounded-lg p-3 disabled:bg-gray-100 disabled:cursor-not-allowed" />
                    </div>

                <div className="flex gap-3 mt-5 ">
                    <button type="button" onClick={handleUpdate}                                 
                     className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                     Update Attendance
                    </button>


                    <button type="button"
                        onClick={() => setEditingRecord(null) }
                         className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg">
                            Cancel
                    </button>
                </div>
                </div>
                </div>
            )}  
            <AttendanceTable records={filterRecords}
             onEdit = {handleEdit}
             onDelete = {handleDelete}
             />   
        </div>
           
    );
}
export default Attendance;