import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

const defaultTheme = createTheme();

const UpdateEmployee = () => {
  const [data, setData] = React.useState<FormData>();
  const [technology, setTechnology] = React.useState("");
  const [error, setError] = React.useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin-dashboard/update-employee";
  const isManager = location.pathname === "/manager-dashboard/update-employee";
  const { employeeData } = location.state;

  const handleLogout = () => {
    navigate("/");
  };
  const handleChange = (event: SelectChangeEvent) => {
    setTechnology(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setData(formData);
  };

  React.useEffect(() => {
    if (employeeData) {
      setTechnology(JSON.parse(employeeData).technology.name);
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      fetch("http://localhost:3333/update-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      })
        .then((response) => response.json())
        .then((result) => {
          setError("");
          switch (result.status) {
            case "200":
              if (isAdmin) {
                navigate("/admin-dashboard");
              }
              if (isManager) {
                navigate("/manager-dashboard");
              }
              break;

            case "202":
              if (isAdmin) {
                navigate("/admin-dashboard");
              }
              if (isManager) {
                navigate("/manager-dashboard");
              }
              break;
          }
        });
    }
  }, [data]);

  return (
    <>
      <AppBar position="static">
        {isAdmin && (
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome Admin
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        )}
        {isManager && (
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome Manager
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        )}
      </AppBar>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Update Employee
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="employee"
                label="Employee Email Id"
                name="employee"
                autoFocus
                defaultValue={
                  employeeData ? JSON.parse(employeeData).emailId : ""
                }
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Assign Password"
                name="password"
                autoFocus
                defaultValue={
                  employeeData ? JSON.parse(employeeData).password : ""
                }
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Technology
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={technology}
                  name="technology"
                  label="Technology"
                  onChange={handleChange}
                >
                  <MenuItem value={"MERN Stack"}>MERN Stack</MenuItem>
                  <MenuItem value={"MEAN Stack"}>MEAN Stack</MenuItem>
                  <MenuItem value={"PHP-laravel"}>PHP-laravel</MenuItem>
                  <MenuItem value={"Python"}>Python</MenuItem>
                  <MenuItem value={"Flutter-Android"}>Flutter-Android</MenuItem>
                  <MenuItem value={"iOS"}>iOS</MenuItem>
                </Select>
              </FormControl>
              <div style={{ color: "red" }}>{error}</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  navigate("/admin-dashboard");
                }}
              >
                Go to Dashboard
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default UpdateEmployee;
