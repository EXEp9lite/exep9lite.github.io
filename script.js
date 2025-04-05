fetch('players.json')
    .then(response => response.json())
    .then(data => {
        Object.keys(data).forEach(tier => {
            const tierSection = document.getElementById(tier);
            const playersGrid = tierSection.querySelector('.players-grid');

            data[tier].forEach(player => {
                const playerElement = document.createElement('div');
                playerElement.classList.add('player');
                playerElement.textContent = player;
                playersGrid.appendChild(playerElement);
            });
        });
    })
    .catch(error => {
        console.error('Błąd podczas ładowania danych:', error);
    });
