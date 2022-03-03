document.addEventListener("DOMContentLoaded", function() {
    // LOAD AUDIO FILE
    const music = new Audio('../assets/audio/background-audio.mp3');
    music.loop = true;
    let plays = 0;
    // MANIPULATE MUSIC ON SOUND CONTROL ICON CLICK
    let soundControl = document.getElementById("sound-control");
    // ADD EVENT LISTENER FOR SOUND ICON
    soundControl.addEventListener("click", function() {
        let icons = this.getElementsByTagName("div");
        if (plays === 0) {
            music.play();
            plays = 1;
            icons[0].classList.toggle('icon-inactive');
            icons[1].classList.toggle('icon-inactive');
        } else {
            music.pause();
            plays = 0;
            icons[0].classList.toggle('icon-inactive');
            icons[1].classList.toggle('icon-inactive');
        }

    });

    // ADD EVENT LISTENER FOR MENU DIFFICULTY ITEMS
    // CHANGE CLASS FOR LEVEL ITEMS WHEN CLICKED
    let activeLevelValue;
    let levels = document.getElementById("game-prefferences").getElementsByTagName("li");
    for (let level of levels) {
        level.addEventListener("click", function() {
            this.classList.remove("level-inactive");
            this.classList.add("level-active");
            activeLevelValue = this.innerText.toLowerCase();

            // FOR EACH LEVEL THAT IS NOT ACTIVE DELETE ACTIVE CLASS
            for (level of levels) {
                if (level !== this && level.classList.contains("level-active")) {
                    level.classList.remove("level-active");
                    level.classList.add("level-inactive");
                }
            }
        });
    }

    // ADD EVENT LISTENER FOR PLAY BUTTIN
    let playButton = document.getElementById("game-prefferences").getElementsByTagName("button")[0];
    playButton.addEventListener("click", function() {
        // DISPLAY WARNING IF DIFFICULTY IS NOT SELECTED
        for (let level of levels) {
            let active = 0;
            if (level.classList.contains("level-active")) {
                generateGameContent(activeLevelValue);
                active = 1;
            } else {
                document.getElementById("level-warning").style.display = "block";
            }
            if (active === 1)
                break;

        }

    });


});



/**
 * Replace the initial menu from game section with the game content
 */
