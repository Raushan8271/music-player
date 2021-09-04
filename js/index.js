let music = document.querySelector("audio")
let btn = document.getElementById("btn")

let isMusicPlay = false

function play() {
    isMusicPlay = !isMusicPlay
    isMusicPlay ? music.play() : music.pause();
    isMusicPlay ? btn.innerHTML = "pause" : btn.innerHTML = "play";
}