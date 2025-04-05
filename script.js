fetch('players.json')
    .then(response => response.json())
    .then(data => {
        data.players.forEach(player => {
            const tierList = document.querySelector(`#tier${player.tier} ul`);
            const listItem = document.createElement('li');
            listItem.textContent = player.name;
            listItem.classList.add(player.type);
            tierList.appendChild(listItem);
        });
    });
