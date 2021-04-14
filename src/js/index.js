import { DOMSelectors } from "./dom";
import { myQuestions } from "./body";

//functions
function buildQuiz(){
//contain all HTML ouputs like questions/answer choices (display them)
  const output = [];
  //loops for each of our questions 
  myQuestions.forEach (
    (currentQuestion, questionNumber) => { //arrow function to perform operation on each question
      //stores an array of possible answers
      const answers = [];
      //loop to fill in possible ansswer choices
      for(letter in currentQuestion.answers){
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

       // pushes this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );
  //joins our outputs (questions and answers as we first had to create questions then our answers)
  //join puts them together into one string that can output to our answers
  quizContainer.innerHTML = output.join('');
}
  
function showResults(){
  //finds answers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');
  //score starts at 0
  let correct = 0;
  //loops each question for the answers
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    //finds user selected answer
    //looking inside answer container for question
    const answer = answerContainers[questionNumber];
    //figure out which button was clicked
    const selector = `input[name=question${questionNumber}]:checked`;
    //finds value of the selected answer OR leave the value blank (user can skip question)
    const selectedAnswer = (answer.querySelector(selector) || {}).value; 
    //if correct add to correct and change color
    if(selectedAnswer === currentQuestion.correctAnswer){
      correct++;
      answerContainers[questionNumber].style.color = 'blue';
    }
    //if wrong or blank change color
    else{
      answerContainers[questionNumber].style.color = 'purple';
    }
  });
//tells user amount right from total
  resultsContainer.innerHTML = `${correct} out of ${myQuestions.length}`;
}

//refrences HTML elements
//variables 

//displays quiz 
buildQuiz();

//shows results after submit
submitButton.addEventListener('click', showResults);
