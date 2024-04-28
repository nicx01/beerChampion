const urlParams = new URLSearchParams(window.location.search);
const numPlayers = parseInt(urlParams.get("players"));
const difficulty = (urlParams.get("difficulty"));

const tragos={
    'easy': 1,
    'medium': 2,
    'hard': 3,
    'superhard':5,
}

function createPlayers(numPlayers) {
  const players = [];
  for (let i = 1; i <= numPlayers; i++) {
    players.push(`jugador ${i}`);
  }
  return players;
}

function selectRandomPlayer(players) {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

function displayCurrentPlayer(player, challenge) {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML = `<p>Turno del ${player}</p><p>${challenge}</p><p><button id="regenerateChallengeBtn">Dame otra</button></p><p><button id="nextPlayerBtn">Siguiente jugador</button></p>`;
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
    document.querySelector(".game-container").innerHTML = `<p>Game Over</p><button id="goToIndexBtn"><i class="fas fa-home"></i>Volver al menú</button>`;
    document.getElementById("goToIndexBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

function generateDrinkChallenge(player) {
    const challenges = [
      `toma ${Math.floor(Math.random() * 3) + 1} tragos`,
      `haz un baile divertido`,
      `responde a una pregunta de trivia. Si fallas, toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `establece una regla. Quien la rompa, toma ${Math.floor(Math.random() * 5) + tragos[difficulty]} tragos`,
      `canta una canción`,
      `elige a alguien para que tome ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `haz una imitación de otro jugador`,
      `cuenta un chiste. Si nadie se ríe, toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`,
      `adivina el número del otro jugador. Si fallas, toma ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos. Si aciertas, el otro jugador toma ${Math.floor(Math.random() * 3) + 1} tragos`,
      `todos beben menos tú`,
      `juega a cara o cruz por ${Math.floor(Math.random() * 3) + tragos[difficulty]} tragos`
    ];
  
    const challenge = getRandomElement(challenges);
    return `${player}, ${challenge}`;
  }

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let players = createPlayers(numPlayers);
let currentPlayerIndex = Math.floor(Math.random() * players.length);
let currentPlayer = players[currentPlayerIndex];
const challenge = generateDrinkChallenge(currentPlayer);
displayCurrentPlayer(currentPlayer, challenge);
