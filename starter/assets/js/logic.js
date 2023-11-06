// questions from logic.js
var questions = window.questions; 
// variables needed in this project
var startButton = document.getElementById('start');
var questionTitle = document.getElementById('question-title');
var choicesContainer = document.getElementById('choices');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var initialsInput = document.getElementById('initials');
var submitButton = document.getElementById('submit');
var feedback = document.getElementById('feedback');
var timeElement = document.getElementById('time');

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60; 
var timer;

// Function to start the quiz and the time
function startQuiz() {
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
  timer = setInterval(updateTimer, 1000); 
  showNextQuestion();
}

// Function to update the time
function updateTimer() {
  timeLeft--;
  timeElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

// Function for  the next question
function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', () => checkAnswer(index));
      choicesContainer.appendChild(choiceButton);
    });

    currentQuestionIndex++;
  } else {
    endQuiz();
  }
}

// Function to check the user answer
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex - 1];
  if (selectedIndex === currentQuestion.correctAnswer) {
    score += 10; 
  } else {
    timeLeft -= 10; 
  }
  showNextQuestion();
}

//End of the quiz function
function endQuiz() {
  clearInterval(timer);
  document.getElementById('questions').classList.add('hide');
  endScreen.classList.remove('hide');
  finalScore.textContent = score;
}

// Function to save high score 
function saveHighScore() {
  var initials = initialsInput.value;
}

// Event listeners calls
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', saveHighScore);