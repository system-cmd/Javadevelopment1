let secretNumber;
let attemptsLeft;
let score = 0;
let round = 1;
const maxRounds = 3;
const maxAttempts = 7;

function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = maxAttempts;
  document.getElementById('attempts').textContent = attemptsLeft;
  document.getElementById('userGuess').value = '';
  document.getElementById('message').textContent = '';
  document.getElementById('nextRound').style.display = 'none';
  document.getElementById('userGuess').disabled = false;
}

function submitGuess() {
  const guess = Number(document.getElementById('userGuess').value);
  if (!guess || guess < 1 || guess > 100) {
    document.getElementById('message').textContent = '⚠️ Enter a valid number between 1 and 100.';
    return;
  }

  attemptsLeft--;
  document.getElementById('attempts').textContent = attemptsLeft;

  if (guess === secretNumber) {
    const pointsEarned = (maxAttempts - attemptsLeft) * 10;
    score += pointsEarned;
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = `🎉 Correct! You earned ${pointsEarned} points.`;
    document.getElementById('userGuess').disabled = true;
    document.getElementById('nextRound').style.display = round < maxRounds ? 'block' : 'none';
  } else if (guess < secretNumber) {
    document.getElementById('message').textContent = '📉 Too low!';
  } else {
    document.getElementById('message').textContent = '📈 Too high!';
  }

  if (attemptsLeft === 0 && guess !== secretNumber) {
    document.getElementById('message').textContent = `❌ No attempts left. The number was ${secretNumber}.`;
    document.getElementById('userGuess').disabled = true;
    if (round < maxRounds) {
      document.getElementById('nextRound').style.display = 'block';
    }
  }
}

function startNextRound() {
  round++;
  if (round > maxRounds) {
    document.getElementById('message').textContent = `🏁 Game Over! Final Score: ${score}`;
    document.getElementById('nextRound').style.display = 'none';
    return;
  }
  document.getElementById('round').textContent = round;
  initGame();
}

window.onload = initGame;
