const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  { question: "What is the capital of France?", answer: "PARIS" },
  { question: "Which planet is known as the Red Planet?", answer: "MARS" },
  { question: "What is the largest mammal in the world?", answer: "BLUE WHALE" },
  { question: "Who painted the Mona Lisa?", answer: "LEONARDO DA VINCI" },
  { question: "What is the chemical symbol for gold?", answer: "AU" },
  { question: "Which country is home to the kangaroo?", answer: "AUSTRALIA" },
  { question: "What is the largest organ in the human body?", answer: "SKIN" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "WILLIAM SHAKESPEARE" },
  { question: "What is the capital of Japan?", answer: "TOKYO" },
  { question: "Which element has the chemical symbol 'O'?", answer: "OXYGEN" },
  { question: "What is the largest ocean on Earth?", answer: "PACIFIC" },
  { question: "Who is known as the father of modern physics?", answer: "ALBERT EINSTEIN" },
  { question: "What is the currency of the United Kingdom?", answer: "POUND STERLING" },
  { question: "Which planet in our solar system is the largest?", answer: "JUPITER" },
  { question: "What is the smallest country in the world?", answer: "VATICAN CITY" },
  { question: "Who painted 'Starry Night'?", answer: "VINCENT VAN GOGH" },
  { question: "What is the capital of Brazil?", answer: "BRASILIA" },
  { question: "Which element is the most abundant in the Earth's atmosphere?", answer: "NITROGEN" },
  { question: "Who wrote '1984'?", answer: "GEORGE ORWELL" },
  { question: "What is the largest desert in the world?", answer: "ANTARCTICA" },
  { question: "What is the smallest prime number?", answer: "2" },
  { question: "Who discovered penicillin?", answer: "ALEXANDER FLEMING" },
  { question: "What is the capital of Canada?", answer: "OTTAWA" }
];

let correctAnswers = 0;
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion < questions.length) {
    rl.question(`${questions[currentQuestion].question} `, (answer) => {
      if (answer.toUpperCase() === questions[currentQuestion].answer) {
        console.log('Correct!');
        correctAnswers++;
      } else {
        console.log(`Incorrect. The correct answer is ${questions[currentQuestion].answer}.`);
      }
      currentQuestion++;
      updateScoreboard();
      askQuestion();
    });
  } else {
    endQuiz();
  }
}

function updateScoreboard() {
  console.clear();
  console.log('=== Quiz Scoreboard ===');
  console.log(`Questions answered: ${currentQuestion}/${questions.length}`);
  console.log(`Correct answers: ${correctAnswers}`);
  console.log(`Score: ${Math.round((correctAnswers / currentQuestion) * 100)}%`);
  console.log('======================\n');
}

function endQuiz() {
  console.log(`\nQuiz completed! You got ${correctAnswers} out of ${questions.length} questions correct.`);
  console.log(`Your final score is: ${Math.round((correctAnswers / questions.length) * 100)}%`);
  rl.close();
}

console.log('Welcome to the Enhanced Quiz Game!');
console.log('Answer the following questions to the best of your ability.\n');
askQuestion();















/*
Żałosna początkowa wersja


// node quiz.js

// Dopracować to wszystko 

const prompt = require('prompt-sync')()

console.log('Welcome to the quiz!');

let correctAnswers = 0;

const questionOne = prompt('What is the capital of France?   ');
const correctAnswer1 = 'PARIS';

if (questionOne.upper() === correctAnswer1) {
    console.log('Correct!');
    correctAnswers += 1; // add 1 to correctAnswers
} else {
        console.log('Incorrect! You are dumbass!');
}

const answer2 = prompt('What is your favourite fruit?   ');
const correctAnswer2 = 'Pussy';

if (answer2 === correctAnswer2) {
    console.log('You have good sense of humor');
} else {
        console.log('Are you gay?');
}


const answerr = prompt('Frog or Dog?   ');
const correct_answerr = 'Frog';

if (answerr === correct_answerr) {
    console.log('Correct!');
} else {
        console.log('Incorrect!');

}


console.log('You got ' + correctAnswers + '  questions correct!');





*/



