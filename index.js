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

showTodos.addEventListener("click",(e) =>{
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ?{...todo, isCompleted: !todo.isCompleted} : todo);
    todoList = todoList.filter(todo => todo.id !== delTodoKey);
    console.log(todoList);
    renderTodoList(todoList);

})


function renderTodoList(todoList){
    showTodos.innerHTML = todoList.map(({id,inputValue,isCompleted}) =>
    `<div><input type= "checkbox" id = "item-${id}" data-key = "${id}" ${isCompleted? "checked":""}>
    <label data-key= "${id}" id= "${id}" class="todo-task ${isCompleted? "checked":""}" > ${inputValue} </label>
    <button data-todokey = "${id}" id = "item-${id}">❌</button></div>`)

    // Progress calculation
    const total = todoList.length;
    const completed = todoList.filter(todo => todo.isCompleted).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Update progress bar width
    document.querySelector('.progress-fill').style.width = `${percent}%`;

    // Update progress message
    const progressMsg = document.querySelector('.progress-message');
    if (total === 0) {
        progressMsg.textContent = "🧐Add some tasks to get started!";
    } else if (percent === 100) {
        progressMsg.textContent = "🎉 All tasks completed!";
    } else if (percent > 0) {
        progressMsg.textContent = `✅ ${completed} of ${total} tasks completed`;
    } else {
        progressMsg.textContent = "⏱️Start completing your tasks!";
    }
}
renderTodoList(todoList);