// Ładowanie danych z players.json
fetch('players.json')
    .then(response => response.json())
    .then(data => {
        data.players.forEach(player => {
            const tierList = document.querySelector(`#tier${player.tier} ul`);
            const listItem = document.createElement('li');
            listItem.textContent = player.name; // Nazwa gracza
            listItem.classList.add(player.type); // Typ gracza (high/low)
            tierList.appendChild(listItem); // Dodanie elementu do odpowiedniego tieru
        });
    })
    .catch(error => console.error('Error loading players:', error));
