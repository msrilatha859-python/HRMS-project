import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceTable from "../components/attendanceTable";
function Attendance() {
    const [records, setRecords] = useState([]);
        useEffect(() => {
            fetchAttendance();
        }, []);
        const fetchAttendance = async () => {
            try {
                const response = await API.get("attendance/");
                setRecords(response.data);
            } catch (error) {
                console.error("Error fetching attemdance:", error);
            }
        };
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Attendence</h1>
            <AttendanceTable records={records} />
        </div>
    );
}
export default Attendance;