function generateGameContent(activeLevelValue) {
    const easyWords = ["cup", "ghost", "flower", "pie", "snowflake", "bug", "book", "jar", "light", "tree", "lips", "slide",
        "smile", "swing", "coat", "shoe", "hat", "ocean", "kite", "milk", "skateboard", "boy", "apple", "person", "girl",
        "ball", "house", "star", "bed", "jacket", "shirt", "hippo", "beach", "face", "cheese", "ice cream", "circle", "spoon",
        "bridge", "grapes", "bell", "truck", "grass", "door", "bread", "bowl", "bracelet", "clock", "lollipop", "doll", "orange",
        "ear", "basketball", "bike", "seashell", "cloud", "purse", "carrot", "pencil", "head", "lamp", "snowman", "chair", "leaf",
        "bunk", "baby", "bus", "cherry", "branch", "robot"
    ];

    const mediumWords = ["song", "trip", "backbone", "round", "treasure", "garbage", "park", "pirate", "ski", "state", "whistle",
        "palace", "coal", "queen", "dominoes", "photograph", "computer", "aircraft", "salt", "pepper", "key", "whisk", "lawnmower",
        "mattress", "pinwheel", "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "lightsaber",
        "thief", "teapot", "deep", "spring", "nature", "shallow", "toast", "outside", "roller", "bowtie", "half", "spare", "wax",
        "light", "bulb", "platypus", "sailboat", "birthday", "skirt", "knee", "tusk", "sprinkler", "money", "spool", "lighthouse",
        "doormat", "face", "flute", "rug", "snowball", "purse", "gate", "suitcase", "bathroom", "scale", "newspaper", "hook",
        "school", "beaver", "beehive", "artist", "flagpole", "camera", "mushroom"
    ];
    const hardWords = ["snag", "jungle", "important", "mime", "peasant", "baggage", "hail", "clog", "pizza", "sauce", "password",
        "scream", "newsletter", "pharmacist", "catalog", "ringleader", "husband", "diagonal", "comfy", "dorsal", "biscuit",
        "macaroni", "rubber", "darkness", "yolk", "exercise", "vegetarian", "chestnut", "ditch", "wobble", "glitter",
        "neighborhood", "dizzy", "fireside", "retail", "drawback", "fabric", "mirror", "barber", "jazz", "drought", "commercial",
        "dashboard", "bargain", "double", "download", "professor", "landscape", "half", "cardboard", "drip", "shampoo", "point",
        "time", "machine", "yardstick", "think", "lace", "darts", "world", "avocado", "bleach", "shower", "curtain", "extension",
        "sandbox", "bruise", "quicksand", "pocket", "bride", "zipper", "letter", "opener", "fiddle", "buffalo", "pilot", "brand",
        "pail", "baguette", "mascot", "fireman", "pole", "zoo", "sushi", "fizz", "ceiling", "bald", "banister", "punk",
        "post office", "season", "chess", "chime", "full", "koala", "dentist"
    ];

    // DISPLAY GAME CONTENT
    document.getElementById("game-prefferences").style.display = "none";
    document.getElementById("game-elements").style.opacity = "1";
    document.getElementById("game-elements").style.height = "auto";



    // CHANGE SUBTITLE
    document.getElementsByTagName("header")[0].getElementsByTagName("h2")[0].innerText = "Guess the word and help the snowman rezist the heat";
    // CHANGE BODY STYLE 
    document.body.style.backgroundAttachment = "unset";

    // STYLE CONTENT-WRAP DIV TO FIX THE FOOTER AT THE BOTTOM OF THE PAGE
    document.getElementById("content-wrap").style.paddingBottom = "780px";
    document.getElementById("content-wrap").style.position = "relative";
    document.getElementById("content-wrap").style.zIndex = "-3";

    // ADD LEVEL VALUE
    document.getElementById("level-container").getElementsByTagName("p")[1].innerText = activeLevelValue;

    // ASSIGN RANDOM WORD UNDERSCORES AND HINT TO DOM ELEMENTS
    var checkedWords = [];
    let actualRandomWord = generateRandomWord(activeLevelValue, easyWords, mediumWords, hardWords);
    document.getElementById("word-container").getElementsByTagName("p")[0].innerText = generateUnderscores(actualRandomWord);
    getHint(actualRandomWord);

    // ADD EVENT LISTENER FOR HINT
    document.getElementById("hint-container").getElementsByTagName("i")[0].addEventListener("click", function() {


        this.style.display = "none";
        document.getElementById("hint-container").getElementsByTagName("p")[0].style.display = "block";


    });

    // ADD THE WORD IN THE LIST OF PLAYED WORDS
    checkedWords.push(actualRandomWord);
    console.log(checkedWords);

    // ADD EVENT LISTENER FOR TRY ANOTHER WORD BUTTON
    document.getElementById("change-word-btn").addEventListener("click", function() {
        changeRandomWord(activeLevelValue, checkedWords, easyWords, mediumWords, hardWords);
    });

    let letters = document.getElementById("alphabet-container").getElementsByTagName("li");
    for (let letter of letters) {
        letter.addEventListener("click", function() {
            this.style.opacity = "0";
            // console.log("da")
            handleChosenLetter(this.innerText, activeLevelValue, checkedWords, easyWords, mediumWords, hardWords);

        });
    }
}

/**
 * Returns the underscores string that matches the random number generated
 *  depending on the level the user chose
 */
function generateRandomWord(level, easyWords, mediumWords, hardWords) {

    let wordArray = level.toLowerCase();

    let randomNumber;
    let randomWord;

    // GETS RANDOM WORD FROM ARRAY
    if (wordArray === "easy") {

        randomNumber = Math.floor(Math.random() * (easyWords.length));
        randomWord = easyWords[randomNumber];

    } else if (wordArray === "medium") {

        randomNumber = Math.floor(Math.random() * (mediumWords.length));
        randomWord = mediumWords[randomNumber];

    } else {

        randomNumber = Math.floor(Math.random() * (hardWords.length));
        randomWord = hardWords[randomNumber];

    }

    return randomWord;

}


/**
 * Returns the underscores string that matches the word given as a parameter
 */
function generateUnderscores(word) {

    let wordUnderscores = "";

    for (let char of word) {
        if (char === " ")
            wordUnderscores += " ";
        else
            wordUnderscores += "_";
    }

    return wordUnderscores;

}

/**
 * Replace the existing underscores string with another one generated from a random word 
 * that hasn't been played already
 */
