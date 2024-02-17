
const prompt = require('prompt');

prompt.start();

//computer's selection
function getComputerSelection() {
    const randomNumber = Math.random();
    if (randomNumber < 0.34) {
        return "PAPER";
    } else if (randomNumber < 0.67) {
        return "SCISSORS";
    } else {
        return "ROCK";
    }
}

// winner
function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "It's a tie";
    } else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        return "User Wins";
    } else {
        return "Computer Wins";
    }
}

// Get user's selection
prompt.get(['userSelection'], function (err, result) {
    if (err) { return onErr(err); }
    
    const userSelection = result.userSelection.toUpperCase();
    
    // Validate user's selection
    if (["ROCK", "PAPER", "SCISSORS"].includes(userSelection)) {
        const computerSelection = getComputerSelection();
        console.log("User Selection:", userSelection);
        console.log("Computer Selection:", computerSelection);
        console.log("Outcome:", determineWinner(userSelection, computerSelection));
    } else {
        console.log("Invalid selection. Please choose ROCK, PAPER, or SCISSORS.");
    }
});

// Error function
function onErr(err) {
    console.log(err);
    return 1;
}
