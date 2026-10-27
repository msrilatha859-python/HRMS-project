import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeAttendance () {
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchTodayAttendance = async () => {
        try{
            const response = await API.get("attendance/");
            const today = new Date().toLocaleDateString("en-CA");

            const todayRecord = response.data.find(
                (record) => record.date === today
            );
            setAttendance(todayRecord || null);
        } catch (error) {
            console.error("Error fetching attendance:", error);
            setMessage("Unable to load attendance. Please try again.")
        }
    };
    useEffect(() => {
        fetchTodayAttendance();
    }, []);

    const handleAttendance = async (action) => {
        setLoading(true);
        setMessage("");

        try {
            const response = await API.post(`attendance/${action}/`);
            setAttendance(response.data);
            setMessage(
                action === "check-in"
                    ? "Check-in recorded successfully!"
                    : "Check-out recorded successfully!"
            );
        } catch (error) {
        setMessage(
            error.response?.data?.error ||
            "Unable to record attendance. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Attendance</h1>
        
            <div className="bg-white rounded-xl shadow p-6 max-w-xl">
                <p className="text-gray-600 mb-4">
                    Today's Date: {new Date().toLocaleDateString()}
                </p>
                <div className="mb-4">
                    <p>
                        Check In:{" "}
                        {attendance?.check_in || "Not checked in"}
                    </p>
                    <p>
                        Check Out:{" "}
                        {attendance?.check_out || "Not checked out"}
                    </p>
                    <p>
                        Status: {attendance?.status || "Not marked"}
                    </p>
                </div>
                {message && (
                    <p className="mb-4 text-sm text-indigo-700">
                        {message}
                    </p>
                )}
                <div className="flex gap-3">
                    <button
                     onClick={() => handleAttendance("check-in")}
                        disabled={loading || Boolean(attendance?.check_in)}
                      >
                        {loading ? "Please wait..." : "Check In"}
                    </button>
                    <button
                     onClick={() => handleAttendance("check-out")}
                     disabled={
                        loading ||
                        !attendance?.check_in ||
                        Boolean(attendance?.check_out)
                     }
                     className="bg-indigo-600 text-white px-5 py-2 rounded disabled:opacity-50" >
                        {loading ? "Please wait..." : "Check Out"}
                    </button>
                </div>

            </div>
        </div>
    );
}
export default EmployeeAttendance;