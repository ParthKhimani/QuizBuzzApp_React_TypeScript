import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Option {
  id?: number;
  value: string;
}

interface Question {
  id?: number;
  question: string;
  options: Option[];
  answer?: string;
}

interface Answer {
  index: number;
  answer: string;
}

const QuizPage = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const quizIndex = localStorage.getItem("quiz-index");
  const employee = localStorage.getItem("employee");
  const questionValue = questions.map((questionObject: Question) => ({
    question: questionObject.question,
    options: questionObject.options.map((options) => options),
  }));
  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:3333/get-quiz-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        index: quizIndex,
        employee: JSON.parse(employee!),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.quiz.questions);
      });
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedAnswer = event.target.value;
    const existingAnswer = answers.find((answer) => answer.index === index + 1);
    if (existingAnswer) {
      const updatedAnswers = answers.map((answer) =>
        answer.index === index + 1 ? { ...answer, selectedAnswer } : answer
      );
      setAnswers(updatedAnswers);
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, { index, selectedAnswer }]);
    }
    console.log(index + 1, selectedAnswer);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <QuizIcon style={{ margin: "0px 10px" }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz {quizIndex}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {questionValue.map((questionObj, index) => (
        <>
          <Typography variant="h6" component="div" color="#2196f3">
            {index + 1}. {questionObj.question}
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(event) => handleChange(event, index as number)}
            >
              {questionObj.options.map((option, optionIndex) => (
                <>
                  <FormControlLabel
                    value={optionIndex + 1}
                    control={<Radio color="success" />}
                    label={option.value}
                  />
                </>
              ))}
            </RadioGroup>
          </FormControl>
          <hr />
        </>
      ))}
    </>
  );
};
export default QuizPage;
