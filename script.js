document.addEventListener('DOMContentLoaded', () => {
    const tierSections = document.querySelectorAll('.tier-section');

    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            updateLeaderboard(data);
        })
        .catch(error => console.error('Błąd ładowania danych:', error));

    function updateLeaderboard(players) {
        tierSections.forEach(section => {
            const tierNumber = parseInt(section.classList[1].split('-')[1]);
            const playersInTier = players.filter(player => player.tier === tierNumber);
            const playersGrid = section.querySelector('.players-grid');

            if (playersGrid) {
                playersGrid.innerHTML = ''; // Wyczyść poprzednich graczy

                playersInTier.forEach(player => {
                    const playerDiv = document.createElement('div');
                    playerDiv.classList.add('player');
                    playerDiv.textContent = player.name;

                    if (player.highlight === 'high') {
                        playerDiv.classList.add('high');
                    } else if (player.highlight === 'low') {
                        playerDiv.classList.add('low');
                    }

                    playersGrid.appendChild(playerDiv);
                });
            }
        });
    }
});
