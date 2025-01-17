let buttonGroup = document.querySelector("#buttonGroup");
let playerScoreValue = document.querySelector("#playerScore > span");
let computerScoreValue = document.querySelector("#computerScore > span");
let results = document.querySelector("#results");

let playerScore = 0;
let computerScore = 0;

buttonGroup.addEventListener("click", (e) => {
  const target = e.target;
  const play = playRound(target.id, getComputerChoice());

  if (play == "player") {
    playerScore++;
    playerScoreValue.textContent = playerScore;
  } else if (play == "computer") {
    computerScore++;
    computerScoreValue.textContent = computerScore;
  }

  checkResults(playerScore, computerScore);
});

function checkResults(playerScore, computerScore) {
  let p = document.createElement("p");

  if (playerScore >= 5) {
    p.textContent = "Player Wins!";
    results.appendChild(p);
    clearResults();
  } else if (computerScore >= 5) {
    p.textContent = "Computer Wins!";
    results.appendChild(p);
    clearResults();
  }
}

function clearResults() {
  let buttonGroupChild = document.querySelectorAll("#buttonGroup > button");
  buttonGroupChild.forEach((button) => (button.disabled = true));

  let btnClear = document.createElement("button");
  btnClear.textContent = "Play Again";
  btnClear.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreValue.textContent = "0";
    computerScoreValue.textContent = "0";

    btnClear.parentNode.removeChild(btnClear);
    results.removeChild(results.lastChild);
    buttonGroupChild.forEach((button) => (button.disabled = false));
  });
  results.appendChild(btnClear);
}

// Randomly generate the enemy's selection
function getComputerChoice(max = 3) {
  switch (Math.floor(Math.random() * max)) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

// Compare the response, and tally the score of who won
function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    console.log("It's a tie!");
  } else if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    console.log(
      `You win! You chose ${playerSelection}, while your enemy chooses ${computerSelection}`
    );
    return "player";
  } else {
    console.log(
      `You lose! You chose ${playerSelection}, while your enemy chooses ${computerSelection}`
    );
    return "computer";
  }
}
