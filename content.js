// content.js

/*=======================
 * Read and write content
 * from json file.
 ========================*/

const btn = document.querySelector('.btn');
const ad = document.querySelector('.Acontent');
const ap = document.querySelector('.APcontent');
const pl = document.querySelector('.PLtasks');

const DATA_FILE_PATH = bridge.dataFilePath;

function writeTaskToFile(tasks) {
  try {

    const jsonString = JSON.stringify(tasks, null, 2);

    bridge.writeFile(DATA_FILE_PATH,jsonString);

    console.log("Task saved to:", {DATA_FILE_PATH});

  } catch (error) {

    console.log("Error while writing to file", error);
  }
}

function readTaskFromFile() {
  try {
 
    const fileContent = bridge.readFile(DATA_FILE_PATH);
 
    return JSON.parse(fileContent);

  } catch (error) {
 
    if (error === 'ENOENT') {
      console.log('No existing data file. New file created');
      return [];
    }

    console.log('Error reading or parsing data file', error);
  }
}

function addTask() {
  
  const taskBlock = `
    <div class="taskbox"> 
      <div class="tasktitle" contenteditable="true"></div>

      <ul class="tasks"></ul>

      <div class="task-controls">
        <button class="add-subtask">+</button>
        <button class="expand">></button>
      </div>
    </div>
  `;
  pl.insertAdjacentHTML("beforeend", taskBlock);
}

pl.addEventListener('click', (e) => {

  // ADD SUBTASK
  if (e.target.classList.contains("add-subtask")) {
    const box = e.target.closest(".taskbox");
    const list = box.querySelector(".tasks");
    list.insertAdjacentHTML('beforeend', `<li contenteditable='true'>New Task</li>`);
  }

  // EXPAND / COLLAPSE
  if (e.target.classList.contains("expand")) {
    const box = e.target.closest(".taskbox");
    const btn = e.target;

    const expanded = box.dataset.expanded === "true";

    // Toggle class
    box.classList.toggle("expanded");

    // Toggle appearance
    if (expanded) {
      btn.innerHTML = `>`;
      btn.style.backgroundColor = "green";
    } else {
      btn.innerHTML = `<`;
      btn.style.backgroundColor = "red";
    }

    // Save new state
    box.dataset.expanded = !expanded;
  }
});

btn.onclick = addTask;
