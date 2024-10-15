const prompt = require('prompt-sync')({ sigint: true });

// Game state
let player = {
    name: '',
    health: 100,
    inventory: [],
    gold: 0
};

let gameOver = false;

// Helper functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function promptChoice(question, choices) {
    while (true) {
        console.log(question);
        choices.forEach((choice, index) => {
            console.log(`${index + 1}. ${choice}`);
        });
        const answer = prompt('Enter your choice (number): ');
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < choices.length) {
            return choices[index];
        }
        console.log('Invalid choice. Please try again.');
    }
}

function addToInventory(item) {
    player.inventory.push(item);
    console.log(`You obtained: ${item}`);
}

function combat(enemyName, enemyHealth) {
    console.log(`\nA wild ${enemyName} appears!`);
    while (enemyHealth > 0 && player.health > 0) {
        const action = promptChoice('What will you do?', ['Attack', 'Defend', 'Run']);
        if (action === 'Attack') {
            const damage = randomInt(5, 15);
            enemyHealth -= damage;
            console.log(`You deal ${damage} damage to the ${enemyName}.`);
            if (enemyHealth <= 0) {
                console.log(`You defeated the ${enemyName}!`);
                const goldReward = randomInt(10, 50);
                player.gold += goldReward;
                console.log(`You found ${goldReward} gold!`);
                return true;
            }
        } else if (action === 'Defend') {
            console.log('You brace yourself for the attack.');
        } else {
            if (Math.random() < 0.5) {
                console.log('You managed to escape!');
                return false;
            } else {
                console.log('You failed to escape!');
            }
        }

        const enemyDamage = randomInt(3, 10);
        player.health -= enemyDamage;
        console.log(`The ${enemyName} attacks you for ${enemyDamage} damage.`);
        console.log(`Your health: ${player.health}`);
        if (player.health <= 0) {
            console.log('You have been defeated...');
            gameOver = true;
            return false;
        }
    }
}

function randomEvent() {
    const events = [
        () => {
            console.log('You find a healing potion!');
            addToInventory('Healing Potion');
        },
        () => {
            const gold = randomInt(5, 20);
            console.log(`You stumble upon ${gold} gold coins!`);
            player.gold += gold;
        },
        () => {
            console.log('You trigger a trap!');
            const damage = randomInt(5, 15);
            player.health -= damage;
            console.log(`You take ${damage} damage. Current health: ${player.health}`);
            if (player.health <= 0) {
                console.log('You have succumbed to your wounds...');
                gameOver = true;
            }
        }
    ];
    events[randomInt(0, events.length - 1)]();
}

// Game scenarios
function start() {
    console.log('Welcome to the Advanced Text Adventure!');
    player.name = prompt('What is your name, brave adventurer? ');
    console.log(`Welcome, ${player.name}! Your journey begins now...`);
    mainPath();
}

function mainPath() {
    while (!gameOver) {
        const choice = promptChoice('You come to a fork in the road. Which path will you take?', ['Left', 'Right', 'Forward']);
        
        if (Math.random() < 0.3) {
            randomEvent();
            if (gameOver) break;
        }

        switch (choice) {
            case 'Left':
                leftPath();
                break;
            case 'Right':
                rightPath();
                break;
            case 'Forward':
                forwardPath();
                break;
        }
    }
    
    if (gameOver) {
        console.log('Game Over!');
        console.log(`Final Stats:`);
        console.log(`Health: ${player.health}`);
        console.log(`Gold: ${player.gold}`);
        console.log(`Inventory: ${player.inventory.join(', ')}`);
    }
}

function leftPath() {
    console.log('You venture down the left path...');
    const choice = promptChoice('You encounter a mysterious old man. What do you do?', ['Talk to him', 'Ignore him and move on']);
    
    if (choice === 'Talk to him') {
        console.log('The old man gives you a magic amulet!');
        addToInventory('Magic Amulet');
    } else {
        console.log('You pass by the old man and continue on your journey.');
    }
}

function rightPath() {
    console.log('You take the right path and enter a dark forest...');
    if (combat('Goblin', 30)) {
        const choice = promptChoice('You find a treasure chest! What do you do?', ['Open it', 'Leave it']);
        if (choice === 'Open it') {
            if (Math.random() < 0.7) {
                const gold = randomInt(20, 100);
                console.log(`You found ${gold} gold in the chest!`);
                player.gold += gold;
            } else {
                console.log('It was a trap! Poisonous gas deals 10 damage.');
                player.health -= 10;
                if (player.health <= 0) {
                    console.log('You have succumbed to the poison...');
                    gameOver = true;
                }
            }
        } else {
            console.log('You decide not to risk it and move on.');
        }
    }
}

function forwardPath() {
    console.log('You continue forward and reach a small village...');
    const choice = promptChoice('What would you like to do in the village?', ['Visit the shop', 'Rest at the inn', 'Leave the village']);
    
    switch (choice) {
        case 'Visit the shop':
            shop();
            break;
        case 'Rest at the inn':
            console.log('You rest at the inn and recover your health.');
            player.health = 100;
            break;
        case 'Leave the village':
            console.log('You leave the village and continue your adventure.');
            break;
    }
}

function shop() {
    console.log(`Welcome to the shop! You have ${player.gold} gold.`);
    const items = [
        { name: 'Health Potion', price: 20 },
        { name: 'Sword', price: 50 },
        { name: 'Shield', price: 40 }
    ];
    
    while (true) {
        const choices = items.map(item => `${item.name} (${item.price} gold)`).concat(['Leave shop']);
        const choice = promptChoice('What would you like to buy?', choices);
        
        if (choice === 'Leave shop') {
            console.log('Thank you for visiting!');
            break;
        }
        
        const item = items.find(i => choice.startsWith(i.name));
        if (player.gold >= item.price) {
            player.gold -= item.price;
            addToInventory(item.name);
            console.log(`You bought ${item.name} for ${item.price} gold.`);
        } else {
            console.log('You don\'t have enough gold for that item.');
        }
    }
}

// Start the game
start();