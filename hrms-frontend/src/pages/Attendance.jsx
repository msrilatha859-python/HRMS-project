import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceTable from "../components/attendanceTable";

function Attendance() {
    const [records, setRecords] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

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

                        <select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        >
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

            {/* Attendance Table */}
            <AttendanceTable records={filterRecords} />

        </div>
    );
}

export default Attendance;