const idol = document.getElementById('idol');
const game = document.getElementById('game');
const gameOver = document.getElementById('gameOver');
const scoreEl = document.getElementById('scoreEl');
const jumpSound = document.getElementById('jumpSound');
const hitSound = document.getElementById('hitSound');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');

let gameStarted = false;
let isJumping = false;
let isGameOver = false;
let score = 0;
let gameSpeed = 10; // 初始障礙物移動速度
let gameInterval;

startButton.addEventListener('click', () => {
    gameStarted = true;
    startScreen.style.display = 'none';
    createObstacle();
    gameInterval = setInterval(() => {
        gameSpeed += 0.1;
    }, 1000);
});

function jump() {
  if (!gameStarted || isJumping || isGameOver) return; 
    isJumping = true;
    jumpSound.play();
    let jumpHeight = 130;
    let jumpDuration = 500;
    let startTime = Date.now();

    function animateJump() {
        let elapsedTime = Date.now() - startTime;
        let progress = elapsedTime / jumpDuration;
        if (progress < 1) {
            let height = Math.sin(progress * Math.PI) * jumpHeight;
            idol.style.bottom = height + "px";
            requestAnimationFrame(animateJump);
        } else {
            idol.style.bottom = "0px";
            isJumping = false;
        }
    }
    requestAnimationFrame(animateJump);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (isGameOver) restartGame();
        else jump();
    }
});

gameOver.addEventListener("click", restartGame); // 點擊遊戲結束畫面重新開始

game.addEventListener("click", jump);

function createObstacle() {
  if (!gameStarted || isGameOver) return;

  // 確保畫面上最多只有 1 個障礙物
  const existingObstacles = document.querySelectorAll('.obstacle');
  if (existingObstacles.length > 0) {
      setTimeout(createObstacle, 1000); // 如果已有障礙物，延遲 1 秒後再嘗試生成
      return;
  }

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  game.appendChild(obstacle);

  let position = 600;
  obstacle.style.left = position + "px";

  let moveInterval = setInterval(() => {
      if (isGameOver) {
          clearInterval(moveInterval);
          return;
      }

      position -= gameSpeed;
      obstacle.style.left = position + "px";

      let idolRect = idol.getBoundingClientRect();
      let obstacleRect = obstacle.getBoundingClientRect();

      if (
          idolRect.right > obstacleRect.left &&
          idolRect.left < obstacleRect.right &&
          idolRect.bottom > obstacleRect.top
      ) {
          clearInterval(moveInterval);
          gameOver.style.display = "block";
          isGameOver = true;
          hitSound.play();
          clearInterval(gameInterval);
          return;
      }

      if (position < -40) {
          clearInterval(moveInterval);
          obstacle.remove();
          if (!isGameOver) {
              score += 10;
              scoreEl.textContent = score;
          }
      }
  }, 20);

  let nextObstacleTime = Math.random() * 100 + 1000;
  if (!isGameOver) setTimeout(createObstacle, nextObstacleTime);
}


function restartGame() {
document.querySelectorAll(".obstacle").forEach((o) => o.remove());
isGameOver = false;
gameStarted = true;
score = 0;
scoreEl.textContent = "0";
gameOver.style.display = "none";
startScreen.style.display = "none";
gameSpeed = 8;
createObstacle();
gameInterval = setInterval(() => {
    gameSpeed += 0.1;
}, 1000);
}