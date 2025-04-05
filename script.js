document.addEventListener('DOMContentLoaded', () => {
    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            const leaderboardDiv = document.getElementById('leaderboard');

            for (const tier in data) {
                if (data.hasOwnProperty(tier)) {
                    const tierNumber = parseInt(tier.slice(4));
                    const tierName = `Tier ${tierNumber}`;
                    const playersData = data[tier];

                    const tierSection = document.createElement('section');
                    tierSection.classList.add('tier-section', tier);

                    const heading = document.createElement('h2');
                    heading.textContent = tierName;

                    const playersGrid = document.createElement('div');
                    playersGrid.classList.add('players-grid');

                    playersData.forEach(playerData => {
                        const playerDiv = document.createElement('div');
                        playerDiv.classList.add('player');
                        playerDiv.textContent = playerData.name;

                        if (playerData.tierType === 'high') {
                            playerDiv.classList.add('high-tier');
                        } else if (playerData.tierType === 'low') {
                            playerDiv.classList.add('low-tier');
                        }

                        playersGrid.appendChild(playerDiv);
                    });

                    tierSection.appendChild(heading);
                    tierSection.appendChild(playersGrid);
                    leaderboardDiv.appendChild(tierSection);

                    if (tier !== 'tier5') {
                        const hr = document.createElement('hr');
                        leaderboardDiv.appendChild(hr);
                    }
                }
            }
        })
        .catch(error => console.error('Błąd podczas ładowania danych:', error));
});
