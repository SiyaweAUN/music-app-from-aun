const songsContainer = document.getElementById("songsContainer");
const songsDisplay = document.getElementById("songsDisplay");
const songImage = document.getElementById("songImage");
const songInfor = document.getElementById("songInfor");
const musicButtons= document.getElementById("musicButtons");
const BtnPrevious = document.getElementById("previous");
const BtnNext = document.getElementById("next");
const pausePlay = document.getElementById("pausePlay");
const playlist = document.getElementById("Playlist");
const audio = document.getElementById("audio");
let playparam = false;
let pauseparam = false;
let currentSongIndex = 0;
const allSongs = [ {
    id:0,
    title:"That's how i feel",
    artist:"Swizzymestar350",
    duration:"02:20",
    src:"Swizzymestar350 - That_s how l feel ( official music video)(MP3_160K).mp3",
    "background image":'hot1.jpg'
},
{
    id:1,
    title:"Wakatumwa Nani",
    artist:"Bob Hucci",
    duration:"04:05",
    src:"BoB HucCi x McHudson x Yung Ronto x Dj Ally -WAKATUMWA NANI..__(Lyric Visualizer)(MP3_160K).mp3",
    "background image":'hot2.jpg'
},
{
    id:2,
    title:"Gehena reply",
    artist:"Lael",
    duration:"03:10",
    src:"lael gehena reply.mp3",
    "background image":'hot3.jpg'
},
{
    id:3,
    title:"Tinyaradze",
    artist:"Nicky Mutendi",
    duration:"02:08",
    src:"nicky mutendi tinyaradze.mp3",
    "background image":'hot4.jpg'
},
{
    id:4,
    title:"Juzi Reply",
    artist:"Tine",
    duration:"03:03",
    src:"Tine juzi reply.mp3",
    "background image":'hot5.jpg'
},
{
    id:5,
    title:"Uyatshisa",
    artist:"Bob Hucci",
    duration:"03:29",
    src:"BoB HucCi - Uyatshisa (feat.) Busiso _ R.Peels(MP3_160K).mp3",
    "background image":'hot6.jpg'
},
{
    id:6,
    title:"Iwee",
    artist:"Bob Hucci",
    duration:"04:18",
    src:"BoB HucCi - Iwee ft PrinceBoyaH x ScripMuLa (Official Music Video)(MP3_160K).mp3",
    "background image":'hot7.jpg'
},
{
    id:7,
    title:"Fighter",
    artist:"Bob Hucci",
    duration:"03:22",
    src:"BoB HucCi - Fighter x Munashe(MP3_160K).mp3",
    "background image":'hot8.jpg'
},
{
    id:8,
    title:"Mambo Chiedza",
    artist:"Nicky Mutendi",
    duration:"04:40",
    src:"nicky mutendi-mambo chiedza.mp3",
    "background image":'hot9.jpg'
},
{
    id:9,
    title:"Too scared",
    artist:"Lael",
    duration:"03:45",
    src:"lael too scared cover ft mchudson.mp3",
    "background image":'hot10.jpg'
}];

const updateDisplay = ()=>{
   
    const whitewash =  allSongs.map((song)=>{
        return `
        <button class="innerButton"><p>Title : ${song.title}</p>
        <p>Artist : ${song.artist}</p>
        <p>Duration : ${song.duration}</p></button>`
    }).join("");
    songInfor.innerHTML = whitewash ;
}
const imageUpdate = (index = 0) => {
    const song = allSongs[index]; 
    songImage.style.backgroundImage = `url('${song["background image"]}')`;
};
songInfor.addEventListener("click", (e) => {
    if (e.target.closest(".innerButton")) {
        const index = Array.from(songInfor.children).indexOf(e.target.closest(".innerButton"));
        imageUpdate(index);
        updateText(index);
        playTrack(index);
        songImage.style.display = "flex";
        musicButtons.style.display = "flex";
        songInfor.style.display = "none";
        songsContainer.style.display= "flex"
    }
});

const playlistShow = ()=>{
    songImage.style.display = "none";
    musicButtons.style.display = "none";
    songInfor.style.display = "flex";
    songsContainer.style.display = "none";
}

updateText = (newindex) => {
    const song = allSongs.find((song) => song.id === newindex);
    if (song) {
        songsContainer.innerText = `Title: ${song.title}
        Artist: ${song.artist}
        Duration: ${song.duration}`;
    }
};

const playTrack=(index = 0)=>{
const song = allSongs[index];
audio.src = song.src;
pausePlay.textContent = "❚❚"
playparam = true;
audio.play();
}
const pauseAndPlay = () =>{
if (!playparam){
    audio.play();
    pauseparam = false;
    playparam = true;
    pausePlay.textContent = "❚❚"
}else if(!pauseparam){
    audio.pause();
    playparam = false;
    pauseparam = true;
    pausePlay.textContent = "▶️"
}
}

const nextSong = () =>{
    if(currentSongIndex<allSongs.length-1){
        currentSongIndex++;
        playTrack(currentSongIndex);
        imageUpdate(currentSongIndex);
        updateText(currentSongIndex);
    }else{
        currentSongIndex =0;
        playTrack(currentSongIndex);
        imageUpdate(currentSongIndex);
        updateText(currentSongIndex);
    }
}
const previousSong=()=>{
    if(currentSongIndex>0){
        currentSongIndex--;
        playTrack(currentSongIndex);
        updateText(currentSongIndex);
        imageUpdate(currentSongIndex);
    }else{
        currentSongIndex = allSongs.length-1;
        playTrack(currentSongIndex);
        updateText(currentSongIndex);
        imageUpdate(currentSongIndex);
    }
}
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");


audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
    }
});


progressBar.addEventListener("input", () => {
    if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
});


audio.addEventListener("ended", () => {
    progressBar.value = 0;
});
BtnPrevious.addEventListener("click",()=>previousSong());
BtnNext.addEventListener("click",()=>nextSong());
pausePlay.addEventListener("click",()=>pauseAndPlay());
playlist.addEventListener("click", ()=> playlistShow());

updateDisplay();
imageUpdate();
