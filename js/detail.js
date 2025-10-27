const urlParams = new URLSearchParams(window.location.search);
const songId = parseInt(urlParams.get('id'));
const container = document.getElementById('songDetail');

fetch('data/lagu.json')
    .then(response => response.json())
    .then(data => {
        const song = data.find(s => s.id === songId);
        if (song) {
            container.innerHTML = `
                <img src="${song.cover}" alt="${song.judul}" style="max-width:250px;border-radius:8px;">
                <h1>${song.judul}</h1>
                <h2>${song.penyanyi}</h2>
                <pre>${song.lirik}</pre>
                <button class="share-btn" onclick="shareSong(${song.id})">Share</button>
            `;
            document.title = `${song.judul} - ${song.penyanyi}`;
        } else {
            container.innerHTML = '<p>Lagu tidak ditemukan.</p>';
        }
    });

function shareSong(id) {
    const url = `${window.location.origin}/lagu.html?id=${id}`;
    if (navigator.share) {
        navigator.share({ title: 'Lirik Lagu', url: url });
    } else {
        prompt("Salin link ini:", url);
    }
}
