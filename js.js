let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {

        img : 'images/dino_merlin_promo.jpg',
        name: 'Kad si rekla da me voliš',
        artist: 'Dino Merlin',
        music: 'music/Dino Merlin - Kad si rekla da me voliš (Official Audio) [2000].mp3'
    },
    {
    
        img : 'images/Guitar.jpg',
        name: 'Money for Nothing',
        artist: 'Dire straits',
        music: 'music/Dire Straits - Money For Nothing (instrumental).mp4'
    },
    {
    
        img : 'images/galija.jpg',
        name: 'Dodirni me',
        artist: 'Galija',
        music: 'music/Galija - Dodirni me.mp3'
    },
    {
    
        img : 'images/Oliver.jpg',
        name: 'Cesarica',
        artist: 'Oliver Dragojević',
        music: 'music/Oliver Dragojević - Cesarica.mp3'
    },
    {
    
        img : 'images/Cover.jpg',
        name: 'Tu noć kad si se udavala',
        artist: 'Prljavo kazalište',
        music: 'music/PRLJAVO KAZALIŠTE - TU NOĆ KAD SI SE UDAVALA (OFFICIAL VIDEO).mp3'
    },
    {
    
        img : 'images/Cover.jpg',
        name: 'Kada padne noć',
        artist: 'Riblja čorba',
        music: 'music/Riblja Čorba Kada padne noć Tekst HD.mp3'
    },
    {
    
        img : 'images/Cover.jpg',
        name: 'Život je nekad siv nekad žut',
        artist: 'Bajaga i Instruktori',
        music: 'music/Y2Mate.is - Bajaga i Instruktori - Zivot je nekad siv nekad zut - (Audio 1988)-BwHenRthXT8-160k-1655942005833.mp3'
    },
    {
    
        img : 'images/galija.jpg',
        name: 'Da li si spavala',
        artist: 'Galija',
        music: 'music/Y2Mate.is - Galija - Da li si spavala (Acoustic, 6.1.1995)-v5P4LsUyXV4-128k-1655132764610.mp3'
    },
    {
    
        img : 'images/galija.jpg',
        name: 'Dodirni me',
        artist: 'Galija',
        music: 'music/Y2Mate.is - Galija - Dodirni me-s8Spc9Oh5vY-128k-1657410602718.mp3'
    },
    {
    
        img : 'images/katushya.jpg',
        name: 'Katushya',
        artist: 'Red Army Choir',
        music: 'music/Y2Mate.is - Red Army Choir Katusha-MLg83QMmlGs-160k-1655133104382.mp3'
    },
    {
    
        img : 'images/Cover.jpg',
        name: 'Ti si sav moj bol',
        artist: 'Ekaterina',
        music: 'music/Y2Mate.is - Ti si sav moj bol-LdD8FtrsTfc-160k-1655132848570.mp3'
    },
    {
    
        img : 'images/dino_merlin_promo.jpg',
        name: 'Tugo nesrećo',
        artist: 'Dino Merlin',
        music: 'music/Y2Mate.is - Tugo Nesrećo-qD8MR5U5bvQ-160k-1655873880371.mp3'
    },
    {
    
        img : 'images/Cover.jpg',
        name: 'Kad sam bio mlad',
        artist: 'Riblja čorba',
        music: 'music/Riblja Corba - Kad Sam Bio Mlad.mp3'
    },{
    img : 'images/Cover.jpg',
    name: 'Back to black',
    artist: 'Amy Winehouse',
    music: 'music/Amy Winehouse - Back To Black.mp3'
},{
img : 'images/SMAK.jpg',
    name: 'Ulazak u harem',
    artist: 'SMAK',
    music: 'music/tomp3.cc - Smak Ulazak u Harem Uživo Bašta SKC_320kbps.mp3'
}
,{
    img : 'images/SMAK.jpg',
        name: 'DAIRE',
        artist: 'SMAK',
        music: 'music/tomp3.cc - Smak Daire_320kbps.mp3'
    }
,{
    img : 'images/SMAK.jpg',
        name: 'Mix za dobro raspoloženje',
        artist: 'EX YU',
        music: 'music/EX-YU mix za dobro raspoloženje Muzički tramvaj_1.mp3'
    }
    ,{
    img : 'images/SMAK.jpg',
        name: 'Mix za dobro raspoloženje #2',
        artist: 'EX YU',
        music: 'music/EX-YU mix za dobro raspoloženje Muzički tramvaj_2.mp3'
    }
  ,{
    img : 'images/SMAK.jpg',
        name: 'Stairway to Heaven',
        artist: 'Led-Z',
        music: 'music/Led Zeppelin - Stairway To Heaven (Official Audio).mp3'
    }
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
