// custom-counter.js

// 创建自定义计数器组件
export class CustomCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    
    // 创建组件内部的元素
    this.counterElement = document.createElement('div');
    this.counterElement.classList.add('counter');
    this.counterElement.textContent = this.count;
    
    // 绑定点击事件
    this.counterElement.addEventListener('click', () => {
      this.increaseCounter();
    });
    
    // 将计数器元素添加到自定义组件中
    this.appendChild(this.counterElement);
  }
  
  // 增加计数器值的方法
  increaseCounter() {
    this.count++;
    this.counterElement.textContent = this.count;
  }
}

// 将自定义计数器组件注册为自定义元素
customElements.define('custom-counter', CustomCounter);
