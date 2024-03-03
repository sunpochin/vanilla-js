// counter.js

let count = 0;
const counterElement = document.getElementById("counter");
const increaseButton = document.getElementById("increase-button");

export function increaseCounter() {
  count++;
  counterElement.textContent = count;
}

// 为增加按钮添加点击事件监听器
increaseButton.addEventListener("click", increaseCounter);
