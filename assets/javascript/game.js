// Creates an array that lists all possible words.
var wordBank = ["amys ice cream", "baskin robbins", "ben and jerrys", "birthday cake", "blue bell", "blueberry", "butter pecan", "cheesecake", "choco taco", "chocolate chip", "cookie dough", "cookies and cream", "dairy queen", "dippin dots", "french vanilla", "green tea", "haagen dazs", "ice cream cake", "marble slab", "milkshake", "mint chocolate chip", "neapolitan", "peanut butter", "pralines and cream", "red velvet cake", "rocky road", "salted caramel", "strawberry", "sugar cone", "tutti frutti", "vanilla bean", "waffle cone", "wafer cone"];

// Array of valid key inputs for guesses
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Run intro on initial page load
introScreen();

// Play music on load
var sound = document.getElementById("myMusic");
sound.loop = true;
sound.play();

// Create win counter
var winCount = 0;

// Create array of ice cream flavors for display
var flavor = ["mintcc", "rockyroad", "strawberry", "vanilla"];

// Function for showing ice cream display and selecting random flavors
function randomIceCream() {
    console.log("Begin randomIceCream function");
    // Set all scoops to visible
    for (f = 0; f < 6; f++) {
        document.getElementById("scoop" + f).style = "visibility: visible";
    }
    // Loop through scoop img elements 1-4 and replace src with random flavor
    for (z = 1; z < 5; z++) {
        document.getElementById("scoop" + z).src = "assets/images/" + flavor[Math.floor(Math.random() * flavor.length)] + ".png";
    }
}
randomIceCream(); 

// Function for intro screen
function introScreen() {
    console.log("Begin introScreen function")
    // Display welcome message
    document.getElementById("intro").innerHTML = "Welcome! Press Enter to begin."
 
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
    // Display initial text, clear any from previous game
    document.getElementById("intro").innerHTML = "";
    document.getElementById("userInput").innerHTML = "Press a key to guess that letter!";
    document.getElementById("isLetterThere").innerHTML = "&nbsp;";
    document.getElementById("wrongLetters").innerHTML = "Already guessed: ";
    document.getElementById("numberWins").innerHTML = "Number of wins: " + winCount;
    document.getElementById("gameEndMessage").innerHTML = "&nbsp;";

    // Set and display number of lives (incorrect guesses)
    var lives = 6;
    document.getElementById("lives").innerHTML = "Guesses remaining: " + lives;

    // Choose random word from wordBank
    var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    randomWord = randomWord.toUpperCase();

    // Create array used for internal letter checking, not shown to player. Pull letters from chosenWord and push into internal array.
    var internalArray = randomWord.split("");

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

    // Join initial display into string and show to player
    document.getElementById("userDisplay").innerHTML = displayArray.join(" ");


    // Array of wrongly guessed letters
    var wronglyGuessed = [];

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

        // Determines which key was pressed.
        var userGuess = event.key;
        userGuess = userGuess.toUpperCase();
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
                        document.getElementById("userDisplay").innerHTML = displayArray.join(" ");

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
                    // Update display of wrong guesses
                    document.getElementById("wrongLetters").innerHTML = "Already guessed: " + wronglyGuessed.join(" ");

                    // Hide topmost ice cream scoop to represent a life lost
                    document.getElementById("scoop" + lives).style = "visibility: hidden";
                    
                }
                console.log("foundCount value: " + foundCount);

                // Lose condition
                if (lives === 0) {
                    document.getElementById("gameEndMessage").innerHTML = "Out of ice cream! Press Enter to play again.";
                    // Restart game when Enter is pressed
                    document.onkeyup = function(event) {
                        if (event.keyCode == 13) {
                            randomIceCream(); 
                            mainGame();
                        }
                    }
                }

                // Win condition
                if (unguessedLetters === 0) {
                    document.getElementById("gameEndMessage").innerHTML = "You win! Press Enter to play again.";
                    // Update and display total number of wins
                    winCount++;
                    document.getElementById("numberWins").innerHTML = "Number of wins: " + winCount;
                    // Restart game when Enter is pressed
                    document.onkeyup = function(event) {
                        if (event.keyCode == 13) {
                            randomIceCream(); 
                            mainGame();
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

// Audio Buttons

// Pause audio and swap to Play button
function pauseAudio() {
    sound.pause();
    document.getElementById("buttonShow").innerHTML ="<button onclick='playAudio()' class='btn btn-outline-secondary btn-sm my-1' id='audioButton'>Play Audio</button>";
}
// Play audio and swap to Pause button
function playAudio() {
    sound.play();
    document.getElementById("buttonShow").innerHTML ="<button onclick='pauseAudio()' class='btn btn-outline-secondary btn-sm my-1' id='audioButton'>Pause Audio</button>";
}

