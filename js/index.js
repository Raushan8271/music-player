let music = document.querySelector("audio")
let btn = document.getElementById("btn")
let totalTime = document.getElementById("duration")
let current = document.getElementById("current")
let canvasProgress = document.getElementById("canvasProgress")

const ctx = canvasProgress.getContext('2d');

// changing width of convas according to canvas width
window.addEventListener('resize', windowSize);
function windowSize() {
    canvasProgress.width = window.innerWidth - 18
    canvasProgress.height = 250
}
windowSize()

// creating graph in canvas
var line = []
ctx.fillStyle = "lightgrey";
for (let i = 0; i < window.innerWidth - 18; i += 10) {
    let no = Math.ceil(Math.random() * 150)
    if (no < 50) {
        no = no + 50
    }
    line.push(no)
    ctx.fillRect(i, 5, 5, no);
}

// creating tag in graph
let musicArray = ["Music", "Audio", "Polite", "Repo", "song"]
let musicArrayIndex = 0
for (let i = Math.floor((window.innerWidth) / 6); i < window.innerWidth - 18; i += Math.floor((window.innerWidth) / 6)) {
    let no = Math.ceil(Math.random() * 150)
    if (no < 50) {
        no = no + 50
    }
    ctx.arc(i + 2, 70, 7, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.fillStyle = "blue"
    ctx.fillRect(i, 70, 3, no);
    ctx.fillStyle = "red"
    ctx.fillRect(i - 20, 70 + no, 100, 25);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(musicArray[musicArrayIndex], i, 88 + no);
    musicArrayIndex++
}

// changing color of graph in to red
ctx.fillStyle = "red";
let no = 0;
let index = 0;
function changeGraphColor() {
    ctx.fillRect(index, 5, 5, line[no])
    no += 1
    index += 10
}
let time;

// increasing graph color according to audio play
function check() {
    time = setInterval(() => {
        changeGraphColor()
    }, (music.duration / line.length) * 1000);
}

// changing position of audio according to click on canvas position
canvasProgress.addEventListener('click', (e) => {
    let { offsetX } = e
    let { clientWidth } = e.srcElement
    let avgTime = (offsetX / clientWidth) * 100

    let stick = Math.ceil((line.length / 100) * avgTime)

    if (music.currentTime) {
        no = 0;
        index = 0
        for (let i = 0; i < line.length; i++) {
            ctx.fillStyle = "lightgrey";
            ctx.fillRect(index, 5, 5, line[no])
            no += 1
            index += 10
        }
        no = 0;
        index = 0
        ctx.fillStyle = "red";
        for (let i = 0; i < stick; i++) {
            ctx.fillRect(index, 5, 5, line[no])
            no += 1
            index += 10
        }
    }
    if (music.currentTime) {
        music.currentTime = (music.duration / 100) * avgTime
    }
})


// play and pause function 
let isMusicPlay = false
function play() {
    isMusicPlay = !isMusicPlay
    if (music.src == "") {
        music.src = song[songIndex]
        songIndex++
    }
    isMusicPlay ? music.play() : music.pause();
    isMusicPlay ? check() : clearInterval(time);
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
})
