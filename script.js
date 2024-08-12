// TASK ARRAY //
var getArryFromStorage = localStorage.getItem("tasks");
var strToarry = JSON.parse(getArryFromStorage);
// blk affair localstorage
var tasks = strToarry || [];
// DATE OUTPUT //
var date = new Date().toDateString();
// Start Fill Tasks On The Page //
function readTasks() {
  var tasksDiv = document.getElementById("tasks");
  if (JSON.stringify(tasks) == "[]") {
    tasksDiv.innerHTML = `
    <div class="task">
              <div class="content">
                          <h1 class="notask-title" style="text-align: center;margin-top: 17px;color: #1f1e48d4;">No Tasks Here</h1>
  
              </div>
  
      </div>
    `;
  } else {
    tasksDiv.innerHTML = "";
  }
  let arryTostr = JSON.stringify(tasks);
  localStorage.setItem("tasks", arryTostr);
  var counter = 0;
  for (task of tasks) {
    taskHtml = `
    <div class="task" id="task${counter}">
            <div class="content">
                        <h1 class="task-title">${task.title}</h1>
                        <p class="task-date"><i class="bi bi-calendar2-week"></i> ${task.date}</p>
            </div>
                    <div class="buttons">
                            <button class="btn btn-success"  id="done${counter}" onclick="isDone(this,${counter})" type="button"><i class="bi bi-check-circle"></i></button>
                            <button class="btn btn-danger notdone"  id="notDone${counter}" onclick="notDone(this,${counter})" type="button"><i class="bi bi-x-lg"></i></button>
                            <button class="btn btn-primary"  id="edit" onclick="showEditModal(${counter})" type="button" data-bs-toggle="modal" data-bs-target="#editTaskModal"><i class="bi bi-pencil-fill"></i></button>
                            <button class="btn btn-danger"   id="delete" onclick="showDeleteModal(${counter})" type="button" data-bs-toggle="modal" data-bs-target="#deleteTaskModal"><i class="bi bi-trash3-fill"></i></button>
                    </div>
    </div>
    `;
    tasksDiv.innerHTML += taskHtml;
    var isDone = tasks[counter].isDone;
    if (isDone) {
      document.getElementById("task" + counter).classList.add("done");
      document.getElementById("done" + counter).style.display = "none";
      document.getElementById("notDone" + counter).classList.remove("notdone");
    }
    counter++;
  }
}
// Show Add Task Form Function //
function showAddTaskForm() {
  let addTaskInput = document.getElementById("addTaskInput");
  addTaskInput.value = "";
  let error = document.getElementById("error");
  error.style.display = "none";
  let addTaskBtn = document.getElementById("addTaskBtn");
  addTaskBtn.setAttribute("data-bs-dismiss", "");
}
$("#addTaskModal").on("shown.bs.modal", function () {
  $("#addTaskInput").focus();
});
$("#addTaskBtn").on("click", function () {
  $("#addTaskInput").focus();
});
// Add Task Function //
function addTask() {
  let addTaskInput = document.getElementById("addTaskInput");
  let error = document.getElementById("error");
  var tasksDiv = document.getElementById("tasks");
  let addTaskBtn = document.getElementById("addTaskBtn");
  let successToast = document.getElementById("successToast");
  let toastSuccess = bootstrap.Toast.getOrCreateInstance(successToast);
  if (addTaskInput.value.trim() == "") {
    error.style.display = "block";
  } else {
    let newObj = {
      title: addTaskInput.value,
      date: date,
      isDone: false,
    };
    tasksDiv.innerHTML = "";
    tasks.push(newObj);
    let arryTostr = JSON.stringify(tasks);
    localStorage.setItem("tasks", arryTostr);
    toastSuccess.show();
    readTasks();
  }
}
// Add Input Validation Function //
function hideErrorWhenType(input) {
  document.getElementById("error").style.display = "none";
  if (input.value.trim() == "") {
    document.getElementById("addTaskBtn").setAttribute("data-bs-dismiss", "");
  } else {
    document
      .getElementById("addTaskBtn")
      .setAttribute("data-bs-dismiss", "modal");
  }
}
// Edit Input Validation Function //
function hideErrorWhenTypeEdit(input, id) {
  document.getElementById("editError").style.display = "none";
  if (input.value.trim() == "") {
    document.getElementById("editTaskBtn").setAttribute("data-bs-dismiss", "");
  } else {
    document
      .getElementById("editTaskBtn")
      .setAttribute("data-bs-dismiss", "modal");
  }
}
// Show Delete Task Form Function //
function showDeleteModal(id) {
  document.getElementById("span").innerHTML = `"${tasks[id].title}"`;
  document
    .getElementById("deleteTaskBtn")
    .setAttribute("onclick", `deleteTask(${id})`);
}
// Delete Task Function //
function deleteTask(id) {
  let deleteToast = document.getElementById("deleteToast");
  let toastDelete = bootstrap.Toast.getOrCreateInstance(deleteToast);
  tasks.splice(id, 1);
  readTasks();
  toastDelete.show();
}
// Show Edit Task Form Function //
function showEditModal(id) {
  document.getElementById("editError").style.display = "none";
  document.getElementById("editSpan").innerHTML = `"${tasks[id].title}"`;
  document.getElementById("editTaskInput").value = tasks[id].title;
  document
    .getElementById("editTaskBtn")
    .setAttribute("onclick", `editTask(${id})`);
  document
    .getElementById("editTaskInput")
    .setAttribute("oninput", `hideErrorWhenTypeEdit(this, ${id})`);
  document
    .getElementById("editTaskBtn")
    .setAttribute("data-bs-dismiss", "modal");
  $("#editTaskModal").on("shown.bs.modal", function () {
    $("#editTaskInput").focus();
  });
  $("#editTaskBtn").on("click", function () {
    $("#editTaskInput").focus();
  });
}
// Edit Task Function //
function editTask(id) {
  let editTaskInputValue = document.getElementById("editTaskInput").value;
  let error = document.getElementById("editError");
  let editToast = document.getElementById("editToast");
  let toastEdit = bootstrap.Toast.getOrCreateInstance(editToast);
  if (editTaskInputValue.trim() == "") {
    error.style.display = "block";
  } else {
    tasks[id].title = editTaskInputValue;
    readTasks();
    toastEdit.show();
  }
}
// isDone Task Function //
function isDone(btn, id) {
  tasks[id].isDone = true;
  readTasks();
}
// notDone Task Function //
function notDone(btn, id) {
  tasks[id].isDone = false;
  readTasks();
}
readTasks();
