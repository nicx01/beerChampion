const urlParams = new URLSearchParams(window.location.search);
const playersParam = (urlParams.get("players"));
const startingPlayers = JSON.parse(playersParam);
const difficulty = (urlParams.get("difficulty"));

const tragos={
    'easy': 1,
    'medium': 2,
    'hard': 3,
    'superhard':5,
}

function selectRandomPlayer(players) {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

function displayCurrentPlayer(player, challenge) {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = `<p>Turno de ${player}</p><p>${challenge}</p><p><button id="regenerateChallengeBtn">Dame otra</button></p><p><button id="nextPlayerBtn">Siguiente jugador</button></p>`;
    document.getElementById("nextPlayerBtn").addEventListener("click", nextPlayer);
    document.getElementById("regenerateChallengeBtn").addEventListener("click", () => {
      const newChallenge = generateDrinkChallenge(player);
      displayCurrentPlayer(player, newChallenge);
    });
  }
  


function nextPlayer() {
  players.splice(currentPlayerIndex, 1);

  if (players.length > 0) {
    currentPlayerIndex = Math.floor(Math.random() * players.length);
    currentPlayer = players[currentPlayerIndex];
    const challenge = generateDrinkChallenge(currentPlayer);
    displayCurrentPlayer(currentPlayer, challenge);
  } else {
    document.querySelector(".game-container").innerHTML = `<p>Game Over</p><p><button onclick="location.reload();">Jugar otra vez</button></p><p><button id="goToIndexBtn"><i class="fas fa-home"></i>Volver al menú</button></p>`;
    document.getElementById("goToIndexBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

function generateDrinkChallenge(player) {
    const challenges = [
      `toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `establece una regla. Quien la rompa, toma ${Math.floor(Math.random() * 5) + tragos[difficulty]} tragos`,
      `elige a alguien para que tome ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `adivina el número del otro jugador. Si fallas, toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos. Si aciertas, el otro jugador toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `todos beben menos tú`,
      `juega a cara o cruz por ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `elige una palabra prohibida. Si alguien la dice, toma ${Math.floor(Math.random() * 5) + tragos[difficulty]} tragos`,
      `elige un color. Todos los que estén usando ropa de ese color toman ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `elige una categoría (por ejemplo, marcas de coches). El primer jugador que no pueda nombrar algo de esa categoría toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`

    ];
  
    const challenge = getRandomElement(challenges);
    return `${player}, ${challenge}`;
  }

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let players = startingPlayers;
let currentPlayerIndex = Math.floor(Math.random() * players.length);
let currentPlayer = players[currentPlayerIndex];
const challenge = generateDrinkChallenge(currentPlayer);
displayCurrentPlayer(currentPlayer, challenge);
