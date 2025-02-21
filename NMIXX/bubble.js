// 設定泡泡數量
const bubbleCount = 20;
const ocean = document.querySelector('.ocean');

// 動態生成泡泡
for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // 隨機設定 x 軸位置
  const randomX = Math.random() * 90 + 5;
  bubble.style.left = `${randomX}%`;

  // 隨機設定動畫持續時間
  const randomDuration = 6 + Math.random() * 4;
  bubble.style.animationDuration = `${randomDuration}s`;

  // 隨機設定大小
  const randomSize = 20 + Math.random() * 30;
  bubble.style.width = `${randomSize}px`;
  bubble.style.height = `${randomSize}px`;

  ocean.appendChild(bubble);
}
