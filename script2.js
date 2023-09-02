const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("Add a task!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Use textContent instead of innerHTML
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = [];
    const taskElements = listContainer.querySelectorAll("li");
    taskElements.forEach(function (taskElement) {
        const task = {
            text: taskElement.textContent,
            checked: taskElement.classList.contains("checked")
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(function (task) {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });
    }
}

showTask();
