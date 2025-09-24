const paper = document.getElementById("js-paper");
const scissors = document.getElementById("js-scissors");
const rock = document.getElementById("js-rock");

// Buttons
const playAgainBtn = document.getElementById("js-play-again-btn");
const resetScoreBtn = document.getElementById("js-reset-score-btn");

// Messages
const messageOne = document.getElementById("js-message-one");
const message = document.getElementById("js-message");

// Player Moves
const playerOneMove = document.getElementById("js-player-one-move");
const playerTwoMove = document.getElementById("js-player-two-move");

// Game Sections
const loadedGame = document.getElementById("js-game-section");
const playedGame = document.getElementById("js-active-game-section");

// To record wins, losses & ties
const winCount = document.getElementById("js-wins");
const lossCount = document.getElementById("js-losses");
const tieCount = document.getElementById("js-ties");

// Dynamic Images
const playerOneImage = document.createElement("img");
const playerTwoImage = document.createElement("img");

// Storage Key
const STORAGE_KEY = "scores";

// Game Logic & Functions

let gameProgress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

winCount.innerHTML = gameProgress.wins;
lossCount.innerHTML = gameProgress.losses;
tieCount.innerHTML = gameProgress.ties;

let potentialComputerMove = ["rock", "paper", "scissors"];
let counter = "";
let result = "";
let displayMessage = "";

function pickComputerMove() {
  let randomMove = Math.floor(Math.random() * 3);
  let computerMove = potentialComputerMove[randomMove];
  return computerMove;
}

const computerMove = pickComputerMove();

function playGame(playerMove) {
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      counter = "tie";
      result = "";
      displayMessage = "You both tie.";
    } else if (computerMove === "paper") {
      counter = "lose";
      result = "Paper covers Rock";
      displayMessage = "You lose.";
    } else if (computerMove === "scissors") {
      counter = "win";
      result = "Rock smashes Scissors";
      displayMessage = "You win!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      counter = "win";
      result = "Paper covers Rock";
      displayMessage = "You win!";
    } else if (computerMove === "paper") {
      counter = "tie";
      result = "";
      displayMessage = "You both tie.";
    } else if (computerMove === "scissors") {
      counter = "lose";
      result = "Scissors cuts Paper";
      displayMessage = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      counter = "lose";
      result = "Rock smashes Scissors";
      displayMessage = "You lose.";
    } else if (computerMove === "paper") {
      counter = "win";
      result = "Scissors cuts Paper";
      displayMessage = "You win!";
    } else if (computerMove === "scissors") {
      counter = "tie";
      result = "";
      displayMessage = "You both tie.";
    }
  }
  updateGameProgress();
}

function updateGameProgress() {
  if (counter === "win") {
    gameProgress.wins += 1;
    winCount.innerHTML = gameProgress.wins; //Try to see what happens if this line is omitted
  } else if (counter === "lose") {
    gameProgress.losses += 1;
    lossCount.innerHTML = gameProgress.losses;
  } else if (counter === "tie") {
    gameProgress.ties += 1;
    tieCount.innerHTML = gameProgress.ties;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameProgress));
}

// Event Listeners

rock.addEventListener("click", function () {
  playGame("rock");
  loadedGame.classList.remove("show");
  playedGame.classList.add("show");

  //   Create player images
  playerOneImage.src = "./assets/rock.png";
  playerOneImage.alt = "rock";
  playerOneMove.appendChild(playerOneImage);

  playerTwoImage.src = `./assets/${computerMove}.png`;
  playerTwoImage.alt = `${computerMove}`;
  playerTwoMove.appendChild(playerTwoImage);

  //   Displayed Messages
  messageOne.innerHTML = result;
  message.innerHTML = displayMessage;
});

paper.addEventListener("click", function () {
  playGame("paper");
  loadedGame.classList.remove("show");
  playedGame.classList.add("show");

  //   Create player images
  playerOneImage.src = "./assets/paper.png";
  playerOneImage.alt = "paper";
  playerOneMove.appendChild(playerOneImage);

  playerTwoImage.src = `./assets/${computerMove}.png`;
  playerTwoImage.alt = `${computerMove}`;
  playerTwoMove.appendChild(playerTwoImage);

  //   Displayed Messages
  messageOne.innerHTML = result;
  message.innerHTML = displayMessage;
});

scissors.addEventListener("click", function () {
  playGame("scissors");
  loadedGame.classList.remove("show");
  playedGame.classList.add("show");

  //   Create player images
  playerOneImage.src = "./assets/scissors.png";
  playerOneImage.alt = "scissors";
  playerOneMove.appendChild(playerOneImage);

  playerTwoImage.src = `./assets/${computerMove}.png`;
  playerTwoImage.alt = `${computerMove}`;
  playerTwoMove.appendChild(playerTwoImage);

  //   Displayed Messages
  messageOne.innerHTML = result;
  message.innerHTML = displayMessage;
});

// Button Event Listeners
playAgainBtn.addEventListener("click", function () {
  loadedGame.classList.add("show");
  playedGame.classList.remove("show");
  playerOneMove.removeChild(playerOneImage);
  playerTwoMove.removeChild(playerTwoImage);
});

resetScoreBtn.addEventListener("click", function () {
  gameProgress.wins = 0;
  gameProgress.losses = 0;
  gameProgress.ties = 0;
  winCount.innerHTML = gameProgress.wins;
  lossCount.innerHTML = gameProgress.losses;
  tieCount.innerHTML = gameProgress.ties;
  localStorage.removeItem(STORAGE_KEY);
});
