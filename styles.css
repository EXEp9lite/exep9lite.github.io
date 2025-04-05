fetch('players.json')
    .then(response => response.json())
    .then(data => {
        loadPlayers(data.lowTier, document.querySelector('.low-tier .tiers'), false);
        loadPlayers(data.highTier, document.querySelector('.high-tier .tiers'), true);
    });

function loadPlayers(players, container, isHighTier) {
    const tiers = {};

    players.forEach(player => {
        if (!tiers[player.tier]) {
            tiers[player.tier] = [];
        }
        tiers[player.tier].push(player.name);
    });

    for (const tier in tiers) {
        const section = document.createElement('section');
        section.classList.add('tier-section', `tier-${tier}`, isHighTier ? 'high' : 'low');

        const header = document.createElement('h2');
        header.textContent = `Tier ${tier}`;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.classList.add('players-grid');

        tiers[tier].forEach(name => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');
            playerDiv.textContent = name;
            grid.appendChild(playerDiv);
        });

        section.appendChild(grid);
        container.appendChild(section);
    }
}
