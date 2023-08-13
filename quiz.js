//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What does HTML stand for?",
    options: ["Hyperlinking Text Management Language", "Hyper Text Markup Language", "High Tech Multimedia Language", "Hyper Transfer Markup Language"],
    correct: "Hyper Text Markup Language",
  },
  {
    id: "1",
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<li>", "<ul>", "<ulist>"],
    correct: "<ul>",
  },
  {
    id: "2",
    question: "What does the li tag represent in HTML?",
    options: ["List Item", "List Index", "List Indicator", "List Input"],
    correct: "List Item",
  },
  {
    id: "3",
    question: "In HTML, which tag is used to create a line break within the text?",
    options: ["<lb>", "<newline>", "<break>", "<br>"],
    correct: "<br>",
  },
  {
    id: "4",
    question: "Which of the following is a correct heading tag in HTML for the largest heading?",
    options: ["<h1>", "<head>", "<h6>", "<heading>"],
    correct: "<h1>",
  },
  {
    id: "5",
    question: "Which tag is used to define the main content of an HTML document?",
    options: ["<article>", "<body>", "<main>", "<content>"],
    correct: "<main>",
  },
  {
    id: "6",
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<hyperlink>", "<url>"],
    correct: "<a>",
  },
  
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 6;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};


// Quiz Creation
function quizCreator() {
    // Clear existing content
    quizContainer.innerHTML = '';
  
    for (let i of quizArray) {
      // Create a container for the current question
      let div = document.createElement('div');
      div.classList.add('container-mid', 'hide');
  
      // Create question element
      let question_DIV = document.createElement('p');
      question_DIV.classList.add('question');
      question_DIV.innerHTML = i.question;
      div.appendChild(question_DIV);
  
      // Create options buttons
      for (let option of i.options) {
        let optionButton = document.createElement('button');
        optionButton.classList.add('option-div');
        optionButton.innerText = option;
        optionButton.addEventListener('click', function () {
          checker(this);
        });
        div.appendChild(optionButton);
      }
  
      // Append the question container to the quiz container
      quizContainer.appendChild(div);
    }
  }