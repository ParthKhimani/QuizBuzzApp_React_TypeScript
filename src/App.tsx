import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import ManagerDashboard from "./Components/ManagerDashboard";
import AddManager from "./Components/AddManager";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonDashboard from "./Components/CommonDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/add-manager" element={<AddManager />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
