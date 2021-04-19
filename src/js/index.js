//import { myQuestions } from "./body.js";
//SyntaxError : cannot use import statement outside a module (??)

//functions
//building the quiz
function buildQuiz() {
  //contain all HTML ouputs like questions/answer choices
  const output = [];

  //loops for each of our questions
  myQuestions.forEach((currentQuestion, questionNumber) => {
    //arrow function to perform operation on each question
    //stores the different answers for each question
    const answers = [];

    //loop to fill in possible ansswer choices
    for (letter in currentQuestion.answers) {
      // ...adds an HTML radio button for each possible answer (bullet point)
      answers.push(
        //allows us to click any part of the possible answer, as the radio button is small
        `<label> 
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    //next lines just to insert the js into a format the html can understand(?) and add
    // pushes this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
    );
  });

  //joins our outputs (questions and answers as we first had to create questions then our answers)
  //join puts them together into one string that can output to our answers
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  //let the starting number of correct answers be 0
  let numCorrect = 0;

  //loops each question for the answers
  myQuestions.forEach((currentQuestion, questionNumber) => {
    //finds user selected answer
    //looking inside answer container for question
    const answerContainer = answerContainers[questionNumber];
    //figure out which button was clicked
    const selector = `input[name=question${questionNumber}]:checked`;
    //finds value of the selected answer OR leave the value blank (user can skip question)
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //effect that will happen once submit is pushed
    //if correct add to correct and change color
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

//refrences HTML elements
//variables
//HTML elements
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const myQuestions = [
  {
    question: "What cheese does not really qualify as a cheese?",
    answers: {
      a: "Mozzarella",
      b: "Ricotta",
      c: "Cheddar",
      d: "Swiss Cheese",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Where is this line from: I came home on Tuesday and found all of the chairs that I own stacked in a tower in the center of my kitchen.",
    answers: {
      a: "a novel",
      b: "a movie",
      c: "a poem",
      d: "a comic strip",
    },
    correctAnswer: "c",
  },
  {
    question: "Are parrots a type of tulip?",
    answers: {
      a: "Yes",
      b: "No",
    },
    correctAnswer: "a",
  },
  {
    question: "What cheese is low in lactose?",
    answers: {
      a: "Brie",
      b: "Gorgonzolla",
      c: "Parmesan",
      d: "Colby Jack",
    },
    correctAnswer: "c",
  },
  {
    question: "Beans",
    answers: {
      a: "Beans",
      b: "beans",
      c: "beans?",
      d: "why",
    },
    correctAnswer: "a",
  },
];

//build quiz
buildQuiz();

//click on submit button to trigger results
submitButton.addEventListener("click", showResults);
