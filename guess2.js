let min = 1;
let max = parseInt(process.argv.slice(2));
if (isNaN(max)) {
    max = 100
}

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