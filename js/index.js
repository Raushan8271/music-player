let music = document.querySelector("audio")
let btn = document.getElementById("btn")
let totalTime = document.getElementById("duration")
let current = document.getElementById("current")
let progress = document.getElementById("progress")
let canvasProgress = document.getElementById("canvasProgress")
let progress_div = document.getElementById("progress_div")

let isMusicPlay = false
let song = ["./music/Veham.mp4", "./music/Joker 2019.mp3", "./music/Jee Karda.mp3"]
let songIndex = 0

// next song function
function nextSong() {
    if (music.src == "") {
        music.src = song[songIndex]
        songIndex++
    } else {
        music.src = song[songIndex]
        music.play()
        isMusicPlay = true
        isMusicPlay ? btn.innerHTML = `<span class="material-icons">pause</span>`
            : btn.innerHTML = `<span class="material-icons">play_arrow</span>`;
        songIndex++
    }
    if (songIndex == song.length) {
        songIndex = 0
    }
}

// play and pause function 
function play() {
    if (music.src == "") {
        music.src = song[songIndex]
        songIndex++
    }
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
    if (total_time_minute) {
        totalTime.innerHTML = `${total_time_minute}:${total_time_seconds}`;
    }

    // increasing width of progress bar
    let avgTime = (currentTime / duration) * 100
    progress.style.width = `${avgTime}%`
})

progress_div.addEventListener('click', (e) => {
    let { offsetX } = e
    let { clientWidth } = e.srcElement
    let avgTime = (offsetX / clientWidth) * 100

    // changing color or forawrd     
    progress.style.width = `${avgTime}%`

    // changing current time acording to user forward
    music.currentTime = (music.duration / 100) * avgTime
})
