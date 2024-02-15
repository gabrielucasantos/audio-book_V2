const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    author = document.getElementById('music-author'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        title: "Verity",
        author: "Colleen Hoover",
        cover: "assets/verity.jpg",
        url: "assets/Resumo-verity.mp3",
    },
    {
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        cover: "assets/o-pequeno-príncipe.jpg",
        url: "assets/Resumo-o-pequeno-príncipe.mp3",
    },
    { 
        title: "É assim que acaba",
        author: "Colleen Hoover",
        cover: "assets/é-assim-que-acaba.jpg",
        url: "assets/Resumo-é-assim-que-acaba.mp3",
    },
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        cover: "assets/dom-casmurro.jpg",
        url: "assets/Resumo-dom-casmurro.mp3",
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.url;
    title.textContent = song.title;
    author.textContent = song.author;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);