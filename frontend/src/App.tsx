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
import OverviewTab1 from "./components/Overview/overview-tab-1";
import OverviewTab2 from "./components/Overview/overview-tab-2";
import OverviewTab3 from "./components/Overview/overview-tab-3";
import OverviewTab4 from "./components/Overview/overview-tab-4";
import Register from "./pages/Register";
import RegisterPassword from "./pages/RegisterPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="register" element={<Register />} />
        <Route path="register-password" element={<RegisterPassword />} />
        <Route path="login" element={<Login />} />
        <Route path="login-password" element={<LoginPassword />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="overview" element={<OverviewComp />}>
            <Route path="overview" element={<OverviewTab1 />}></Route>
            <Route path="analytics" element={<OverviewTab2 />}></Route>
            <Route path="reports" element={<OverviewTab3 />}></Route>
            <Route path="notifications" element={<OverviewTab4 />}></Route>
          </Route>
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
