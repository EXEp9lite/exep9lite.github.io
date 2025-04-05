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

                // Oddziel graczy high i low
                const highTierPlayers = playersInTier.filter(player => player.highlight === 'high');
                const lowTierPlayers = playersInTier.filter(player => player.highlight === 'low');
                const normalTierPlayers = playersInTier.filter(player => player.highlight !== 'high' && player.highlight !== 'low');

                // Sortuj alfabetycznie graczy w każdej kategorii
                highTierPlayers.sort((a, b) => a.name.localeCompare(b.name));
                lowTierPlayers.sort((a, b) => a.name.localeCompare(b.name));
                normalTierPlayers.sort((a, b) => a.name.localeCompare(b.name));

                // Dodaj graczy do siatki w odpowiedniej kolejności
                highTierPlayers.forEach(player => {
                    const playerDiv = createPlayerElement(player);
                    playersGrid.appendChild(playerDiv);
                });

                normalTierPlayers.forEach(player => {
                    const playerDiv = createPlayerElement(player);
                    playersGrid.appendChild(playerDiv);
                });

                lowTierPlayers.forEach(player => {
                    const playerDiv = createPlayerElement(player);
                    playersGrid.appendChild(playerDiv);
                });
            }
        });
    }
