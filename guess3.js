'use strict';

let min = 1;
let max = parseInt(process.argv.slice(2));
if (isNaN(max)) {
    max = 100
}

function capitalizeOut(name) {

    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

pickGame(min, max)

function pickGame(min, max) {
    console.log("Welcome to the guess a number game! You can choose to guess the computers number by typing 'H' or you can have the computer guess your number by typing 'C'.")
    console.log("The number will be between " + min + ", and " + max + ". You can change the maximum by entering a number on the command line when running the game!");
    process.stdin.once('data', (chunk) => {
        let whichGame = chunk.toString().trim();
        if (whichGame == "") {
            console.log("You have to type in a letter!")
        } else if (capitalizeOut(whichGame) == "C") {
            computerGuessGame(min, max)
        } else if (capitalizeOut(whichGame) == "H") {
            humanGuessGame(min, max)
        } else {
            console.log("Wrong letter, try again!")
        }

    })
    
}
function computerGuessGame(min, max) {
    let calcMid = Math.floor((min + max) / 2);
    let guess = calcMid;

    let trys = 1;

    let numberOfGuesses = Math.ceil(Math.log2(max))

    console.log("Please think of a number between 1 and " + max + " (inclusive).");
    console.log("I will guess it in " + numberOfGuesses + " tries at the most.");

    guessAgain();

    function capitalize(name) {

        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    function guessAgain() {

        guess = calcMid;

        console.log("Is it... " + guess);
        console.log("Enter Y for Yes, H if it's higher than " + guess + ", L if it's lower than " + guess + ": ");
        process.stdin.once('data', (chunk) => {
            let answer = chunk.toString().trim();
            if (answer == "" || !answer) {
                console.log("You have to type in a letter!")
            } else if (capitalize(answer) == "H") {
                if (guess != max) {
                    min = calcMid + 1;
                    trys++;
                } else if (guess == max) {
                    console.log("It can't be higher than 100!!")
                } else {
                    console.log("You can't do that! You already said it was lower than " + (guess + 1))
                }
            } else if (capitalize(answer) == "L") {
                if (guess != min) {
                    max = calcMid - 1;
                    trys++;
                } else if (guess == min) {
                    console.log("It can't be lower than 1!!")
                } else {
                    console.log("You can't do that! You already said it was higher than " + (guess - 1))
                }
            } else if (capitalize(answer) == "Y") {
                console.log("Your number was " + guess + "!");
                console.log("I guessed it in " + trys + " tries.");
                process.exit()
            } else {
                console.log("Wrong letter, try again!")

            }
            calcMid = Math.floor((min + max) / 2);

            guessAgain();

        });
        
    }
}
function humanGuessGame(min, max) {
    let maxNumberGuesses = Math.ceil(Math.log2(max))

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let tries = 1
    let computerNumber = getRandomIntInclusive(min, max)


    guessNumber()


    function guessNumber() {
        console.log("I'm thinking of a number between " + min + " and " + max + " (Inclusive). Can you guess it in " + maxNumberGuesses + " tries?")
        console.log("Enter a number: ")
        process.stdin.on('data', (chunk) => {
            let humanGuess = Number(chunk.toString().trim());
            if (isNaN(humanGuess)) {
                console.log("Please enter a number!")
            } else if (humanGuess == 0) {
                console.log("You have to enter a number!")
            } else if (humanGuess < min) {
                console.log("I already told you it can't be lower than " + min + ".")
            } else if (humanGuess > max) {
                console.log("I already told you it can't be higher than " + max + ".")
            } else if (humanGuess < computerNumber) {
                if (max != 100) {
                    console.log("Nope, it's higher than " + humanGuess + " but lower than " + max + "! Guess again.")
                    min = humanGuess
                    tries++
                } else {
                    console.log("Nope, it's higher than " + humanGuess + " but lower than, or including " + max + "! Guess again.")
                    min = humanGuess
                    tries++
                }
            } else if (humanGuess > computerNumber) {
                if (min != 1) {
                    console.log("Nope, it's lower than " + humanGuess + " but higher than " + min + "! Guess again.")
                    max = humanGuess
                    tries++
                } else {
                    console.log("Nope, it's lower than " + humanGuess + " but higher than, or including " + min + "! Guess again.")
                    max = humanGuess
                    tries++
                }
            } else if (humanGuess == computerNumber) {
                if (tries < maxNumberGuesses) {
                    console.log("You guessed it in " + tries + " tries! Congratulations on guessing it in less than " + maxNumberGuesses + " tries!")
                    process.exit();
                } else if (tries > maxNumberGuesses) {
                    console.log("It took " + tries + " tries. That's more than " + maxNumberGuesses + " tries, better luck next time.")
                    process.exit();
                } else if (tries == maxNumberGuesses) {
                    console.log("It took exactly " + tries + " out of " + maxNumberGuesses + " tries. Nice job!")
                    process.exit();
                }
            } else {
                console.log("What?")
                process.exit();
            }

        })
    }
}

// function askPlayAgain() {
//     console.log("Do you want to play again? Enter 'Y' for yes, or 'N' for no")
//     process.stdin.once('data', (chunk) => {
//         let playAgain = chunk.toString().trim();
//         if (playAgain == "") {
//             console.log("You have to type in a letter!")
//         } else if (capitalizeOut(playAgain) == "Y") {
//             pickGame(min, max)
//         } else if (capitalizeOut(playAgain) == "N") {
//             console.log("Thanks for playing! Bye!")
//             process.exit();
//         } else {
//             console.log("Wrong letter, try again!")
//         }

//     })
// }