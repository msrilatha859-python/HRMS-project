import { useEffect, useState } from 'react';
import API from '../services/api';

import DashboardCard from '../components/DashboardCard';
import AttendanceTable from '../components/attendanceTable';

function Dashboard() {
    const [records, setRecords] = useState([]);
    useEffect(() => {fetchAttendance();        
    }, []);
    
    const fetchAttendance = async () => {
        try {
            const response = await API.get("attendance/");
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };
    const totalEmployees = records.length;
    const present = records.filter(
        (r) => r.status === "Present"
    ).length;
    const absent = records.filter(
        (r) => r.status === "Absent"
    ).length;
    const late = records.filter(
        (r) => r.status ==="Late"
    ).length;
    return(
      <>
        <div className='p-6'>
            <h1 className=' text-3xl font-bold mb-6'>Attendance Dashboard</h1>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            <DashboardCard 
             title="Records" 
             value={totalEmployees}
              color=" bg-blue-600"
              />
               <DashboardCard
                title="Present"
                 value={present}
                  color=" bg-green-600"
                />
                <DashboardCard
                 title="Absent"
                  value={absent}
                   color="bg-red-600"
                />
                  <DashboardCard
                   title="Late"
                    value={late}
                     color="bg-yellow-600"
                  />
                    <AttendanceTable records={records} />
         </div>
         </>
    );
}
export default Dashboard;
  
