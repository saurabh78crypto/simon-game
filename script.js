// Variables to store the game state
let gamePattern = [];
let userPattern = [];
let level = 0;
const colors = ["green", "red", "yellow", "blue"];
let started = false;

// Play sound
function playSound(soundType) {
  let audiopath;
  
  if(soundType === "button"){
    audiopath = "assets/button-click.mp3";
  } else if(soundType === "wrong"){
    audiopath = "assets/wrong.mp3";    
  }

  const audio = new Audio(audiopath);
  audio.play();
}

// Animate button press
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 200);
}

// Generate the next sequence
function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("game-title").innerText = `Level ${level}`;
  
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  // Flash each color in the sequence
  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      animatePress(color);
      playSound("button");
    }, 500 * index);
  });
}

// Check the player's answer
function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

// Game over functionality
function gameOver() {
  document.getElementById("game-title").innerText = "Game Over! Press Any Key to Restart.";
  playSound("wrong");
  document.body.classList.add("game-over");
  
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 200);

  resetGame();
}

// Reset the game state
function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Start the game on keypress
document.addEventListener("keypress", () => {
  if (!started) {
    document.getElementById("game-title").innerText = "Level 1";
    started = true;
    nextSequence();
  }
});

// Handle button clicks
colors.forEach((color) => {
  const button = document.getElementById(color);
  button.addEventListener("click", () => {
    if (!started) return;

    userPattern.push(color);
    playSound("button");
    animatePress(color);

    checkAnswer(userPattern.length - 1);
  });
});
