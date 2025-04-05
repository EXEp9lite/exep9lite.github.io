document.addEventListener('DOMContentLoaded', function() {
    const tierContainer = document.getElementById('tier-container');
    const searchInput = document.querySelector('.search-input');

    let playersData = []; // Store fetched players data

    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            playersData = data;
            renderTiers(data);
        })
        .catch(error => console.error('Błąd ładowania danych:', error));

    function renderTiers(players) {
        // Create tier columns if they don't exist
        for (let i = 1; i <= 5; i++) {
            const tierId = `tier-${i}`;
            const tierColumn = document.createElement('div');
            tierColumn.className = 'tier-column';
            tierColumn.dataset.tier = `tier-${i}`;
            tierColumn.style.animationDelay = `${(i - 1) * 0.1}s`;

            const tierHeader = document.createElement('div');
            tierHeader.className = 'tier-header';
            tierHeader.style.backgroundColor = getTierColor(`Tier ${i}`);
            tierHeader.innerHTML = `
                <div class="trophy">🏆 Tier ${i}</div>
                <div class="toggle-icon"><i class="fas fa-chevron-down"></i></div>
            `;
            tierColumn.appendChild(tierHeader);

            const playersContainer = document.createElement('div');
            playersContainer.className = 'tier-players';
            tierColumn.appendChild(playersContainer);
            tierContainer.appendChild(tierColumn);

            // Add collapsible functionality
            tierHeader.addEventListener('click', () => {
                tierColumn.classList.toggle('collapsed');
            });
        }

        // Populate tier columns with players
        players.forEach(player => {
            const tierColumn = document.querySelector(`.tier-column[data-tier="tier-${player.tier}"] .tier-players`);
            if (tierColumn) {
                const tierPlayer = document.createElement('div');
                tierPlayer.className = 'tier-player';
                tierPlayer.dataset.name = player.name.toLowerCase();

                const playerAvatar = document.createElement('div');
                playerAvatar.className = 'player-avatar';
                const avatarImg = document.createElement('img');
                avatarImg.src = 'default_avatar.png'; // Zastąp domyślnym lokalnym obrazkiem
                avatarImg.alt = player.name;
                playerAvatar.appendChild(avatarImg);
                tierPlayer.appendChild(playerAvatar);

                const playerName = document.createElement('div');
                playerName.className = 'player-name';
                playerName.textContent = player.name;
                tierPlayer.appendChild(playerName);

                const playerRank = document.createElement('div');
                playerRank.className = player.isHT ? 'player-rank double-arrow' : 'player-rank';

                if (player.isHT) {
                    playerRank.innerHTML = `<span class="rank-arrow"><i class="fas fa-caret-up"></i></span><span class="rank-arrow"><i class="fas fa-caret-up"></i></span>`;
                } else {
                    playerRank.innerHTML = `<span class="rank-arrow"><i class="fas fa-caret-up"></i></span>`;
                }

                tierPlayer.appendChild(playerRank);
                tierColumn.appendChild(tierPlayer);
            }
        });
    }

    function getTierColor(tierName) {
        switch (tierName.toLowerCase()) {
            case 'tier 1': return 'var(--tier1-color)';
            case 'tier 2': return 'var(--tier2-color)';
            case 'tier 3': return 'var(--tier3-color)';
            case 'tier 4': return 'var(--tier4-color)';
            case 'tier 5': return 'var(--tier5-color)';
            default: return 'var(--accent-color)';
        }
    }

    // Improved search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        document.querySelectorAll('.tier-column').forEach(column => {
            let hasVisiblePlayers = false;
            column.querySelectorAll('.tier-player').forEach(player => {
                if (player.dataset.name.includes(searchTerm)) {
                    player.style.display = 'flex';
                    hasVisiblePlayers = true;
                } else {
                    player.style.display = 'none';
                }
            });
            column.classList.toggle('empty', !hasVisiblePlayers);
        });
    });
});