function changeRandomWord(level, checkedWordsArray, easyWords, mediumWords, hardWords) {
    let arrayLength;

    if (level === "easy") {
        arrayLength = easyWords.length;
    } else if (level === "medium") {
        arrayLength = mediumWords.length;
    } else {
        arrayLength = hardWords.length;
    }

    // IF ALL THE WORDS HAVE BEEN PLAYED DISPLAY MESSAGE
    if (checkedWordsArray.length === arrayLength) {
        document.getElementById("hint-container").getElementsByTagName("i")[0].style.display = "none";
        document.getElementById("hint-container").getElementsByTagName("p")[0].style.display = "none";
        document.getElementById("hint-container").getElementsByTagName("p")[1].style.display = "block";
        document.getElementById("hint-container").getElementsByTagName("p")[1].innerText = "Sorry, there are no more words for this level";

    } else {

        refreshGame();

        let exist;
        let actualRandomWord
        // CHECK IF WORD ALREADY EXISTS IN THE PLAYED WORDS ARRAY
        do {

            actualRandomWord = generateRandomWord(level, easyWords, mediumWords, hardWords);
            exist = 0;
            for (let word of checkedWordsArray) {
                if (actualRandomWord === word)
                    exist = 1;
            }
        } while (exist === 1);

        // ASSIGN TO THE PROPPER ELEMENT IN THE DOM THE MATCHING UNDERSCORES STRING
        document.getElementById("word-container").getElementsByTagName("p")[0].innerText = generateUnderscores(actualRandomWord);

        // UPDATE THE HINT VALUE FOR THE NEW WORD CHOSEN
        getHint(actualRandomWord);

        // ADD THE WORD IN THE LIST OF PLAYED WORDS
        checkedWordsArray.push(actualRandomWord);
        console.log(checkedWordsArray);

    }



}

var data = " ";
/**
 * Makes an API request whith a method and url given as parameters
 */
function makeAPIRequest(method, url) {

    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, url);
        req.send();
        req.onload = function() {
            data = JSON.parse(req.responseText);
            if (req.status >= 200 && req.status < 300) {
                console.log('Request done succesfully');
                resolve(data);
            } else {
                reject(new Error(req.responseText));
            }
        };


    });
}



/**
 * Gets the right definition for the random word from Merriam-Webster Dictionary API 
 * and assign it as a hint for the word
 */
function getHint(word) {
    var hint;
    let definitions = [];
    makeAPIRequest('GET', "https://www.dictionaryapi.com/api/v3/references/sd4/json/" + word + "?key=4f833322-2eb0-44cf-87d4-cc9c0526e0c9")
        .then(response => {
            for (let option of data) {
                for (let def of option.shortdef) {
                    // EXCLUDE THE PART OF THE DEFINITION THAT COMES AFTER '.', ';' OR '-'
                    if (def.includes("."))
                        def = def.substr(0, def.indexOf('.'));
                    else if (def.includes(";"))
                        def = def.substr(0, def.indexOf(';'));
                    else if (def.includes("-"))
                        def = def.substr(0, def.indexOf('-'));

                    // EXCLUDE BRACES AND CONTENT BETWEEN THEM FROM THE DEFINITION
                    if (def.includes("(") && def.includes(")")) {
                        def = def.substr(0, def.indexOf('(')) + def.substr(def.indexOf(')') + 2, def.length);
                    }

                    // CAPITALIZE FIRST LETTER
                    definitions.push(def.charAt(0).toUpperCase() + def.slice(1));

                }
            }
            for (let definition of definitions) {
                // MEMORIZE ONLY THE DEFINITION THAT DOES NOT CONTAIN THE WORD
                if (!(definition.includes(" " + word + " ")) && !(definition.includes(" " + word)) && !(definition.includes(word + " ")) && definition.length > 10) {
                    hint = definition;
                    break;
                }

            }

            // ASSIGN THE HINT VALUE TO THE RIGHT ELEMENT IN THE DOM
            document.getElementById("hint-container").getElementsByTagName("p")[0].innerText = hint;

        });


}


/**
 * Check if the letter chosen by user is included in the random word.
 * If it is correct it updates the word string otherwise it manipulates the snowman life to decrease.
 * When word is complete it displays a message 
 */
function handleChosenLetter(letterValue, level, wordsArray, easyWords, mediumWords, hardWords) {

    // GETS THE ACTUAL WORD FROM THE PLAYED WORD ARRAY
    let word = wordsArray[wordsArray.length - 1];

    // GETS THE WORD STRING DISPLAYED FOR THE USER
    let gameWord = document.getElementById("word-container").getElementsByTagName("p")[0].innerText;

    // UPDATES THE WORD'S STRING BY INCLUDING THE CHOSEN LETTER IF CORRECT
    if (word.includes(letterValue)) {

        let wordUpdate = "";
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letterValue)
                wordUpdate += letterValue;
            else
                wordUpdate += gameWord[i];

        }

        document.getElementById("word-container").getElementsByTagName("p")[0].innerText = wordUpdate;
        if (word === wordUpdate) {
            updateScore(1);
            displayModal(1, level, wordsArray, easyWords, mediumWords, hardWords);
        }


    } else {
        checkLife(level, wordsArray, easyWords, mediumWords, hardWords);
    }
}

