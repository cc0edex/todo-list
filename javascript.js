var date = new Date();
var taskdate =
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
var tasks = [];
var counter = 0;
var getTasksFromLocalStorage = localStorage.getItem("tasks");
var strToArry = JSON.parse(getTasksFromLocalStorage);
tasks = strToArry ?? [];
function fillTasksOnPage() {
  counter = 0;
  document.getElementById("tasks").innerHTML = "";
  for (task of tasks) {
    document.getElementById("tasks").innerHTML += `
          <div id="task${counter}" class="task">
                    <div id="content">
                        <h1 style="color:#1f1e48d4;margin-top: 10px;margin-left: 20px;font-weight: 400;">${task.title}</h1>
                            <p style="color: #1f1e48d4;margin-left: 20px;display: flex;align-items: end;">
                              <span class="material-symbols-outlined">calendar_month</span>${task.date}</p>
                    </div>
                        <div id="buttons">
                            <button id ="a${counter}" counter="${counter}" class="btn" style="background-color: #5cb57f;" onclick="isDone(this)"><span class="material-symbols-outlined">check_circle</span></button>
                            <button id ="b${counter}" counter="${counter}" class="btn" style="display:none;" onclick="notDone(this)"><span class="material-symbols-outlined">close</span></button>
                            <button id ="c${counter}" counter="${counter}" class="btn" style="background-color: #3d51bcf5" onclick="showEditTask(this)"><span class="material-symbols-outlined">edit</span></button>
                            <button id ="d${counter}" counter="${counter}" class="btn" style="background-color: #c21616" onclick="deleteTask(this)"><span class="material-symbols-outlined">delete</span></button>
                        </div>
                  </div>
          `;
    var isDone = tasks[counter].isDone;
    if (isDone) {
      document.getElementById("task" + counter).classList.add("done");
      document.getElementById("a" + counter).style.display = "none";
      document
        .getElementById("b" + counter)
        .setAttribute("style", "display:block;background-color: #9a2a2a;");
    }
    counter++;
  }
  var arryToStr = JSON.stringify(tasks);
  localStorage.setItem("tasks", arryToStr);
}
function showAddForm() {
  document.querySelector(".addTask").classList.add("active");
}
function hideAddForm() {
  document.querySelector(".addTask").classList.remove("active");
  document.getElementById("add-input").value = "";
}
function addTask() {
  let value = document.getElementById("add-input").value;
  var newObj = {
    title: value,
    date: taskdate,
    isDone: false,
  };
  tasks.push(newObj);
  hideAddForm();
  fillTasksOnPage();
}
function deleteTask(btn) {
  var id = btn.getAttribute("counter");
  var deleteForm = document.getElementById("DeleteTask");
  var deleteText = document.getElementById("delete-title");
  var removeBtn = document.getElementById("remove");
  removeBtn.setAttribute("counter", id);
  deleteText.innerHTML = `<h1 id="delete-h1">Are you sure you want to delete: <span style="color: #77f8f8d4;">"${tasks[id].title}" </span>?</h1>`;
  deleteForm.classList.add("active");
}
function hideDeleteForm() {
  document.getElementById("DeleteTask").classList.remove("active");
}
function deleted() {
  var id = document.getElementById("remove").getAttribute("counter");
  tasks.splice(id, 1);
  document.getElementById("DeleteTask").classList.remove("active");
  fillTasksOnPage();
}
function isDone(self) {
  var self = self.getAttribute("counter");
  tasks[self].isDone = true;
  fillTasksOnPage();
}
function notDone(self) {
  var self = self.getAttribute("counter");
  tasks[self].isDone = false;
  fillTasksOnPage();
}
function showEditTask(self) {
  self = self.getAttribute("counter");
  document.querySelector(".editTask").classList.add("active");
  document.getElementById("edit-btn").setAttribute("counter", self);
  document.getElementById("edit-input").value = tasks[self].title;
}
function hideEditForm() {
  document.querySelector(".editTask").classList.remove("active");
}
function editTask() {
  var self = document.getElementById("edit-btn").getAttribute("counter");
  var editInput = document.getElementById("edit-input").value;
  tasks[self].title = editInput;
  hideEditForm();
  fillTasksOnPage();
}
fillTasksOnPage();
