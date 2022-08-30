const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
// console.log(outline, outlineLength)

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

let soundLength = play.sounds;
let Duration

// console.log(soundLength, Duration)

sounds.forEach(sound => {
  sound.addEventListener("click", function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function () {
  console.log('workinggg')
  checkPlaying(song);
});

replay.addEventListener("click", function () {
  checkPlaying(song);

});


const checkPlaying = song => {
  console.log("duration", song.duration, song)
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }

};

song.ontimeupdate = function () {
  Duration = song.duration

  if (isNaN(Duration)) Duration = 0;


  let currentTime = song.currentTime;
  // elapsed should say time left
  let remainingTime = Duration - currentTime;
  let seconds = Math.floor(remainingTime % 60);
  let minutes = Math.floor(remainingTime/ 60);
  // console.log(Duration, currentTime, remainingTime);


  timeDisplay.textContent = `${minutes}:${seconds}`;
  // console.log(currentTime, elapsed, seconds, minutes)
  let progress = outlineLength - (currentTime / Duration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  // console.log(progress)

};