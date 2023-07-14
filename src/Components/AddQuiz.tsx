import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";

interface Option {
  id: number;
  value: string;
}

interface Question {
  id: number;
  question: string;
  options: { id: number; value: string }[];
  answer: string;
}

interface Technology {
  name: string;
  managers: Manager[];
  employees: Employee[];
}

interface Manager {
  emailId: String;
  password: String;
  technology: Technology;
}

interface Employee {
  emailId: string;
  technology: Technology;
}

interface Quiz {
  questions: Question[];
  employee: string;
}

const AddQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [quizOpenError, setQuizOpenError] = React.useState(false);
  const [emailOpenSuccess, setEmailOpenSuccess] = React.useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [employee, setEmployee] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [options, setOptions] = useState<Option[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
  ]);

  useEffect(() => {
    fetch("http://localhost:3333/get-employees", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "200") {
          setEmployees(result.employees);
        }
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(event.target.value);
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const isFieldsFilled =
      currentQuestion.trim() !== "" &&
      options.every((option) => option.value.trim() !== "") &&
      currentAnswer.trim() !== "";

    if (isFieldsFilled) {
      const question: Question = {
        id: questions.length + 1,
        question: currentQuestion,
        options: [...options],
        answer: currentAnswer,
      };
      setQuestions([...questions, question]);
      setCurrentQuestion("");
      setOptions([
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
      ]);
      setCurrentAnswer("");
      setOpenSuccess(true);
    } else {
      setOpenError(true);
    }
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleQuizCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setQuizOpenError(false);
  };

  const handleEmailCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailOpenSuccess(false);
  };

  const handleAnswerSelection = (event: SelectChangeEvent) => {
    const answer = event.target.value;
    setCurrentAnswer(answer as string);
  };

  const handleSaveQuiz = () => {
    if (questions.length === 0 || employee === "") {
      setQuizOpenError(true);
    } else {
      setQuiz((prevQuiz) => [...prevQuiz, { questions, employee }]);
    }
  };

  useEffect(() => {
    if (quiz.length > 0) {
      fetch("http://localhost:3333/add-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ questions, employee }),
      })
        .then((response) => response.json())
        .then((result) => {
          switch (result.status) {
            case "202":
              setEmailOpenSuccess(true);
              break;
          }
        });
    }
  }, [quiz]);

  const handleDeleteQuestion = (questionId: number) => {
    console.log(questionId);
    const updatedQuestions = questions.filter(
      (question) => question.id !== questionId
    );
    setQuestions(
      updatedQuestions.map((question, index) => ({
        ...question,
        id: index + 1,
      }))
    );
  };

  const handleClearQuiz = () => {
    setQuestions([]);
    setEmployee("");
  };

  const handleEmployeeChange = (event: SelectChangeEvent) => {
    const employee = event.target.value;
    setEmployee(employee as string);
  };

  return (
    <>
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
      <div style={{ display: "flex", margin: "10px" }}>
        <Box
          sx={{
            margin: "10px",
            marginTop: 8,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add Quiz
          </Typography>
          <TextField
            label="Question"
            value={currentQuestion}
            onChange={handleQuestionChange}
            fullWidth
            margin="normal"
          />
          {options.map((option) => (
            <TextField
              key={option.id}
              label={`Option ${option.id}`}
              value={option.value}
              onChange={(event) =>
                handleOptionChange(
                  event as React.ChangeEvent<HTMLInputElement>,
                  option.id - 1
                )
              }
              fullWidth
              margin="normal"
            />
          ))}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Answer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentAnswer}
              label="Choose Answer"
              name="answer"
              onChange={handleAnswerSelection}
              fullWidth
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{ margin: "10px" }}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>

          <Snackbar
            open={openSuccess}
            autoHideDuration={2000}
            onClose={handleCloseSuccess}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Question Added Successfully !
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={2000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error in adding the Question !
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
        <Box
          sx={{
            margin: "10px",
            marginTop: 8,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Questions Added
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose Employee
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={employee}
              label="Choose Employee"
              name="employee"
              onChange={handleEmployeeChange}
            >
              {employees.map((employee) => (
                <MenuItem value={employee.emailId}>
                  <>
                    {employee.emailId}({employee.technology.name})
                  </>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "20%" }}>Serial Number</TableCell>
                  <TableCell style={{ width: "70%" }}>Question</TableCell>
                  <TableCell style={{ width: "10%" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow>
                    <TableCell style={{ width: "20%" }}>
                      {question.id}
                    </TableCell>
                    <TableCell style={{ width: "70%" }}>
                      {question.question}
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <IconButton
                        color="primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              style={{ margin: "10px" }}
              onClick={handleClearQuiz}
            >
              Clear Quiz
            </Button>
            <Button
              variant="contained"
              color="success"
              style={{ margin: "10px" }}
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </Button>
          </div>
          <Snackbar
            open={quizOpenError}
            autoHideDuration={2000}
            onClose={handleQuizCloseError}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleQuizCloseError}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Error in adding Quiz !
            </Alert>
          </Snackbar>
          <Snackbar
            open={emailOpenSuccess}
            autoHideDuration={2000}
            onClose={handleEmailCloseSuccess}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={handleEmailCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Quiz Alert sent to Candidate !
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </>
  );
};

export default AddQuiz;
