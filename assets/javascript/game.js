// Function for intro screen
function introScreen() {
    console.log("Begin introScreen function")
    document.getElementById("intro").innerHTML = "Welcome. Press Enter to begin.";
    document.getElementById("userInput").innerHTML = "";
    document.getElementById("userDisplay").innerHTML = "";
    document.getElementById("isLetterThere").innerHTML = "";
    document.getElementById("lives").innerHTML = "";
    document.getElementById("gameEndMessage").innerHTML = "";
    document.onkeyup = function(event) {
        if (event.keyCode == 13) {
            mainGame();
        }
    }
}

introScreen();


function mainGame() {
    console.log("Begin mainGame function")
    // Clear intro screen
    document.getElementById("intro").innerHTML = "";

    // Set number of lives (incorrect guesses)
    var lives = 10;
    document.getElementById("lives").innerHTML = "Lives: " + lives;

    // Creates an array that lists out all of the possible words.
    var wordBank = ["bakery", "apple", "banana", "waffle", "biscotti", "blueberry", "muffin"];
    // Choose random word
    var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create array used for internal letter checking, not shown to player. Pull letters from chosenWord and push into internal array.
    var internalArray = [];
    for (var n = 0; n < randomWord.length; n++) {
        internalArray.push(randomWord.charAt(n));
    }

    // Dev
    console.log(randomWord)
    console.log(internalArray)

    // Create array used as display for player, initially filled with unknown letters
    var displayArray = [];
    for (var n = 0; n < randomWord.length; n++) {
        displayArray.push("_");
    }

    // Show initial display to player
    var display = displayArray.join(" ");
    document.getElementById("userDisplay").innerHTML = display;

    var unguessedLetters = internalArray.length;

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

        // Determines which key was pressed.
        var userGuess = event.key;

        // Function for filtering non-valid key inputs
        var validKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        function isValid(validKeys,userGuess) {
            return (validKeys.indexOf(userGuess) != -1);
        }
        isValid(validKeys,userGuess);

        if (isValid()) {
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
            }
            console.log(userGuess)
            console.log("foundCount value: " + foundCount);

            if (lives === 0) {
                document.getElementById("gameEndMessage").innerHTML = "You dead bruh. Press Enter to play again.";
                document.onkeyup = function() {introScreen()};
            }

            if (unguessedLetters === 0) {
                document.getElementById("gameEndMessage").innerHTML = "You win! Press Enter to play again.";
                document.onkeyup = function(event) {
                    if (event.keyCode == 13) {
                        introScreen();
                    }
                }
            }
        } else {
            console.log("invalid input")
        }
    }
}