// Creates an array that lists out all of the possible words.
var wordBank = ["almond cookie", "angelfood cake", "apple crisp", "apple pie", "baked Alaska", "baklava", "banana split", "Belgian waffle","biscotti", "black forest cake", "blueberry muffin", "Boston cream pie", "bread pudding", "brownie", "buttercream frosting", "butterscotch", "cannoli", "caramel apple", "carrot cake", "cheesecake", "cherry pie", "chocolate cake", "chocolate chip cookie", "chocolate mousse", "churro", "cinnamon roll", "coconut cream pie", "coffee cake", "cupcake", "custard", "Danish pastry", "dessert", "doughnut", "dumplings", "eclair", "fortune cookie", "French toast", "frosting", "frozen yogurt", "fruit cake", "fruit cocktail", "fruit salad", "gelatin", "gelato", "gingersnaps", "gingerbread", "ice cream", "ice cream cake", "jellyroll", "Key lime pie", "ladyfingers", "lemon bars", "lemon meringue pie", "macaroon", "marshmallow", "meringue", "milkshake", "molasses", "mousse", "muffin", "neapolitan ice cream", "nougat", "nut brittle", "oatmeal cookie", "pancakes", "panna cotta", "parfait", "pastry", "peanut brittle", "peanutbutter cookie", "pecan pie", "poached pears", "popcicle", "popover", "pound cake", "praline", "pudding", "pumpkin pie", "quick bread", "red velvet cake", "rhubarb pie", "raisin bread", "rice pudding", "sherbet", "shortbread", "smores", "snickerdoodle", "sorbet", "souffle", "sponge cake", "strawberry shortcake", "strudel", "sugar cookie", "sweet potato pie", "sweet roll", "tapioca pudding", "toasted marshmallow", "toffee", "truffle", "turnover", "vanilla cream pie", "vanilla pudding", "waffle", "yellow cake"];

// Array of valid key inputs for guesses
var validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Run intro on initial page load
introScreen();

// Function for intro screen
function introScreen() {
    console.log("Begin introScreen function")
    // Clear all text except welcome message
    document.getElementById("intro").innerHTML = "Welcome. Press Enter to begin.";
    document.getElementById("userInput").innerHTML = "";
    document.getElementById("userDisplay").innerHTML = "";
    document.getElementById("isLetterThere").innerHTML = "";
    document.getElementById("wrongLetters").innerHTML = "";
    document.getElementById("lives").innerHTML = "";
    document.getElementById("gameEndMessage").innerHTML = "";
    // Enter key begins mainGame
    document.onkeyup = function(event) {
        if (event.keyCode == 13) {
            mainGame();
        }
    }
}


// Function for game
function mainGame() {
    console.log("Begin mainGame function")
    // Change intro screen
    document.getElementById("intro").innerHTML = "";
    document.getElementById("userInput").innerHTML = "Press a Key to guess that letter!";

    // Set and display number of lives (incorrect guesses)
    var lives = 10;
    document.getElementById("lives").innerHTML = "Lives: " + lives;

    // Choose random word from wordBank
    var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create array used for internal letter checking, not shown to player. Pull letters from chosenWord and push into internal array.
    var internalArray = [];
    for (var n = 0; n < randomWord.length; n++) {
        internalArray.push(randomWord.charAt(n));
    }

    // Create var to use as countdown to check win condition
    var unguessedLetters = internalArray.length;

    // Dev
    console.log("randomWord: " + randomWord)

    // Create array used as display for player, initially filled with unknown letters
    var displayArray = [];
    for (var n = 0; n < randomWord.length; n++) {
        if (randomWord[n] == " ") {
            displayArray.push("&nbsp;");
            unguessedLetters--;
        } else {
        displayArray.push("_");
        }
    }

    // Show initial display to player
    var display = displayArray.join(" ");
    document.getElementById("userDisplay").innerHTML = display;


    // Array of wrongly guessed letters
    var wronglyGuessed = [];

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

        // Determines which key was pressed.
        var userGuess = event.key;
        console.log("userGuess: " + userGuess)
        
        // Only continue if input is valid key
        if (validKeys.indexOf(userGuess) != -1) { 
            // Only continue if input not already guessed (not found in wronglyGuessed or displayArray)
            if ((wronglyGuessed.indexOf(userGuess) === -1) && (displayArray.indexOf(userGuess) === -1)) {
                document.getElementById("userInput").innerHTML = "You chose: " + userGuess;

                // Create var to track if guess is incorrect (i.e. not found in word).
                var foundCount = 0;
                
                // Check if guessed letter exists in the word
                // Loop through all letter positions in word, in case of multiple occurrences of same letter
                for (i = 0; i < internalArray.length; i++) {
                    // If letter guessed is in word, display confirmation to user
                    if (internalArray[i] === userGuess) {
                        document.getElementById("isLetterThere").innerHTML = userGuess + " is in the word!";
                        console.log("Letter in array!")

                        // Replace _ with correctly guessed letter in display
                        displayArray[i] = userGuess;
                        console.log(displayArray)

                        // Update user display
                        var display = displayArray.join(" ");
                        document.getElementById("userDisplay").innerHTML = display;

                        // Update foundCount
                        foundCount++;
                        unguessedLetters--;
                    }
                }
                    
                // If no occurrences found in word, display result to user
                if (foundCount === 0) {
                    document.getElementById("isLetterThere").innerHTML = userGuess + " is not in the word!";
                    console.log("Letter not in array!")
                    lives--;
                    document.getElementById("lives").innerHTML = "Lives: " + lives;

                    // Add letter to already guessed
                    wronglyGuessed.push(userGuess);
                    console.log("wronglyGuessed array: " + wronglyGuessed);
                }
                console.log("foundCount value: " + foundCount);

                // Lose condition
                if (lives === 0) {
                    document.getElementById("gameEndMessage").innerHTML = "You dead bruh. Press Enter to play again.";
                    document.onkeyup = function() {introScreen()};
                }

                // Win condition
                if (unguessedLetters === 0) {
                    document.getElementById("gameEndMessage").innerHTML = "You win! Press Enter to play again.";
                    document.onkeyup = function(event) {
                        if (event.keyCode == 13) {
                            introScreen();
                        }
                    }
                }
            // If input has been guessed already
            } else {
                document.getElementById("userInput").innerHTML = userGuess + " has already been guessed!";
                console.log("Already guessed")
            }
        // If input is not valid key
        } else {
            console.log("Non-alpha input")
        }
    }
}