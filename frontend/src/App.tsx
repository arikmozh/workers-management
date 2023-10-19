import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import LoginPassword from "./pages/LoginPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="login-password" element={<LoginPassword />} />
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
