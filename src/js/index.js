import { myQuestions } from "./body.js";

//building the quiz
function buildQuiz() {
  //stores output for HTML
  const output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    //stores the different answers for each question
    const answers = [];

    //each answer choice gets a radio button next to it
    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    //next lines just to insert the js into a format the html can understand(?) and add
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
    );
  });
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  //let the starting number of correct answers be 0
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //effect that will happen once submit is pushed
    if (userAnswer === currentQuestion.correctAnswer) {
      //just number of questions answered correctly
      numCorrect++;

      //changes color of answers to green to show correct and red for incorrect once submit button is pushed
      answerContainers[questionNumber].style.color = "green";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

//store HTML elements here
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

//build quiz
buildQuiz();

//click on submit button to trigger results
submitButton.addEventListener("click", showResults);