/**
 * Updates the snowman life value and opens a modal if snowman's life ended
 */
function checkLife(level, wordsArray, easyWords, mediumWords, hardWords) {
    let lifePercentage = document.getElementById("snowman-life").innerText;

    if (lifePercentage > 0) {
        document.getElementById("snowman-life").innerText = parseInt(lifePercentage) - 20;
        updateSnowman(parseInt(document.getElementById("snowman-life").innerText));

        if (parseInt(document.getElementById("snowman-life").innerText) === 0) {
            updateScore(0);
            displayModal(0, level, wordsArray, easyWords, mediumWords, hardWords)
        }
    }
}

/**
 * Updates the score depending on the parameter.
 * It either updates Success or Failure value
 */
function updateScore(value) {
    if (value === 1) {
        let existingSuccess = document.getElementById("success").innerText;
        document.getElementById("success").innerText = parseInt(existingSuccess) + 1;
    } else {
        let existingFailure = document.getElementById("failure").innerText;
        document.getElementById("failure").innerText = parseInt(existingFailure) + 1;

    }
}


/**
 * Updates the image of the snowman depending on the life left
 */
function updateSnowman(lifeValue) {
    if (lifeValue === 80) {
        document.getElementById("right-hand").style.transform = "translate(-10px, 50px)";
    } else if (lifeValue === 60) {
        document.getElementById("left-hand").style.transform = "translate(10px, 50px)";
    } else if (lifeValue === 40) {
        document.getElementById("hat").style.transform = "translate(20px, 75px)";
        document.getElementById("melted0").style.display = "none";
        document.getElementById("melted1").style.display = "block";

    } else if (lifeValue === 20) {
        document.getElementById("nose").style.transform = "translate(20px, 70px)";
        document.getElementById("melted1").style.display = "none";
        document.getElementById("melted2").style.display = "block";
    } else {
        document.getElementById("melted2").style.display = "none";
        document.getElementById("melted3").style.display = "block";
    }
}


/**
 * Displays modal and its elements depending on the first paremeter which sets success or failure case.
 * It adds click event listener to modal elements. 
 */
function displayModal(value, level, wordsArray, easyWords, mediumWords, hardWords) {

    // DISPLAYS MODAL 
    document.getElementById("myModal").style.display = "block";


    // ADD EVENT LISTENERS AND REMOVE THEM TO STOP THEM FIRING MULTIPLE TIMES
    function nextWordClickHandle() {
        changeRandomWord(level, wordsArray, easyWords, mediumWords, hardWords)
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modal-next-word").removeEventListener("click", nextWordClickHandle)

    }
    document.getElementById("modal-next-word").addEventListener("click", nextWordClickHandle)

    function newGameClickHandle() {
        window.location.href = "index.html";
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modal-new-game").removeEventListener("click", newGameClickHandle)
    }
    document.getElementById("modal-new-game").addEventListener("click", newGameClickHandle)


    // DELETE IMAGE LEFT FROM THE LAST SUCCESS OR FAILURE
    document.getElementById("success-image").style.display = "none";
    document.getElementById("failure-image").style.display = "none";


    // DISPLAYS SUCCES OR FAILURE ELEMENTS
    if (value === 1) {
        document.getElementById("modal-message").innerText = "Yuhuuu! \nYou saved the snowman";
        document.getElementById("success-image").style.display = "block";

    } else {
        document.getElementById("modal-message").innerText = "Oh,no... \nThe snowman melted";
        document.getElementById("failure-image").style.display = "block";
    }
}

function refreshGame() {
    // SET SNOWMAN LIFE TO INITIAL STATE
    document.getElementById("snowman-life").innerText = "100";

    // SET SNOWMAN IMAGE TO INITIAL STATE
    document.getElementById("melted0").style.display = "block";
    document.getElementById("melted1").style.display = "none";
    document.getElementById("melted2").style.display = "none";
    document.getElementById("melted3").style.display = "none";
    document.getElementById("hat").style.transform = "initial";
    document.getElementById("left-hand").style.transform = "initial";
    document.getElementById("right-hand").style.transform = "initial";
    document.getElementById("nose").style.transform = "initial";

    // SET HINT ELEMENTS TO INITIAL STYLE
    document.getElementById("hint-container").getElementsByTagName("i")[0].style.display = "block";
    document.getElementById("hint-container").getElementsByTagName("p")[0].style.display = "none";

    // SET ALPHABET IMAGE TO INITIAL STATE
    let alphabet = document.getElementById("alphabet-container").getElementsByTagName("li");
    for (let letter of alphabet) {
        letter.style.opacity = "1";
    }
}