const prompt = require('prompt-sync')({ sigint: true });

let wins = 0;
let losses = 0;
let ties = 0;

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)]; 
    // Wybierasz z liczbę zaokrągloną w dół z losowej liczby pomnożonej przez długość tablicy 



}



function getPlayerChoice() {
    while (true) {
        const choice = prompt('Enter your choice (rock/paper/scissors) or "q" to quit: ').toLowerCase();
        if (choice === 'q') return 'q';
        if (choices.includes(choice)) return choice;
        console.log('Invalid choice. Please try again.');
    }
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'tie';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function playRound() {
    const playerChoice = getPlayerChoice();
    if (playerChoice === 'q') return false;

    const computerChoice = getComputerChoice();

    console.log(`You chose: ${playerChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    const result = determineWinner(playerChoice, computerChoice);
    // Tablica z wynikami
    switch (result) {
        case 'tie':
            console.log('It\'s a tie!');
            ties++;
            break;
        case 'player':
            console.log('You win this round!');
            wins++;
            break;
        case 'computer':
            console.log('You lose this round!');
            losses++;
            break;
    }

    return true;
}

function displayStats() {
    console.log('\n--- Game Statistics ---');
    console.log(`Wins: ${wins}`);
    console.log(`Losses: ${losses}`);
    console.log(`Ties: ${ties}`);
    console.log(`Total games: ${wins + losses + ties}`);
    console.log(`Win rate: ${((wins / (wins + losses + ties)) * 100).toFixed(2)}%`);
}

function playGame() {
    console.log('Welcome to Rock Paper Scissors!');
    console.log('Play as many rounds as you like. Enter "q" to quit.');

    while (true) { // Jeżeli nie jest prawdą to koniec i wyświetla staty i dziękuje za grę
        console.log('\n--- New Round ---');
        const continuePlaying = playRound();
        if (!continuePlaying) break;
        displayStats();
    }

    console.log('\nThanks for playing!');
    displayStats();
}

playGame();