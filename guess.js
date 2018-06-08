
let min = 1;
let max = 100;

let calcMid = Math.floor((min + max) / 2);
let guess = calcMid;

let trys = 1;

function capitalize(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

console.log("Please think of a number between 1 and 100 (inclusive).");
console.log("I will try to guess it.");
function guessAgain() {

    guess = calcMid;

    console.log("Is it... " + guess);
    console.log("Enter Y for Yes, H if it's higher than " + guess + ", L if it's lower than " + guess + ": ");
    process.stdin.once('data', (chunk) => {
        let answer = chunk.toString().trim();

        if (capitalize(answer) == "H") {

            min = calcMid + 1;
            trys++;
        } else if (capitalize(answer) == "L") {

            max = calcMid - 1;
            trys++;
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
guessAgain();