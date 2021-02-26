const searchSong = () => {
    let songName = document.getElementById("search-field").value
  
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => displaySong(data.data))
}

const displaySong = songs => {
    const songContainer = document.getElementById("song-container")
    songContainer.innerHTML = ''
    songs.forEach(song => {
        console.log(song)
        console.log(song.album.cover_medium)
        const songDiv = document.createElement("div")
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
                    <div class="col-lg-1 text-center>
                        <img src=${song.album.cover_medium} alt="">
                    </div>
                    <div class="col-lg-3 text-center">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-lg-6 text-center">   
                        <audio controls>
                            <source src=${song.preview} type="">
                        </audio>
                    </div>
                    <div class="col-lg-2 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Get Lyrics</button>
                    </div>
        `
        songContainer.appendChild(songDiv)
    });
}

const getLyric = (artist , title)=>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(lyrics =>lyric(lyrics.lyrics))
}
const lyric = (lyrics) =>{
    if(lyrics === ''){
        let lyricDiv = document.getElementById("lyricDiv")
        lyricDiv.innerText = "Sorry we don't this lyrics"
    }
    else{
        let lyricDiv = document.getElementById("lyricDiv")
        lyricDiv.innerText = lyrics
    }
    
}


