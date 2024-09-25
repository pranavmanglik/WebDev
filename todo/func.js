const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = "flex justify-between mb-2 p-2 bg-gray-600 rounded-lg";
    listItem.draggable = true;
    listItem.setAttribute("data-index", index);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "bg-red-500 text-white px-2 rounded-lg";
    deleteButton.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    listItem.addEventListener("dragstart", dragStart);
    listItem.addEventListener("dragover", dragOver);
    listItem.addEventListener("drop", drop);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let draggedItem = null;

function dragStart(event) {
  draggedItem = this;
  event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (this !== draggedItem) {
    const draggedIndex = Number(draggedItem.getAttribute("data-index"));
    const targetIndex = Number(this.getAttribute("data-index"));

    [tasks[draggedIndex], tasks[targetIndex]] = [
      tasks[targetIndex],
      tasks[draggedIndex],
    ];
    saveTasks();
    renderTasks();
  }
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const newTask = {
    text: taskInput.value,
  };
  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  renderTasks();
};

renderTasks();
