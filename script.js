const btnPlay = document.querySelector('#play')
const audio = document.querySelector('#hymn')
const progress = document.querySelector('#progress')
const progContain = document.querySelector('.progress-container')
const lyricsElement = document.querySelector("#lyrics");
const curTime = document.querySelector("#currentTime");
const volumeProgress = document.querySelector('#volume-progress');
const volumeProgressContainer = document.querySelector('.volume-progress-container');


const lyrics = [
  { text: "Sintang Paaralan", startTime: 11 },
  { text: "Tanglaw ka ng bayan", startTime: 14.5},
  { text: "Pandayan ng isip ng kabataan", startTime:18},
  { text: "Kami ay dumating nang salat sa yaman", startTime:24},
  { text: "Hanap na dunong ay iyong alay", startTime:29},
  { text: "Ang layunin mong makatao", startTime: 35},
  { text: "Dinarangal ang Pilipino", startTime: 41},
  { text: "Ang iyong aral, diwa, adhikang taglay", startTime: 47},
  { text: "PUP, aming gabay", startTime: 53},
  { text: "Paaralang dakila", startTime: 56},
  { text: "PUP, pinagpala", startTime: 62},
  { text: "Gagamitin ang karunungan", startTime: 68},
  { text: "Mula sa iyo, para sa bayan", startTime: 74},
  { text: "Ang iyong aral, diwa, adhikang taglay", startTime: 80},
  { text: "PUP, aming gabay", startTime: 86},
  { text: "Paaralang dakila", startTime: 89},
  { text: "PUP, pinagpala", startTime: 95},
];

//for the lyrics
lyrics.forEach(line => {
  const lyricElement = document.createElement('div');
  lyricElement.classList.add('lyric');
  lyricElement.textContent = line.text;
  lyricsElement.appendChild(lyricElement);
});

// setting volume
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;

  audio.volume = volume;
  updateVolumeProgress(volume);
}

// update volume progress bar
function updateVolumeProgress(volume) {
  volumeProgress.style.width = `${volume * 100}%`;
}

//when music is playing
const play = () =>{
  progContain.classList.add('play')
  btnPlay.querySelector('i.fas').classList.remove('fa-play')
  btnPlay.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

//when paused
const pause = () => {
  progContain.classList.remove("play");
  btnPlay.querySelector("i.fas").classList.add("fa-play");
  btnPlay.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause()
};

//for time in progress bar of the music
const convertTime = (sec) =>{
  const min = Math.floor(sec/60)
  const remainingSec = Math.floor(sec % 60)
  return `${min}:${remainingSec < 10 ? "0" : ""}${remainingSec}`;
}

//changes the progress bar to appropriate time in song
const updateProg = (e) =>{
  const {duration, currentTime} = e.srcElement    
  const progPercent = (currentTime / duration) * 100
  progress.style.width = `${progPercent}%`

  curTime.textContent = convertTime(currentTime)

  updateLyrics(currentTime)
}

//for when clicking the progressbar at a specific part
function setProgess(e){
    const width = this.clientWidth;
    const clickX = e.offsetX
    console.log(clickX);
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//for highlighting
function updateLyrics(currentTime) {
  let activeLyric;

  lyricsElement.childNodes.forEach((lyricElement, index) => {
    const line = lyrics[index];
    
    if (currentTime >= line.startTime) {
      lyricElement.classList.add("active");
      activeLyric = lyricElement;
    } else {
      lyricElement.classList.remove("active");
    }
  });

  if (activeLyric) {
    activeLyric.scrollIntoView({ behavior: "auto", block: "center", inline:"center" });
  }
}

//Event Listeners

//play and pause
btnPlay.addEventListener('click', () =>{
    const playing = progContain.classList.contains('play')

    if (playing) {
      console.log("playing");
      pause();
    } else {
      play();
      console.log("paused");
    }
})

audio.addEventListener('timeupdate', updateProg)

progContain.addEventListener('click', setProgess)

volumeProgressContainer.addEventListener("click", setVolume);

// Initialize volume
updateVolumeProgress(0.5);
