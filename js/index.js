let music = document.querySelector("audio")
let btn = document.getElementById("btn")
let totalTime = document.getElementById("duration")
let current = document.getElementById("current")
let progress = document.getElementById("progress")
let canvasProgress = document.getElementById("canvasProgress")
let progress_div = document.getElementById("progress_div")


let isMusicPlay = false

function play() {
    isMusicPlay = !isMusicPlay
    isMusicPlay ? music.play() : music.pause();
    isMusicPlay ? btn.innerHTML = "pause" : btn.innerHTML = "play";
}

music.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.srcElement;
    current.innerHTML = `Current: ${Math.floor(currentTime)} Sec`;
    totalTime.innerHTML = `Duration: ${Math.floor(duration)} Sec`;
    let avgTime = (currentTime / duration) * 100
    progress.style.width = `${avgTime}%`
    
})

progress_div.addEventListener('click', (e) => {
    let { offsetX } = e
    let { clientWidth } = e.srcElement
    // console.log(offsetX)
    console.log(clientWidth)
    let avgTime = (offsetX / clientWidth) * 100
    // console.log(avgTime)
    // console.log(music.currentTime)
    // music.currentTime = avgTime
})