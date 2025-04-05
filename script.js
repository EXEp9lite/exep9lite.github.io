document.addEventListener('DOMContentLoaded', function() {
    fetch('players.json')
        .then(response => response.json())
        .then(playersData => {
            for (const tierNumber in playersData) {
                const tierSection = document.querySelector(`.tier-${tierNumber.slice(-1)}`);
                const playersGrid = tierSection.querySelector(".players-grid");
                const players = playersData[tierNumber];

                players.forEach(player => {
                    const playerDiv = document.createElement("div");
                    playerDiv.classList.add("player");
                    playerDiv.textContent = player.name;
                    playersGrid.appendChild(playerDiv);
                });
            }
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych z players.json:', error);
        });
});
