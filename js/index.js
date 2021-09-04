let music = document.querySelector("audio")
let btn = document.getElementById("btn")
let totalTime = document.getElementById("duration")
let current = document.getElementById("current")
let progress = document.getElementById("progress")

let isMusicPlay = false
let st = 0
let w = 1

function play() {
    isMusicPlay = !isMusicPlay
    isMusicPlay ? music.play() : music.pause();
    isMusicPlay ? btn.innerHTML = "pause" : btn.innerHTML = "play";
}

music.addEventListener("timeupdate", (e) => {
    // console.log(e)
    let { currentTime, duration } = e.srcElement;
    totalTime.innerHTML = `Duration: ${Math.floor(duration)} Sec`;
    current.innerHTML = `Duration: ${Math.floor(currentTime)} Sec`;
    let avgTime = (currentTime / duration) * 100
    progress.style.width = `${avgTime}%`
})