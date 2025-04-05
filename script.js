// Ścieżka do Twojego pliku JSON na GitHub
// Zastąp 'username/repo' swoimi danymi
const JSON_URL = 'https://raw.githubusercontent.com/username/repo/main/players.json';

// Funkcja do ładowania danych z cache'owaniem
async function loadData() {
    try {
        const response = await fetch(`${JSON_URL}?t=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to load data');
        return await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        return {
            "Tier 1": [
                {"name": "Player1", "tier": "high"},
                {"name": "Player2", "tier": "low"}
            ],
            "Tier 2": [
                {"name": "Player3", "tier": "high"},
                {"name": "Player4", "tier": "low"}
            ],
            "Tier 3": [
                {"name": "Player5", "tier": "high"},
                {"name": "Player6", "tier": "low"}
            ],
            "Tier 4": [
                {"name": "Player7", "tier": "high"},
                {"name": "Player8", "tier": "low"}
            ],
            "Tier 5": [
                {"name": "Player9", "tier": "high"},
                {"name": "Player10", "tier": "low"}
            ]
        };
    }
}

// Funkcja renderująca leaderboard
async function renderLeaderboard() {
    const data = await loadData();
    const container = document.getElementById('tiersContainer');
    container.innerHTML = '';
    
    // Sortowanie tierów od 1 do 5
    const tierOrder = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5'];
    const sortedTiers = Object.keys(data).sort((a, b) => {
        return tierOrder.indexOf(a) - tierOrder.indexOf(b);
    });
    
    sortedTiers.forEach(tierName => {
        const tierDiv = document.createElement('div');
        tierDiv.className = 'tier';
        
        const header = document.createElement('div');
        header.className = 'tier-header';
        header.textContent = tierName;
        
        const playersList = document.createElement('div');
        playersList.className = 'players-list';
        
        data[tierName].forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player ${player.tier}-tier`;
            playerDiv.textContent = player.name;
            playersList.appendChild(playerDiv);
        });
        
        tierDiv.appendChild(header);
        tierDiv.appendChild(playersList);
        container.appendChild(tierDiv);
    });
}

// Odświeżanie co 30 sekund i przyciskiem
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    setInterval(renderLeaderboard, 30000);
    document.getElementById('refreshBtn').addEventListener('click', renderLeaderboard);
});
