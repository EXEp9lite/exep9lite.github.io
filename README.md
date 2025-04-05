<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla Leaderboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        .tiers-container {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            padding-bottom: 10px;
        }
        .tier {
            min-width: 200px;
            flex: 1;
        }
        h2 {
            color: #3498db;
            margin: 0 0 10px 0;
            font-size: 1.3em;
            background-color: #f8f9fa;
            padding: 8px 12px;
            border-radius: 4px;
            text-align: center;
            position: sticky;
            left: 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        li {
            padding: 8px 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
            margin-bottom: 5px;
            text-align: center;
        }
        li:last-child {
            margin-bottom: 0;
        }

        /* Responsywność - na mniejszych ekranach pozwól na przewijanie poziome */
        @media (max-width: 768px) {
            .tiers-container {
                flex-wrap: nowrap;
            }
            .tier {
                min-width: 180px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Vanilla</h1>
        
        <div class="tiers-container">
            <div class="tier">
                <h2>Tier 1</h2>
                <ul id="tier1">
                    <!-- Players will be added here -->
                </ul>
            </div>
            
            <div class="tier">
                <h2>Tier 2</h2>
                <ul id="tier2">
                    <!-- Players will be added here -->
                </ul>
            </div>
            
            <div class="tier">
                <h2>Tier 3</h2>
                <ul id="tier3">
                    <!-- Players will be added here -->
                </ul>
            </div>
            
            <div class="tier">
                <h2>Tier 4</h2>
                <ul id="tier4">
                    <!-- Players will be added here -->
                </ul>
            </div>
            
            <div class="tier">
                <h2>Tier 5</h2>
                <ul id="tier5">
                    <!-- Players will be added here -->
                </ul>
            </div>
        </div>
    </div>

    <script>
        // Przykładowe dane - możesz je usunąć lub zmienić
        const players = {
            tier1: ["Player1", "Player2", "Player3", "Player4"],
            tier2: ["PlayerA", "PlayerB", "PlayerC", "PlayerD", "PlayerE", "PlayerF"],
            tier3: ["PlayerX", "PlayerY", "PlayerZ", "PlayerW", "PlayerV"],
            tier4: ["PlayerAlpha", "PlayerBeta", "PlayerGamma", "PlayerDelta"],
            tier5: ["PlayerOne", "PlayerTwo", "PlayerThree"]
        };

        // Funkcja dodająca graczy do listy
        function addPlayers() {
            for (const tier in players) {
                const list = document.getElementById(tier);
                players[tier].forEach(player => {
                    const li = document.createElement("li");
                    li.textContent = player;
                    list.appendChild(li);
                });
            }
        }

        // Wywołanie funkcji po załadowaniu strony
        window.onload = addPlayers;
    </script>
</body>
</html>
