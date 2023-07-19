import AdminDashboard from "./Components/AdminDashboard";
import ManagerDashboard from "./Components/ManagerDashboard";
import AddManager from "./Components/AddManager";
import AddEmployee from "./Components/AddEmployee";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommonDashboard from "./Components/CommonDashboard";
import UpdateManager from "./Components/UpdateManager";
import AddQuiz from "./Components/AddQuiz";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import QuizPage from "./Components/QuizPage";
import UpdateEmployee from "./Components/UpdateEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/add-manager" element={<AddManager />} />
        <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
        <Route
          path="/manager-dashboard/add-employee"
          element={<AddEmployee />}
        />
        <Route
          path="/admin-dashboard/update-manager"
          element={<UpdateManager />}
        />
        <Route
          path="/admin-dashboard/update-employee"
          element={<UpdateEmployee />}
        />
        <Route
          path="/manager-dashboard/update-employee"
          element={<UpdateEmployee />}
        />
        <Route path="/admin-dashboard/add-quiz" element={<AddQuiz />} />
        <Route path="/manager-dashboard/add-quiz" element={<AddQuiz />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-dashboard/quiz-page" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
