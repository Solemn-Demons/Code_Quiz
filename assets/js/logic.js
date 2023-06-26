
var currentQuestionIndex = 0;
var time = 100;
var timerId;

var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class','hide');

  questionsEl.removeAttribute('class');

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = questions[currentQuestionIndex].title; 

  choicesEl.innerHTML = '';

  for (var i = 0; i < currentQuestion.choices.length; i++) {

    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
    
    choicesEl.appendChild(choiceNode);
  }
}



function questionClick(event) {
  var buttonEl = event.target;
  
  if (!buttonEl.matches('.choice')) {
    alert("That is correct");
  }

  if (buttonEl.value !== currentQuestionIndex.answer) {
    time --;
    timerEl.textContent = time;
    alert("That is incorrect")
  }

  currentQuestionIndex++;
  

  if (currentQuestionIndex === questions.length || time <=0) {
    quizEnd();

  } else {
    getQuestion();
  }
}

function quizEnd() {

  clearInterval(timerId);
  
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  questionsEl.hidden = true;
}

function clockTick() {
  
  timerEl.textContent = time;

  
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials.length > 3) {
    initials = "initials"
  };

    var highscores =
      JSON.parse(localStorage.getItem("highscores")) || [];

   
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);{
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = '';
  }
};

function checkForEnter(event) {
  
  if (event.key === 'Enter') {
    saveHighscore();
  }
}


submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
