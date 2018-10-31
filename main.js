let secondsRemaining = 60
let minutes
let timer
let firstMinute = true
let firstStart = true

const startButton = document.getElementById("start")
const pauseButton = document.getElementById("pause")

pauseButton.disabled = true

function start() {
  if (firstStart) {
    let timerValue = document.getElementById("setTimer").value;
    if (!parseInt(timerValue) || timerValue == "" || isNaN(timerValue) == true || parseInt(timerValue) <= 0) {
      minutes = 25
    } else {
      minutes = parseInt(timerValue)
    }
  }
  if (firstMinute) {
    firstMinute = false
    minutes -= 1
  }
  startButton.disabled = true
  timer = setInterval(tick, 1000)
  pauseButton.disabled = false
}

function tick() {
  let audio = new Audio("./files/bell2.mp3")
  let body = document.querySelector("body")

  secondsRemaining -= 1
  updateClock()
  if (secondsRemaining == 0 && minutes == 0) {
    pause()
    startButton.textContent = "Start"
    startButton.disabled = true
    pauseButton.disabled = false
    audio.play()
    body.className = "flashing"
  } else if (secondsRemaining == 0 && minutes > 0) {
    secondsRemaining = 60
    minutes -= 1
    firstStart = false
  }
}

function pause() {
  firstStart = false

  pauseButton.disabled = true
  clearInterval(timer)
  startButton.textContent = "Resume"
  startButton.disabled = false
}

function updateClock() {
  let title = document.querySelector('title')
  let minutesDiv = document.getElementById('minutes')
  let secondsDiv = document.getElementById('seconds')

  if (minutes === 0) {
    minutes = '00'
  }

  if (secondsRemaining < 10) {
    if (minutes < 10 && minutes !== (0 || '00')) {
      minutesDiv.textContent = "0" + minutes
      secondsDiv.textContent = "0" + secondsRemaining
      title.textContent = "0" + minutes + ":0" + secondsRemaining
    } else {
      minutesDiv.textContent = minutes
      secondsDiv.textContent = "0" + secondsRemaining
      title.textContent = minutes + ":0" + secondsRemaining
    }
  } else if (secondsRemaining == 60) {
    if (minutes < 10 && minutes !== (0 || '00')) {
      minutesDiv.textContent = "0" + minutes
      secondsDiv.textContent = "00"
      title.textContent = "0" + minutes + ":00"
    } else {
      minutesDiv.textContent = minutes
      secondsDiv.textContent = "00"
      title.textContent = minutes + ":00"
    }
  } else {
    if (minutes < 10 && minutes !== (0 || '00')) {
      minutesDiv.textContent = "0" + minutes
      secondsDiv.textContent = secondsRemaining
      title.textContent = "0" + minutes + ":" + secondsRemaining
    } else {
      minutesDiv.textContent = minutes
      secondsDiv.textContent = secondsRemaining
      title.textContent = minutes + ":" + secondsRemaining
    }
  }

}

function reset() {
  let body = document.querySelector("body")
  let timerValue = document.getElementById("setTimer").value;
  if (!parseInt(timerValue) || timerValue == "" || isNaN(timerValue) == true || parseInt(timerValue) <= 0) {
    minutes = 25
  } else {
    minutes = parseInt(timerValue)
  }

  firstStart = true
  firstMinute = true
  secondsRemaining = 60

  pause()
  updateClock()
  startButton.disabled = false
  startButton.textContent = "Start"
  pauseButton.disabled = true
  body.classList.remove("flashing")
}