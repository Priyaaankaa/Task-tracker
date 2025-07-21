const inputBox = document.querySelector('.wishlist-input');
const addBtn = document.querySelector('.add-btn');
const showTodos = document.querySelector('.todo-list-container');
let inputValue;
let todoList =[];


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

addBtn.addEventListener("click",(e)=>{
    e.preventDefault(); // preventing the default behavior of loading everytime
    inputValue = inputBox.value;
    if(inputValue.length > 0){
        todoList.push({id:uuid(), inputValue, isCompleted: false})
    }
    renderTodoList(todoList);
    inputBox.value = "";
})

showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;
  
    if (delTodoKey) {
      const taskToRemove = e.target.closest(".todo-item");
      gsap.to(taskToRemove, {
        opacity: 0,
        scale: 0.7,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          todoList = todoList.filter(todo => todo.id !== delTodoKey);
          renderTodoList(todoList);
        }
      });
    } else {
      // Toggle complete
      todoList = todoList.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo);
      renderTodoList(todoList);
    }
  });
  


  function renderTodoList(todoList) {
    showTodos.innerHTML = "";
  
    todoList.forEach(({ id, inputValue, isCompleted }) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("todo-item");
      taskDiv.innerHTML = `
        <input type="checkbox" id="item-${id}" data-key="${id}" ${isCompleted ? "checked" : ""}>
        <label data-key="${id}" id="${id}" class="todo-task ${isCompleted ? "checked" : ""}">
          ${inputValue}
        </label>
        <button data-todokey="${id}" id="item-${id}" class="delete-btn">🗑️</button>
      `;
  
      showTodos.appendChild(taskDiv);
  
      // Animate new task: fade + pop
      gsap.from(taskDiv, {
        opacity: 0,
        scale: 0.9,
        y: -10,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    });
  
    // Animate progress bar width
    const total = todoList.length;
    const completed = todoList.filter(todo => todo.isCompleted).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  
    gsap.to(".progress-fill", {
      width: `${percent}%`,
      duration: 0.4,
      ease: "power1.out"
    });
  
    const progressMsg = document.querySelector('.progress-message');
    if (total === 0) {
      progressMsg.textContent = "🧐 Add some tasks to get started!";
    } else if (percent === 100) {
      progressMsg.textContent = "🎉 All tasks completed!";
    } else if (percent > 0) {
      progressMsg.textContent = `✅ ${completed} of ${total} tasks completed`;
    } else {
      progressMsg.textContent = "⏱️ Start completing your tasks!";
    }
  }
  
  
renderTodoList(todoList);

