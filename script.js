document.addEventListener('DOMContentLoaded', function() {
    const tierContainer = document.getElementById('tier-container');
    const searchInput = document.querySelector('.search-input');

    let tiersData = []; // Store fetched tier data

    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            tiersData = data;
            renderTiers(data);
        })
        .catch(error => console.error('Błąd ładowania danych:', error));

    function renderTiers(tiers) {
        tierContainer.innerHTML = ''; // Clear existing tiers

        tiers.forEach((tierData, index) => {
            const tierColumn = document.createElement('div');
            tierColumn.className = 'tier-column';
            tierColumn.dataset.tier = tierData.tier.toLowerCase().replace(/\s/g, '-');
            tierColumn.style.animationDelay = `${index * 0.1}s`;

            const tierHeader = document.createElement('div');
            tierHeader.className = 'tier-header';
            tierHeader.style.backgroundColor = getTierColor(tierData.tier);
            tierHeader.innerHTML = `
                <div class="trophy">🏆 ${tierData.tier}</div>
                <div class="toggle-icon"><i class="fas fa-chevron-down"></i></div>
            `;
            tierColumn.appendChild(tierHeader);

            const playersContainer = document.createElement('div');
            playersContainer.className = 'tier-players';

            tierData.players.forEach(player => {
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
                playersContainer.appendChild(tierPlayer);
            });

            tierColumn.appendChild(playersContainer);
            tierContainer.appendChild(tierColumn);

            // Add collapsible functionality
            tierHeader.addEventListener('click', () => {
                tierColumn.classList.toggle('collapsed');
            });
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
        let visiblePlayers = 0;

        const tierColumns = document.querySelectorAll('.tier-column');

        tierColumns.forEach(column => {
            let columnHasVisiblePlayers = false;
            const players = column.querySelectorAll('.tier-player');

            players.forEach(player => {
                const playerName = player.dataset.name;
                if (playerName.includes(searchTerm)) {
                    player.style.display = 'flex';
                    columnHasVisiblePlayers = true;
                    visiblePlayers++;
                } else {
                    player.style.display = 'none';
                }
            });

            if (columnHasVisiblePlayers) {
                column.classList.remove('empty');
            } else {
                column.classList.add('empty');
            }
        });

        if (searchTerm === '') {
            tierColumns.forEach(column => {
                column.classList.remove('empty');
                const players = column.querySelectorAll('.tier-player');
                players.forEach(player => {
                    player.style.display = 'flex';
                });
            });
        }
    });
});
