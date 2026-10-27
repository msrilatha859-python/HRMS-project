import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ProtectRoute from "./routes/protectRoute";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard"
import Employees from './pages/employees';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import EmployeeAttendance from './pages/EmployeeAttendance';


import MainLayout from './layout/MainLayout';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './employees/EditEmployee';
import MarkAttendance from "./pages/MarkAttendance";

function Layout() {
  const location = useLocation();
  return (
    <>
     
        <Routes>
          <Route path='/' 
          element={<Login />} />
          <Route path='/dashboard' 
          element={<ProtectRoute><MainLayout><Dashboard /></MainLayout></ProtectRoute>} />
          <Route path='/employees' 
          element={<ProtectRoute><MainLayout><Employees /></MainLayout></ProtectRoute>} />
          <Route path="employees/add"
          element={<ProtectRoute><MainLayout><AddEmployee /></MainLayout></ProtectRoute>} />
          <Route path='/attendance' 
          element={<ProtectRoute><MainLayout><Attendance/></MainLayout></ProtectRoute>} />
          <Route path='/leave' 
          element={<ProtectRoute><MainLayout><Leave /></MainLayout></ProtectRoute>} />
          <Route path='/reports' element={<ProtectRoute><MainLayout><Reports/></MainLayout></ProtectRoute>} />
          <Route path='/settings' 
          element={<ProtectRoute><MainLayout><Settings/></MainLayout></ProtectRoute>} />
          <Route path='/employees/edit/:id'
          element={<ProtectRoute><MainLayout><EditEmployee /></MainLayout> </ProtectRoute> } />
          <Route path='/attendance/mark'
            element={<ProtectRoute><MainLayout><MarkAttendance/></MainLayout> </ProtectRoute> } />
           <Route path='/my-attendance'
            element={<ProtectRoute><MainLayout><EmployeeAttendance /></MainLayout></ProtectRoute> } />

          
        </Routes>

        
      </>
  );
}
      function App() {
        return (
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        )
      }
export default App;
