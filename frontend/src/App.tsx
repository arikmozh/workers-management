import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import LoginPassword from "./pages/LoginPassword";
import Dashboard from "./pages/Dashboard";
import OverviewComp from "./components/Overview/OverviewComp";
import DepartmentsComp from "./components/Departments/DepartmentsComp";
import ShiftsComp from "./components/Shifts/ShiftsComp";
import EmployeesComp from "./components/Employees/EmployeesComp";
import SettingsComp from "./components/Settings/SettingsComp";
import OverviewTab2 from "./components/Overview/overview-tab-2";
import OverviewTab3 from "./components/Overview/overview-tab-3";
import Register from "./pages/Register";
import RegisterPassword from "./pages/RegisterPassword";
import { useEffect } from "react";
import ShiftComp from "./components/Shift/ShiftComp";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      // Check if the current route starts with "/dashboard"
      const currentPath = window.location.pathname;
      const isDashboardRoute = currentPath.startsWith("/dashboard");

      // Save the URL only if it's a dashboard route
      if (isDashboardRoute) {
        localStorage.setItem("lastVisitedURL", currentPath);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard/analytics" />} />
        <Route path="" element={<Homepage />} />
        <Route path="register" element={<Register />} />
        <Route path="register-password" element={<RegisterPassword />} />
        <Route path="login" element={<Login />} />
        <Route path="login-password" element={<LoginPassword />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<OverviewComp />}>
            <Route path="analytics" element={<OverviewTab2 />}></Route>
            <Route path="reports" element={<OverviewTab3 />}></Route>
          </Route>
          <Route path="departments" element={<DepartmentsComp />}></Route>
          <Route path="shifts" element={<ShiftsComp />}></Route>
          <Route path="shifts/:id" element={<ShiftComp />}></Route>
          <Route path="employees" element={<EmployeesComp />}></Route>
          <Route path="settings" element={<SettingsComp />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
