fetch('players.json')
    .then(response => response.json())
    .then(data => {
        if (data.players && Array.isArray(data.players)) {
            data.players.forEach(player => {
                const tierList = document.querySelector(`#tier${player.tier} ul`);
                if (tierList) {
                    const listItem = document.createElement('li');
                    listItem.textContent = player.name; // Nazwa gracza
                    listItem.classList.add(player.type); // Typ gracza (high/low)
                    tierList.appendChild(listItem); // Dodanie elementu do odpowiedniego tieru
                }
            });
        } else {
            console.error('Niepoprawny format players.json');
        }
    })
    .catch(error => console.error('Błąd podczas ładowania graczy:', error));
