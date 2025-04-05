// Sample data structure - replace with your actual data loading logic
const playersData = {
    "tier1": [],
    "tier2": [],
    "tier3": [],
    "tier4": [],
    "tier5": []
};

function renderPlayers() {
    for (const tier in playersData) {
        const container = document.getElementById(tier);
        container.innerHTML = '';
        
        playersData[tier].forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player';
            playerElement.textContent = player.name;
            container.appendChild(playerElement);
        });
        
        // Add empty slots
        const emptySlots = 5 - playersData[tier].length;
        for (let i = 0; i < emptySlots; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'player';
            emptySlot.style.visibility = 'hidden';
            container.appendChild(emptySlot);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPlayers();
    
    // Example of how to add a player (remove in production):
    // playersData.tier1.push({name: "ExamplePlayer"});
    // renderPlayers();
});
