let songs = [];

fetch('data/lagu.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
        displaySongs(songs);
    });

const searchInput = document.getElementById('search');
const container = document.getElementById('songContainer');

function displaySongs(list) {
    container.innerHTML = '';
    list.forEach(song => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${song.cover}" alt="${song.judul}">
            <h2>${song.judul}</h2>
            <h3>${song.penyanyi}</h3>
            <a href="lagu.html?id=${song.id}">Baca Lirik</a>
            <button class="share-btn" onclick="shareSong(${song.id})">Share</button>
        `;
        container.appendChild(card);
    });
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = songs.filter(song => 
        song.judul.toLowerCase().includes(query) || 
        song.penyanyi.toLowerCase().includes(query)
    );
    displaySongs(filtered);
});

function shareSong(id) {
    const url = `${window.location.origin}/lagu.html?id=${id}`;
    if (navigator.share) {
        navigator.share({ title: 'Lirik Lagu', url: url });
    } else {
        prompt("Salin link ini:", url);
    }
}
