import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import LoginPassword from "./pages/LoginPassword";
import Dashboard from "./pages/Dashboard";
import OverviewComp from "./components/Overview/OverviewComp";
import DepartmentsComp from "./components/Departments/DepartmentsComp";
import ShiftsComp from "./components/Shifts/ShiftsComp";
import EmployeesComp from "./components/Employees/EmployeesComp";
import SettingsComp from "./components/Settings/SettingsComp";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="login-password" element={<LoginPassword />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<OverviewComp />}></Route>
          <Route path="departments" element={<DepartmentsComp />}></Route>
          <Route path="shifts" element={<ShiftsComp />}></Route>
          <Route path="employees" element={<EmployeesComp />}></Route>
          <Route path="settings" element={<SettingsComp />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
