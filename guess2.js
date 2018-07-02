let min = 1;
let max = parseInt(process.argv.slice(2));
if (isNaN(maxG)) {
    maxG = 100
}

let maxNumberGuesses = Math.ceil(Math.log2(maxG))

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let tries = 1
let computerNumber = getRandomIntInclusive(minG, maxG)


guessNumber()


function guessNumber() {
    console.log("I'm thinking of a number between " + minG + " and " + maxG + " (Inclusive). Can you guess it in " + numberOfGuesses + " tries?")
    console.log("Enter a number: ")
    process.stdin.on('data', (chunk) => {
        let humanGuess = Number(chunk.toString().trim());
        if (isNaN(humanGuess)) {
            console.log("Please enter a number!")
        } else if (humanGuess == 0) {
            console.log("You have to enter a number!")
        } else if (humanGuess < minG) {
            console.log("I already told you it can't be lower than " + minG + ".")
        } else if (humanGuess > maxG) {
            console.log("I already told you it can't be higher than " + maxG + ".")
        } else if (humanGuess < computerNumber) {
            if (maxG != 100) {
                console.log("Nope, it's higher than " + humanGuess + " but lower than " + maxG + "! Guess again.")
                minG = humanGuess
                trys++
            } else {
                console.log("Nope, it's higher than " + humanGuess + " but lower than, or including " + maxG + "! Guess again.")
                minG = humanGuess
                trys++
            }
        } else if (humanGuess > computerNumber) {
            if (minG != 1) {
                console.log("Nope, it's lower than " + humanGuess + " but higher than " + minG + "! Guess again.")
                maxG = humanGuess
                trys++
            } else {
                console.log("Nope, it's lower than " + humanGuess + " but higher than, or including " + minG + "! Guess again.")
                maxG = humanGuess
                trys++
            }
        } else if (humanGuess == computerNumber) {
            if (trys < numberOfGuesses) {
                console.log("You guessed it in " + trys + " tries! Congratulations on guessing it in less than " + numberOfGuesses + " tries!")
                process.exit();
            } else if (trys > numberOfGuesses) {
                console.log("It took " + trys + " tries. That's more than " + numberOfGuesses + " tries, better luck next time.")
                process.exit();
            } else if (trys == numberOfGuesses) {
                console.log("It took exactly " + trys + " out of " + numberOfGuesses + " tries. Nice job!")
                process.exit();
            }
        } else {
            console.log("What?")
            process.exit();
        }

    })
}