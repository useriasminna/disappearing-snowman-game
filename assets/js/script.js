document.addEventListener("DOMContentLoaded", function() {
    const music = new Audio('../assets/audio/background-audio.mp3');
    music.loop = true;
    let plays = 0;
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
        console.log(icons)



    })
})