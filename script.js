document.addEventListener('DOMContentLoaded', () => {
    const tiersContainer = document.querySelector('.tiers-container');

    fetch('players.json')
        .then(response => response.json())
        .then(data => {
            updateTiers(data);
        })
        .catch(error => console.error('Błąd ładowania danych:', error));

    function updateTiers(players) {
        tiersContainer.querySelectorAll('.tier ul').forEach(ul => ul.innerHTML = ''); // Wyczyść istniejące listy

        players.forEach(player => {
            const tierId = `tier-${player.tier}`;
            const tierElement = document.getElementById(tierId);
            if (tierElement) {
                const li = document.createElement('li');
                li.textContent = player.name;

                if (player.highlight === 'high') {
                    li.classList.add('high');
                } else if (player.highlight === 'low') {
                    li.classList.add('low');
                }

                tierElement.querySelector('ul').appendChild(li);
            }
        });
    }

    // Możesz dodać tutaj kod do obsługi zmiany trybu gry (jeśli będzie więcej niż Vanilla)
});
