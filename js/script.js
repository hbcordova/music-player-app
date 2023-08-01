const audio = document.getElementById('audio');
const playAudio = document.getElementById('play');
const playIcon = document.querySelector('.bx-play');
const pauseIcon = document.querySelector('.bx-pause');
const albun = document.querySelector('.player__albun-img');
const inputRange = document.querySelector('.player__range');

const timeStart = document.querySelector('.time__start');
let rotateAngle = 0;
let isPlaying = false;

playAudio.addEventListener('click', () => {
    
    if (audio.paused || audio.ended) {
        audio.play();
    } else {
        audio.pause();
    }
});

const formatTime = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = Math.floor(timeSeconds % 60);
    const secondsFormated = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${secondsFormated}`;
}

audio.addEventListener('timeupdate', () => {
    const timeCurrentSeconds = audio.currentTime;

    inputRange.value = timeCurrentSeconds;
    timeStart.textContent = formatTime(timeCurrentSeconds);

    const percentageProgress = (audio.currentTime / audio.duration) * 100;
    inputRange.style.background = `linear-gradient(to right, black 0%, black ${percentageProgress}%, gray ${percentageProgress}%, gray 100%)`;
});

inputRange.addEventListener('input', () => {
    const timeSeletected = parseFloat(inputRange.value);
    audio.currentTime = timeSeletected;
});

audio.addEventListener('play', () => {
    if (!isPlaying) {
        albun.classList.add('roting');
        playIcon.classList.add('hide');
        pauseIcon.classList.remove('hide');
        inputRange.setAttribute('max', audio.duration);
        isPlaying = true;
    }
});

audio.addEventListener('pause', () => {
    if (isPlaying) {
        const currentStyle = getComputedStyle(albun);
        const currentTransform = currentStyle.getPropertyValue('transform');
        const matriz = currentTransform.split(/[()]/)[1].split(',');

        const angleX = matriz[0];
        const angleY = matriz[1];
        rotateAngle = Math.round(Math.atan2(angleY, angleX) * (180 / Math.PI));

        albun.style.transition = '';
        albun.style.transform = `rotate(${rotateAngle}deg)`;
        albun.classList.remove('roting');

        playIcon.classList.remove('hide');
        pauseIcon.classList.add('hide');
        isPlaying = false;
    }
});
  
audio.addEventListener('ended', () => {
    albun.classList.remove('roting');
    isPlaying = false;
});
    
  
  
  
  
  