document.addEventListener("DOMContentLoaded", function() {
    // LOAD AUDIO FILE
    const music = new Audio('../assets/audio/background-audio.mp3');
    music.loop = true;
    let plays = 0;
    // MANIPULATE MUSIC ON SOUND CONTROL ICON CLICK
    let soundControl = document.getElementById("sound-control");
    soundControl.addEventListener("click", function() {
        let icons = this.getElementsByTagName("div");
        if (plays === 0) {
            music.play();
            plays = 1;
            icons[0].classList.toggle('icon-inactive')
            icons[1].classList.toggle('icon-inactive')
        } else {
            music.pause()
            plays = 0;
            icons[0].classList.toggle('icon-inactive')
            icons[1].classList.toggle('icon-inactive')
        }

    })


    // CHANGE CLASS FOR LEVEL ITEMS WHEN CLICKED
    let activeLevelValue;
    let levels = document.getElementById("game-prefferences").getElementsByTagName("li");
    for (let level of levels) {
        level.addEventListener("click", function() {
            this.classList.remove("level-inactive")
            this.classList.add("level-active");
            activeLevelValue = this.innerText.toLowerCase();

            // FOR EACH LEVEL THAT IS NOT ACTIVE DELETE ACTIVE CLASS
            for (level of levels) {
                if (level !== this && level.classList.contains("level-active")) {
                    level.classList.remove("level-active")
                    level.classList.add("level-inactive");
                }
            }
        })
    }


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

    })


})



/**
 * Replace the initial menu from game section with the game content
 */
function generateGameContent(activeLevelValue) {
    document.getElementById("game-section").innerHTML = "";

    // CREATES THE GAME HTML STRUCTURE
    let gameBody = `
            <div id="game-area">
                <div id="upper-section">
                    <!-- MELTING SNOWMAN CONTAINER -->
                    <div id="cartoon-container">
                        <img id="sun" src="assets/images/sun.png" alt="A smiling sun">
                        <p><span id="snowman-life">100</span>% LIFE</p>
                        <div id="melting-snowman-container">
                            <img id="hat" src="assets/images/hat.png" alt="A black hat">
                            <img class="body" src="assets/images/body.png" alt="A snowman body">
                            <img id="nose" src="assets/images/nose.png" alt="A carrot as a nose">
                            <img id="left-hand" src="assets/images/left-hand.png" alt="Snowman's left hand">
                            <img id="right-hand" src="assets/images/right-hand.png" alt="Snowman's right hand">
                        </div>
                    </div>
                    <!-- RANDOM WORD UNDERSCORES CONTAINER -->
                    <div id="level-container">
                        <p>Difficulty:</p>
                        <p>${activeLevelValue}</p>
                    </div>
                    <div id="word-container">
                        <p>${generateRandomWordUnderscores(activeLevelValue)}</p>
                    </div>
                    <div id="hint-container">
                        <i class="fas fa-lightbulb"></i>
                        <p id="hint"></p>
                    </div>
                </div>
                <!-- ALPHABET CONTAINER -->
                <div id="alphabet-container">
                    <ul>
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                        <li>d</li>
                        <li>e</li>
                        <li>f</li>
                        <li>g</li>
                        <li>h</li>
                        <li>i</li>
                        <li>j</li>
                        <li>k</li>
                        <li>l</li>
                        <li>m</li>
                        <li>n</li>
                        <li>o</li>
                        <li>p</li>
                        <li>q</li>
                        <li>r</li>
                        <li>s</li>
                        <li>t</li>
                        <li>u</li>
                        <li>v</li>
                        <li>w</li>
                        <li>x</li>
                        <li>y</li>
                        <li>z</li>
                    </ul>
                </div>
            </div>
            <!-- SCORE CONTAINER -->
            <div id="score-container">
                <p>Succes: <span>0</span></p>
                <p>Failure: <span>0</span></p>
            </div>
            <div id="lowest-buttons-container">
                <!-- TRY ANOTHER WORD BUTTON -->
                <button class="btn" type="submit">TRY ANOTHER ONE!</button>
                <!-- NEW GAME BUTTON -->
                <button class="btn" type="submit">START NEW GAME!</button>
            </div>
   
`

    document.getElementsByTagName("header")[0].getElementsByTagName("h2")[0].innerText = "Guess the word and help the snowman rezist the heat"
    // CHANGE BODY STYLE 
    document.body.style.backgroundAttachment = "unset";

    // STYLE CONTENT-WRAP DIV TO FIX THE FOOTER AT THE BOTTOM OF THE PAGE
    document.getElementById("content-wrap").style.paddingBottom = "90px";
    document.getElementById("content-wrap").style.position = "relative"
    document.getElementById("content-wrap").style.zIndex = "-3"

    document.getElementById("game-section").innerHTML = gameBody;
}

