import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Technology {
  name: String;
  managers: Manager[];
}

interface Manager {
  emailId: String;
  password: String;
  technology: Technology;
}

const AdminDashboard = () => {
  const [data, setData] = React.useState<Manager[]>([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const handleAddManager = () => {
    navigate("/admin-dashboard/add-manager");
  };
  const handleAddEmployee = () => {
    navigate("/admin-dashboard/add-employee");
  };
  const handleAddQuiz = () => {
    navigate("/admin-dashboard/add-quiz");
  };

  const fetchData = () => {
    fetch("http://localhost:3333/admin-dashboard/manager-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setData(result.data);
        }
      });
  };

  const handleDeleteManager = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    fetch("http://localhost:3333/admin-dashboard/delete-manager-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "200") {
          fetchData();
        }
      });
  };

  const handleUpdateManager = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = event.currentTarget.getAttribute("value");
    navigate("/admin-dashboard/update-manager", {
      state: { managerData: data },
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <QuizIcon style={{ margin: "0px 10px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Admin
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            sign out
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={handleAddManager}
        >
          Add Manager
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={handleAddQuiz}
        >
          Add Quiz
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Manager's mail Id</TableCell>
              <TableCell>Technology Assigned</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: Manager) => (
              <TableRow>
                <TableCell>{item.emailId}</TableCell>
                <TableCell>{item.technology.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    style={{ marginRight: "10px" }}
                    onClick={handleUpdateManager}
                    value={JSON.stringify(item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ margin: "10px" }}
                    onClick={handleDeleteManager}
                    value={JSON.stringify(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AdminDashboard;
