// Playlist array - add your songs here
const playlist = [
    {
        title: "Night Changes",
        artist: "One Direction",
        src: "night changes.mp3",
        cover: "R.jfif"
    },
    {
        title: "Kamin",
        artist: "Emin ft. Johny",
        src: "kamin.mp3",
        cover: "e3c83020111f97c63a0faa0ff48ec92a.1000x1000x1.png"
    },
    {
        title: "Attention",
        artist: "Charlie Puth",
        src: "Attention - 320Kbps-(Mr-Jat.in).mp3",
        cover: "OIP.webp"
    },
    {
        title: "We Don't Talk Anymore",
        artist: "Charlie Puth & Selena Gomez",
        src: "Charlie Puth.mp3",
        cover: "images.jfif"
    },
    {
        title: "Say Yes To Heaven Slowed Reverb",
        artist: "Lana Del Ray",
        src: "i got my.mp3",
        cover: "OIP (1).webp"
    },
    {
        title: "Golden Brown",
        artist: "The Stranglers",
        src: "golden brown.mp3",
        cover: "size_m.jpg"
    },
    {
        title: "Love Story",
        artist: "Indila",
        src: "indila.mp3",
        cover: "emmi.jpg"
    },
    {
        title: "Criminal",
        artist: "Britney Spears",
        src: "criminal.mp3",
        cover: "aa.jpg"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        src: "faded.mp3",
        cover: "faded.jpg"
    }
];

let currentSongIndex = 0;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const progress = document.getElementById("progress");
    const song = document.getElementById("song");
    const ctrlIcon = document.getElementById("ctrlIcon");
    const songImg = document.getElementById("songImg");
    const currentTimeEl = document.getElementById("currentTime");
    const durationEl = document.getElementById("duration");
    const volumeSlider = document.getElementById("volume");
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");

    // Set initial volume
    song.volume = 0.7;

    // Load song function
    function loadSong(index) {
        const currentSong = playlist[index];
        song.src = currentSong.src;
        songTitle.textContent = currentSong.title;
        songArtist.textContent = currentSong.artist;
        songImg.src = currentSong.cover;
        song.load();
    }

    // Load first song on page load
    loadSong(currentSongIndex);

    // Update progress bar max value and duration display
    song.addEventListener('loadedmetadata', function() {
        progress.max = song.duration;
        durationEl.textContent = formatTime(song.duration);
    });

    // Format time in MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }

    // Play or pause the song
    function playPause() {
        if (ctrlIcon.classList.contains("fa-pause")) {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            songImg.classList.remove("playing");
        } else {
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            songImg.classList.add("playing");
        }
    }

    // Update progress bar and time display
    song.addEventListener('timeupdate', function() {
        progress.value = song.currentTime;
        currentTimeEl.textContent = formatTime(song.currentTime);
    });

    // Seek to specific time when user drags progress bar
    progress.addEventListener('input', function() {
        song.currentTime = progress.value;
    });

    // Adjust volume
    volumeSlider.addEventListener('input', function() {
        song.volume = volumeSlider.value / 100;
    });

    // Next song
    function forward() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        songImg.classList.add("playing");
    }

    // Previous song
    function backward() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        songImg.classList.add("playing");
    }

    // Auto play next song when current song ends
    song.addEventListener('ended', function() {
        forward();
    });

    // Make functions globally accessible for HTML onclick attributes
    window.playPause = playPause;
    window.forward = forward;
    window.backward = backward;
});
