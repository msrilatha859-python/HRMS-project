import { useEffect, useState } from 'react';
import API from '../services/api';

import DashboardCard from '../components/DashboardCard';
import AttendanceTable from '../components/attendanceTable';

function Dashboard() {

    const [records, setRecords] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchAttendance();
        fetchEmployees();
    }, []);

    // Fetch attendance records
    const fetchAttendance = async () => {
        try {
            const response = await API.get("attendance/");
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            const response = await API.get("employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // Total employees
    const totalEmployees = employees.length;

    // Attendance counts
    const present = records.filter(
        (r) => r.status === "Present"
    ).length;

    const absent = records.filter(
        (r) => r.status === "Absent"
    ).length;

    const leave = records.filter(
        (r) => r.status === "Leave"
    ).length;

    return (
        <div className="p-6">

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">
                Attendance Dashboard
            </h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <DashboardCard
                    title="Total Employees"
                    value={totalEmployees}
                    color="bg-blue-600"
                />

                <DashboardCard
                    title="Present Today"
                    value={present}
                    color="bg-green-600"
                />

                <DashboardCard
                    title="Absent Today"
                    value={absent}
                    color="bg-red-600"
                />

                <DashboardCard
                    title="Leave Today"
                    value={leave}
                    color="bg-yellow-600"
                />

            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-xl font-bold mb-4">
                    Today's Attendance
                </h2>

                <AttendanceTable records={records} />

            </div>

        </div>
    );
}

export default Dashboard;