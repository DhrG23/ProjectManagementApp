// preload.js
const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "todo_task.json");

contextBridge.exposeInMainWorld('bridge',{
  readFile: (filepath) => {
    return fs.readFileSync(filepath,"utf8");
  },

  writeFile: (filepath, data) => {
    return fs.writeFileSync(filepath,data,"utf8");
  },

  joinPath: (...args) => {
    return path.join(...args);
  },
  
  dataFilePath: dataFilePath,
});

