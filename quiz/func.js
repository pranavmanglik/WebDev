const questions = [
  {
    question: "What does AI stand for?",
    options: [
      "Artificial Intelligence",
      "Automated Interface",
      "Algorithm Integration",
      "Artificial Interaction",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a type of machine learning?",
    options: [
      "Supervised Learning",
      "Random Learning",
      "Critical Learning",
      "Unsupervised Learning",
    ],
    answer: 0,
  },
  {
    question: "What is the primary goal of artificial intelligence?",
    options: [
      "To simulate human intelligence",
      "To create robots",
      "To increase computing speed",
      "To manage databases",
    ],
    answer: 0,
  },
  {
    question: "Which company developed the AI program Watson?",
    options: ["Google", "Microsoft", "IBM", "Amazon"],
    answer: 2,
  },
  {
    question: "What is a neural network?",
    options: [
      "A type of computer virus",
      "A system of algorithms modeled after the human brain",
      "A social network for AI researchers",
      "A programming language",
    ],
    answer: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let scoreHistory = JSON.parse(sessionStorage.getItem("scoreHistory")) || [];

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
          <div class="mb-4">
              <h2 class="text-xl">${question.question}</h2>
          </div>
          <div class="flex flex-col">
              ${question.options
                .map(
                  (option, index) => `
                  <button class="bg-blue-500 p-2 mb-2 rounded-lg" onclick="selectOption(${index})">${option}</button>
              `
                )
                .join("")}
          </div>
      `;
  } else {
    displayResult();
  }
}

function selectOption(selectedIndex) {
  const question = questions[currentQuestionIndex];
  if (selectedIndex === question.answer) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function displayResult() {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `Your score: ${score} out of ${questions.length}`;
  resultContainer.classList.remove("hidden");

  saveScore(score);
  renderScoreHistory();
}

function saveScore(score) {
  scoreHistory.unshift(score);
  if (scoreHistory.length > 10) scoreHistory.pop();
  sessionStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
}

function renderScoreHistory() {
  const scoreHistoryContainer = document.getElementById("score-history");
  scoreHistoryContainer.innerHTML = `
      <h2 class="font-bold">Score History</h2>
      <ul>
          ${scoreHistory.map((score) => `<li>${score}</li>`).join("")}
      </ul>
  `;
}

window.onload = function () {
  loadQuestion();
  renderScoreHistory();
};
