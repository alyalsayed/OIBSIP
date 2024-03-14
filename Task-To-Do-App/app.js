const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const saveBtn = document.getElementById("saveBtn");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");

// Load tasks from localStorage when the DOM content is loaded
loadTasks();

saveBtn.addEventListener("click", function () {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title === "" || description === "") {
    alert("Please enter both title and description.");
    return;
  }

  let task = {
    title,
    description,
    date: getCurrentDate(),
    time: getCurrentTime(),
  };
  addTask(task);
  saveTaskToLocalStorage(task);
  titleInput.value = "";
  descriptionInput.value = "";
});

// Function to add a task to the list
function addTask(task) {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td class="actions">
                <button class="complete-btn" data-title="${task.title}">
                    <i class="fas fa-check"></i>
                </button>
                <button class="edit-btn" data-title="${task.title}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" data-title="${task.title}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
  todoList.appendChild(row);

  // Add event listeners for complete, edit, and delete buttons
  const completeBtn = row.querySelector(".complete-btn");
  const editBtn = row.querySelector(".edit-btn");
  const deleteBtn = row.querySelector(".delete-btn");

  completeBtn.addEventListener("click", completeTask);
  editBtn.addEventListener("click", editTask);
  deleteBtn.addEventListener("click", deleteTask);
}

// Function to complete a task
function completeTask(e) {
  const title = e.target.dataset.title;
  const row = e.target.closest("tr");
  let task = getTaskFromLocalStorage(title);

  if (task) {
    // Remove task from localStorage
    removeTaskFromLocalStorage(title);

    // Remove the task from the todo list
    row.remove();

    // Add the task to the completed list
    task.date = getCurrentDate();
    task.time = getCurrentTime();
    addTaskToCompletedList(task);
    saveCompletedTaskToLocalStorage(task);
  } else {
    console.log("Task not found.");
  }
}

// Function to add a task to the completed list
function addTaskToCompletedList(task) {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td>
                <button class="delete-btn" data-title="${task.title}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
  completedList.appendChild(row);

  // Add event listener for delete button
  const deleteBtn = row.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteTask);
}

// Function to edit a task
function editTask(e) {
  const title = e.target.dataset.title;
  const task = getTaskFromLocalStorage(title);

  // Populate input fields with task details
  titleInput.value = task.title;
  descriptionInput.value = task.description;

  // Remove task from localStorage
  removeTaskFromLocalStorage(title);
  e.target.parentElement.parentElement.remove();
}

// Function to delete a task
function deleteTask(e) {
  const button = e.target.closest("button");
  if (button) {
    const title = button.dataset.title;
    const tableId = button.closest("table").id;

    if (tableId === "todoTable") {
      removeTaskFromLocalStorage(title);
      button.parentElement.parentElement.remove();
    } else if (tableId === "completedTable") {
      removeCompletedTaskFromLocalStorage(title);
      button.parentElement.parentElement.remove();
    }
  }
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to save a completed task to localStorage
function saveCompletedTaskToLocalStorage(task) {
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  completedTasks.push(task);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task));

  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  completedTasks.forEach((task) => addTaskToCompletedList(task));
}

// Function to get a task from localStorage
function getTaskFromLocalStorage(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.find((task) => task.title === title);
}
// Function to remove a completed task from localStorage
function removeCompletedTaskFromLocalStorage(title) {
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  completedTasks = completedTasks.filter((task) => task.title !== title);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
// Function to get the current date
function getCurrentDate() {
  const today = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  return today.toLocaleDateString("en-US", options);
}

// Function to get the current time
function getCurrentTime() {
  const today = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return today.toLocaleTimeString("en-US", options);
}