/**
 * Returns the underscores string that matches the random number generated
 *  depending on the level the user chose
 */
function generateRandomWordUnderscores(level) {
    const easyWords = ["cat", "sun", "cup", "ghost", "flower", "pie", "cow", "banana", "snowflake", "bug", "book", "jar",
        "snake", "light", "tree", "lips", "apple", "slide", "socks", "smile", "swing", "coat", "shoe", "water", "heart", "hat",
        "ocean", "kite", "dog", "mouth", "milk", "duck", "eyes", "skateboard", "bird", "boy", "apple", "person", "girl", "mouse",
        "ball", "house", "star", "nose", "bed", "whale", "jacket", "shirt", "hippo", "beach", "egg", "face", "cookie", "cheese",
        "ice cream", "drum", "circle", "spoon", "worm", "spider", "web", "bridge", "bone", "grapes", "bell", "jellyfish", "bunny",
        "truck", "grass", "door", "monkey", "spider", "bread", "ears", "bowl", "bracelet", "alligator", "clock", "lollipop",
        "moon", "doll", "orange", "ear", "basketball", "bike", "airplane", "inchworm", "seashell", "rocket", "cloud", "bear",
        "corn", "chicken", "purse"
    ];

    const mediumWords = ["horse", "door", "song", "trip", "backbone", "round", "treasure", "garbage", "park",
        "pirate", "ski", "state", "whistle", "palace", "baseball", "coal", "queen", "dominoes", "photograph", "computer",
        "hockey", "aircraft", "hot dog", "salt", "pepper", "key", "iPad", "whisk", "frog", "lawnmower", "mattress", "pinwheel",
        "cake", "circus", "battery", "mailman", "cowboy", "password", "bicycle", "skate", "electricity", "lightsaber",
        "thief", "teapot", "deep", "spring", "nature", "shallow", "toast", "outside", "roller", "blading", "bowtie",
        "half", "spare", "wax", "light", "bulb", "platypus", "music", "sailboat", "popsicle", "brain", "birthday",
        "cake", "skirt", "knee", "pineapple", "tusk", "sprinkler", "money", "spool", "lighthouse", "doormat", "face",
        "flute", "rug", "snowball", "purse", "owl", "gate", "suitcase", "stomach", "doghouse", "pajamas", "bathroom",
        "scale", "peach", "newspaper", "watering can", "hook", "school", "beaver", "french fries", "beehive", "beach",
        "artist", "flagpole", "camera", "hair dryer", "mushroom"
    ];
    const hardWords = ["snag", "jungle", "important", "mime", "peasant", "baggage", "hail", "clog", "pizza", "sauce",
        "password", "scream", "newsletter", "dripping", "pharmacist", "catalog", "ringleader", "husband", "laser", "diagonal",
        "comfy", "myth", "dorsal", "biscuit", "hydrogen", "macaroni", "rubber", "darkness", "yolk", "exercise", "vegetarian",
        "shrew", "chestnut", "ditch", "wobble", "glitter", "neighborhood", "dizzy", "fireside", "retail", "drawback", "logo",
        "fabric", "mirror", "barber", "jazz migrate", "drought", "commercial", "dashboard", "bargain", "double", "download",
        "professor", "landscape", "vitamin", "half", "cardboard", "drip", "shampoo", "point", "time", "machine", "yardstick",
        "think", "lace", "darts", "world", "avocado", "bleach", "shower", "curtain", "extension", "birthday", "sandbox",
        "bruise", "quicksand", "gasoline", "pocket", "sponge", "bride", "zipper", "letter", "opener", "fiddle", "water",
        "buffalo", "pilot", "brand", "pail", "baguette", "rib", "mascot", "fireman", "pole", "zoo", "sushi", "fizz",
        "ceiling", "bald", "banister", "punk", "post office", "season", "chess", "puppet", "chime", "full", "koala", "dentist"
    ];


    let wordArray = level.toLowerCase();

    let randomNumber;
    let randomWord;

    // GETS RANDOM WORD FROM ARRAY
    if (wordArray === "easy") {

        randomNumber = Math.floor(Math.random() * (9));
        randomWord = easyWords[randomNumber];

    } else if (wordArray === "medium") {

        randomNumber = Math.floor(Math.random() * (mediumWords.length - 1));
        randomWord = mediumWords[randomNumber];

    } else {

        randomNumber = Math.floor(Math.random() * (hardWords.length - 1));
        randomWord = hardWords[randomNumber];

    }

    // GETS UNDERSCORES MATCHING RANDOM WORD
    let wordUnderscores = "";

    for (let char of randomWord) {
        if (char === " ")
            wordUnderscores += " ";
        else
            wordUnderscores += "_ "
    }

    return wordUnderscores;

}