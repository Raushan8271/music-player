let music = document.querySelector("audio")
let btn = document.getElementById("btn")
let totalTime = document.getElementById("duration")
let current = document.getElementById("current")
let progress = document.getElementById("progress")
let canvasProgress = document.getElementById("canvasProgress")
let progress_div = document.getElementById("progress_div")


let isMusicPlay = false

// play and pause function 
function play() {
    isMusicPlay = !isMusicPlay
    isMusicPlay ? music.play() : music.pause();
    isMusicPlay ? btn.innerHTML = `<span class="material-icons">pause</span>`
        : btn.innerHTML = `<span class="material-icons">play_arrow</span>`;
}

music.addEventListener("timeupdate", (e) => {
    // taking current time and total duration
    let { currentTime, duration } = e.srcElement;

    // converting current time sec into human readable time 
    let current_time_minute = Math.floor(currentTime / 60)
    let current_time_second = Math.floor(currentTime % 60)
    if (current_time_second < 10) {
        current_time_second = `0${current_time_second}`
    }
    if (current_time_minute < 10) {
        current_time_minute = `0${current_time_minute}`
    }
    current.innerHTML = `${current_time_minute}:${current_time_second}`;

    // converting total time sec into human readable time
    let total_time_minute = Math.floor(duration / 60)
    let total_time_seconds = Math.floor(duration % 60)
    if (total_time_minute < 10) {
        total_time_minute = `0${total_time_minute}`
    }
    if (total_time_seconds < 10) {
        total_time_seconds = `0${total_time_seconds}`
    }
    totalTime.innerHTML = `${total_time_minute}:${total_time_seconds}`;

    // increasing width of progress bar
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