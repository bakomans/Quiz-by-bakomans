var questions = window.questions; 

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
var timeLeft = 60; // Set the initial time for the quiz (in seconds)
var timer;

// Function to start the quiz
function startQuiz() {
  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
  timer = setInterval(updateTimer, 1000); // Start the timer
  showNextQuestion();
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  timeElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

// Function to display the next question
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

// Function to check the user's answer
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex - 1];
  if (selectedIndex === currentQuestion.correctAnswer) {
    score += 10; // Adjust the scoring as needed
  } else {
    timeLeft -= 10; // Deduct time for incorrect answers
  }
  showNextQuestion();
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timer);
  document.getElementById('questions').classList.add('hide');
  endScreen.classList.remove('hide');
  finalScore.textContent = score;
}

// Function to save high score (you need to implement this)
function saveHighScore() {
  const initials = initialsInput.value;
  // Implement saving the high score and initials (e.g., using local storage or a server).
  // You can store the high scores in an array or an object.
}

// Event listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', saveHighScore);