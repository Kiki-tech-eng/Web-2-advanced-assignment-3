'use strict';

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const dueDateInput = document.getElementById("dueDate");
const themeToggle = document.getElementById("themeToggle");
const body = document.getElementById("body");

let tasks = [];
let currentFilter = "all";

// toggle light/dark mode
themeToggle.addEventListener("click", () => {
  body.classList.toggle("bg-white");
  body.classList.toggle("bg-gray-900");
  body.classList.toggle("text-gray-800");
  body.classList.toggle("text-white");
});

// add a new task
function addTask() {
  const task = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (task === "") return;

  const newTask = {
    id: Date.now(),
    name: task,
    completed: false,
    due: dueDate,
  };

  tasks.push(newTask);
  taskInput.value = "";
  dueDateInput.value = "";
  renderTasks();
}

// render tasks based on filter
function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter((task) => {
    if (currentFilter === "all") return true;
    return currentFilter === "completed" ? task.completed : !task.completed;
  });

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between p-3 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 transition";

    const left = document.createElement("div");
    left.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-checkbox";
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const taskText = document.createElement("span");
    taskText.textContent = task.name;
    if (task.completed) {
      taskText.classList.add("line-through", "text-gray-400");
    }

    const due = document.createElement("span");
    if (task.due) {
      due.textContent = `(${task.due})`;
      due.className = "text-xs text-gray-500 ml-2";
    }

    left.appendChild(checkbox);
    left.appendChild(taskText);
    if (task.due) left.appendChild(due);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "text-red-500 text-sm";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(left);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// toggle task complete
function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// set filter and re-render
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}
