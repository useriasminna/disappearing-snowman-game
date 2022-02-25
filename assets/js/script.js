document.addEventListener("DOMContentLoaded", function() {
    // LOAD AUDIO FILE
    const music = new Audio('../assets/audio/background-audio.mp3');
    music.loop = true;
    let plays = 0;
    // MANIPULATE MUSIC ON SOUND CONTROL ICON CLICK
    let soundControl = document.getElementsByClassName("sound-control")[0];
    soundControl.addEventListener("click", function() {
        let icons = this.getElementsByTagName("div");
        if (plays === 0) {
            music.play();
            plays = 1;
            icons[0].classList.toggle('sound-inactive')
            icons[1].classList.toggle('sound-inactive')
        } else {
            music.pause()
            plays = 0;
            icons[0].classList.toggle('sound-inactive')
            icons[1].classList.toggle('sound-inactive')
        }

    })


    // CHANGE CLASS FOR LEVEL ITEMS WHEN CLICKED
    let levels = document.getElementById("game-prefferences").getElementsByTagName("li");
    for (let level of levels) {
        level.addEventListener("click", function() {
            console.log("da")
            this.classList.remove("level-inactive")
            this.classList.add("level-active");

            for (level of levels) {
                if (level !== this && level.classList.contains("level-active")) {
                    level.classList.remove("level-active")
                    level.classList.add("level-inactive");
                }
            }
        })
    }




})