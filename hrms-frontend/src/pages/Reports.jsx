import { useEffect, useState } from "react";
import API from "../services/api";
import {
    PieChart,
    Pie, 
    Cell, 
    Tooltip,
    Legend, 
    ResponsiveContainer,
} from "recharts";

function Reports() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try{
            const response = await API.get("attendance/");
            setRecords(response.data);
        } catch(error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const totalRecords = records.length;

    const present = records.filter(
        (record) => record.status === "Present"
    ).length;

    const absent = records.filter(
        (record) => record.status === "Absent"
    ).length;

    const leave = records.filter(
        (record) => record.status === "Leave"
    ).length
    const employeeReport = {};
    records.forEach((record) => {
        const employeeId = record.employee;

        if (!employeeReport[employeeId]) {
            employeeReport[employeeId] = {
                name: record.employee_name,
                present: 0,
                absent: 0,
                leave: 0,
                total: 0,
            };
        }

        employeeReport[employeeId].total += 1;

        if(record.status === "Present") {
            employeeReport[employeeId].present +=1;
        }
        if (record.status === "Absent") {
            employeeReport[employeeId].absent +=1;
        }
        if (record.status === "Leave") {
            employeeReport[employeeId].leave += 1;
        }
    
    });
    const employeeReportList = Object.values(employeeReport).map((employee) => ({
        ...employee,
        percentage:
        employee.total > 0
        ? Math.round((employee.present / employee.total) * 100)
        : 0,
    }));
    const charData = [
        {
            name: "Present",
            value: present,
        },
        {
            name: "Absent",
            value: absent,
        },
        {
            name: "Leave",
            value: leave,
        },
    ];
    

   return(
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Attendance Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-gray-600 font-semibold">Total Records</h2>
                <p className="text-3xl font-bold mt-2">
                    {totalRecords}
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-gray-600 font-semibold">
                    Present
                </h2>
                <p className="text-3xl font-bold mt-2">
                    {present} 
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-gray-600 font-semibold">Absent</h2>
                <p className="text-3xl font-bold mt-2">{absent} </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-semibold text-gray-600">Leave</h2>
                <p className="text-3xl font-bold mt-2">{leave} </p>
            </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">
                Employee Status Distribution
            </h2>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                         data={charData}
                         dataKey="value"
                         nameKey="name"
                         cx="50%"
                         cy="50%"
                         outerRadius={100}
                         label
                         >
                            {charData.map((entry, index) => (
                                <Cell key={`cell-${index}`} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-md mt-8">
            <h2 className="text-xl font-bold mb-4">
                Employee-wise Attendance
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">
                                Employee
                            </th>
                            <th className="border p-3">Present</th>
                            <th className="border p-3">Absent</th>
                            <th className="border p-3">Leave</th>
                            <th className="border p-3">Total</th>
                            <th className="border p-3">Attendance %</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {employeeReportList.map((employee) => (
                            <tr key={employee.name}>
                                <td className="border p-3 font-semibold">
                                    {employee.name}
                                </td>
                                <td className="border p-3 text-center">{employee.present}</td>
                                <td className="border p-3 text-center">{employee.absent}</td>
                                <td className="border p-3 text-center">{employee.leave}</td>
                                <td className="border p-3 text-center">{employee.total}</td>
                                <td className="border p-3 text-center">{employee.percentage}%</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>           

    </div>
   );
}
export default Reports;

               