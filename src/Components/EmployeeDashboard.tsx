import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";

interface Option {
  id: number;
  value: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  answer: string;
}

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome Candidate
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default EmployeeDashboard;
