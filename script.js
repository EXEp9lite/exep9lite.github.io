const JSON_URL = 'players.json';

async function loadData() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error('Failed to load data');
        return await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        return {
            "Tier 1": [{"name": "Error loading data", "tier": "high"}],
            "Tier 2": [],
            "Tier 3": [],
            "Tier 4": [],
            "Tier 5": []
        };
    }
}

function createPlayerElement(player) {
    const playerElement = document.createElement('div');
    playerElement.className = `player ${player.tier}-tier`;
    playerElement.textContent = player.name;
    return playerElement;
}

async function renderLeaderboard() {
    const data = await loadData();
    const container = document.getElementById('tiersContainer');
    container.innerHTML = '';

    for (const [tierName, players] of Object.entries(data)) {
        const tierElement = document.createElement('div');
        tierElement.className = 'tier';
        
        const header = document.createElement('div');
        header.className = 'tier-header';
        header.textContent = tierName;
        
        const playersList = document
