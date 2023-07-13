import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import QuizIcon from "@mui/icons-material/Quiz";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

interface Quiz {
  questions: Question[];
  employee: {
    quizes: {
      questions: Question[];
    }[];
  };
}
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const employee = localStorage.getItem("employee");
  const [quizCount, setQuizCount] = useState<number>(0);
  const [technology, setTechnology] = useState<string>();
  const [questions, setQuestions] = useState([]);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const questionValue = questions.map((questionObject: Question) => ({
    question: questionObject.question,
    options: questionObject.options.map((options) => options.value),
  }));
  useEffect(() => {
    fetch("http://localhost:3333/get-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ employee: JSON.parse(employee!) }),
    })
      .then((response) => response.json())
      .then((result) => {
        setQuizes(result.quiz.quizes);
        setQuizCount(result.quiz.quizes.length);
        setTechnology(result.quiz.technology.name);
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleStartQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.value;
    fetch("http://localhost:3333/get-quiz-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ index: index, employee: JSON.parse(employee!) }),
    })
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.quiz.questions);
      });
  };

  const cardContent = (count: number) => (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {technology}
        </Typography>
        <Typography variant="h5" component="div">
          Quiz {count}
        </Typography>
        <Typography variant="h6" component="div">
          {quizes[count - 1].questions.length} Questions
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={handleStartQuiz} value={count}>
          Start Quiz
        </Button>
      </CardActions>
    </>
  );

  const renderCards = () => {
    const cards = [];

    for (let i = 1; i <= quizCount; i++) {
      cards.push(
        <Card
          key={i}
          variant="outlined"
          sx={{ boxShadow: 8 }}
          style={{ width: "20%", margin: "15px", borderRadius: "10px" }}
        >
          {cardContent(i)}
        </Card>
      );
    }

    return cards;
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
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Typography variant="h6" component="div" color="#2196f3">
          No. of quizzes assigned to you: {quizCount}
        </Typography>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        {renderCards()}
      </div>
      <hr />
      {questionValue.map((questionObj, index) => (
        <div key={index}>
          <Typography variant="h6" component="div" color="#2196f3">
            {index + 1}. {questionObj.question}
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {questionObj.options.map((option, optionIndex) => (
                <>
                  <FormControlLabel
                    value={optionIndex}
                    control={<Radio />}
                    label={option}
                  />
                </>
              ))}
            </RadioGroup>
          </FormControl>
          <hr />
        </div>
      ))}
    </>
  );
};

export default EmployeeDashboard;
