let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let result = document.querySelector(".tasks");

// Empty Array to store tasks
let arrayOfTasks = [];

// Check if we have data in local storge
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Get data from local stroge
getFromStrorge();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add task To Array Of Tasks
    input.value = ""; // Empty Input Filed
  }
};
// click on task elemnt
result.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Element from local storge
    deteteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element from Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(TaskText) {
  //Task Data
  const task = {
    id: Date.now(),
    title: TaskText,
    completed: false,
  };
  // Push Task to Array of tasks
  arrayOfTasks.push(task);
  addElementToPageFrom(arrayOfTasks);
  // Add Tasks to local strorge
  addToLstorge(arrayOfTasks);
}
function addElementToPageFrom(arrayOfTasks2) {
  // [1] Empty task Div
  result.innerHTML = "";
  // [2] Loop in Array of Tasks
  arrayOfTasks2.forEach((task2) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Done
    if (task2.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task2.id);
    div.appendChild(document.createTextNode(task2.title));
    // Create Button Delete
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Task Container
    result.appendChild(div);
  });
}
function addToLstorge(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getFromStrorge() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}
function deteteTaskWith(taskId) {
  // For Eample Only
  // arrayOfTasks.forEach((i)=>{
  //     console.log(`${i.id} === ${taskId}`);
  // })
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLstorge(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  arrayOfTasks.forEach((i) => {
    console.log(i);
    if (i.id == taskId) {
      i.completed == false ? (i.completed = true) : (i.completed = false);
    }
  });
  addToLstorge(arrayOfTasks);
}
