// content.js

/*=======================
 * Read and write content
 * from json file.
 ========================*/

const btn = document.querySelector('.btn');
const ad = document.querySelector('.Acontent');
const ap = document.querySelector('.APcontent');
const pl = document.querySelector('.PLtasks');
const al = document.querySelector('.ALcontent');

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
  
  const taskId = crypto.randomUUID();
  const taskBlock = `
    <div class="taskbox" draggable="true" data-id="${taskId}" > 
      <div class="tasktitle" contenteditable="true">Cyberpunk Theme List</div>

      <div class="ql-container">
        <div class="quill-editor-instance">
          <h2>Your Task</h2>
          <p> <b>bold</b> <i>italic</i> <u>underline</u> </p>
          <p> <a href="https://www.youtube.com/shorts/Ay8lynMZ4mE">buy me a coffee</a> </p>
        </div>
      </div>

      <div class="task-controls">
      </div>
    </div>
  `;
  
  // Insert the HTML
  pl.insertAdjacentHTML("beforeend", taskBlock);

  // STEP 2: Find the newly created element and initialize Quill
  
  // Get the element we just inserted (the last child of pl)
  const newTaskBox = pl.lastElementChild;
  
  // Get the new editor container inside the new task box
  const editorElement = newTaskBox.querySelector('.quill-editor-instance');

  // Initialize Quill on the found element
  const quill = new Quill(editorElement, {
    theme: 'snow'
  });
}

btn.onclick = addTask;

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();


let draggedTask = null;

document.addEventListener('dragstart', (e) => {
  
  const task = e.target.closest(".taskbox");

  if (!task) return;

  draggedTask = task;
  task.classList.add('dragging');
 
});

document.addEventListener("dragend", (e) => {

  if (draggedTask) {
    draggedTask.classList.remove('dragging');
    draggedTask = null;
  }

});


const dropZone = document.querySelectorAll(
  '.PLtasks, .ALcontent, .Acontent'
);


dropZone.forEach(zone => {

  zone.addEventListener('dragover', (e) => {

    e.preventDefault();
    const afterElement = getDragAfterElement(zone, e.clientY);
    if (afterElement == null) {
      zone.appendChild(draggedTask);
    } else {
      zone.insertBefore(draggedTask, afterElement);
    }
  });

});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.taskbox:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveAllTasks() {
  const columns = {
    todo: [...document.querySelectorAll('.PLtasks .taskbox')],
    current: [...document.querySelectorAll('.ALcontent .taskbox')],
    done: [...document.querySelectorAll('.Acontent .taskbox')]
  };

  const data = {};

  for (const [column, tasks] of Object.entries(columns)) {
    data[column] = tasks.map(task => ({
      id: task.dataset.id,
      title: task.querySelector('.tasktitle').textContent,
      content: task.querySelector('.ql-editor')?.innerHTML || ''
    }));
  }

  writeTaskToFile(data);
}

