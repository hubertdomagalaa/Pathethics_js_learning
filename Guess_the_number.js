const prompt = require('prompt-sync')()

const target = 10 + Math.round(Math.random() * 90);
console.log(target);

let guesses = 0;


while (true){
    guesses++;

    
    const guess = prompt('Guess a number between 10 and 100: ');
    if (guess > target){
        console.log('Too high!');
    } else if (guess < target){
        console.log('Too low!');
    } else {
        console.log('Correct!');
        break
    }
}