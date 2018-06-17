let min = 1;
let max = parseInt(process.argv.slice(2));
if (isNaN(max)) {
    max = 100
}

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
        if (answer == "") {
            console.log("You have to type in a letter!")
        } else if (capitalize(answer) == "H") {
            if (guess != max) {
                min = calcMid + 1;
                trys++;
            } else if (guess == max) {
                console.log("It can't be higher than 100!!")
            } else {
                console.log("You can't do that! You already said it was lower than " + (guess+1))
            }
        } else if (capitalize(answer) == "L") {
            if (guess != min) {
                max = calcMid - 1;
                trys++;
            } else if (guess == min) {
                console.log("It can't be lower than 1!!")
            } else {
                console.log("You can't do that! You already said it was higher than " + (guess-1))
            }
        } else if (capitalize(answer) == "Y") {
            console.log("Your number was " + guess + "!");
            console.log("I guessed it in " + trys + " tries.");
            process.exit();
        } else {
            console.log("Wrong letter, try again!")

        }
        calcMid = Math.floor((min + max) / 2);
        
        guessAgain();

    });

}
