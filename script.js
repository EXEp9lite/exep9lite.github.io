fetch('players.json')
  .then(response => response.json())
  .then(data => {
    const tiersDiv = document.getElementById('tiers');

    for (const tier in data) {
      const tierElement = document.createElement('div');
      tierElement.innerHTML = `<h2>${tier}</h2><ul></ul>`;

      const ul = tierElement.querySelector('ul');

      data[tier].forEach(player => {
        const li = document.createElement('li');
        li.textContent = player;
        ul.appendChild(li);
      });

      tiersDiv.appendChild(tierElement);
    }
  })
  .catch(error => console.error('Błąd:', error));
