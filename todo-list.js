// todo-list.js

// TodoItem类表示一个待办事项
class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // 创建todo-item的模板
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        .text {
          flex-grow: 1;
          margin-right: 10px;
        }
        .delete {
          cursor: pointer;
        }
        .completed {
          text-decoration: line-through;
          opacity: 0.5;
        }
      </style>
      <div class="text"></div>
      <button class="delete">Delete</button>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // 获取DOM元素
    this.textElement = this.shadowRoot.querySelector('.text');
    this.deleteButton = this.shadowRoot.querySelector('.delete');

    // 绑定事件处理程序
    this.deleteButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete', { detail: this.id }));
    });
  }

  // 设置待办事项的文本和完成状态
  setItem(text, completed) {
    this.textElement.textContent = text;
    if (completed) {
      this.textElement.classList.add('completed');
    } else {
      this.textElement.classList.remove('completed');
    }
  }
}

// TodoList类表示待办事项列表
class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // 创建todo-list的模板
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      </style>
      <input id="new-item-input" type="text" placeholder="Add new item">
      <button id="add-item-button">Add</button>
      <div id="items-container"></div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // 获取DOM元素
    this.inputElement = this.shadowRoot.getElementById('new-item-input');
    this.addButton = this.shadowRoot.getElementById('add-item-button');
    this.itemsContainer = this.shadowRoot.getElementById('items-container');

    // 初始化待办事项列表
    this.todoItems = [];

    // 绑定事件处理程序
    this.addButton.addEventListener('click', () => this.addItem());
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addItem();
      }
    });

    // 自定义事件处理程序，处理待办事项的删除
    this.addEventListener('delete', (e) => this.deleteItem(e.detail));
  }

  // 添加新的待办事项
  addItem() {
    const text = this.inputElement.value.trim();
    if (text !== '') {
      const newItem = document.createElement('todo-item');
      newItem.id = Date.now(); // 为每个待办事项分配一个唯一的ID
      newItem.setItem(text, false);
      this.itemsContainer.appendChild(newItem);
      this.todoItems.push(newItem);
      this.inputElement.value = ''; // 清空输入框
    }
  }

  // 删除待办事项
  deleteItem(id) {
    const index = this.todoItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.itemsContainer.removeChild(this.todoItems[index]);
      this.todoItems.splice(index, 1);
    }
  }
}

customElements.define('todo-item', TodoItem);
customElements.define('todo-list', TodoList);
