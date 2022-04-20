console.log("Welcome to JavaScript");
// initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songname: "Katy Perry Harleys In Hawaii", fielpath: "songs/1.mp3", coverpath:"covers/1.png"},
    {songname: "DJ Snake Let Me Love You", fielpath: "songs/2.mp3", coverpath:"covers/2.jpg"},
    {songname: "Fifth Harmony Worth It", fielpath: "songs/3.mp3", coverpath:"covers/3.png"},
    {songname: "Luis Fonsi Despacito", fielpath: "songs/4.mp3", coverpath:"covers/4.png"},
    {songname: "Taylor Swift Love Story", fielpath: "songs/5.mp3", coverpath:"covers/5.png"},
    {songname: "Akon Smack That", fielpath: "songs/6.mp3", coverpath:"covers/6.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    element.getElementsByClassName("songname")[0].src= songs[i].coverpath;

    
});
// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

});
// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
}) 

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
    songIndex = 0;
    }
    else{
        songIndex +=1;
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
    songIndex = 0;
    }
    else{
        songIndex -=1;
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

})