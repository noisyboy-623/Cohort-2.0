function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const allFullElems = document.querySelectorAll(".fullElem");
  const backBtn = document.querySelectorAll(".back");

  allElems.forEach(function (elem) {
    // console.log(elem.id);
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "block";
      console.log(allFullElems[elem.id]);
    });
  });

  backBtn.forEach((elem) => {
    // console.log(elem)
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  let form = document.querySelector(".add-task form");
  let taskInput = document.querySelector(".add-task form #task-input");
  let taskDetailsInput = document.querySelector(".add-task form textarea");
  let taskCheckbox = document.querySelector(".add-task form #check");

  var currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("empty");
  }

  function renderTasks() {
    let allTasks = document.querySelector(".all-tasks");

    let sum = "";

    currentTask.forEach((elem, idx) => {
      sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });

    allTasks.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTasks();
      });
    });
  }
  renderTasks();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });

    renderTasks();
    
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckbox.value = false;
  });
}

todoList();

