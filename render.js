// render.js

/*====================
* Colapse or Expand the
* Work Area.
=====================*/

const todo = document.querySelector('.to-do');
const current = document.querySelector('.current');
const done = document.querySelector('.done');
const headpl = document.querySelector('.PLhead');
const heada = document.querySelector('.Ahead');
const headap = document.querySelector('.APhead');
const grid = document.querySelector('.grid');

function todobox() {
  todo.style.width = '60%';
  done.style.width = '10%';
  current.style.width = '10%';

  headpl.innerHTML = `<h1>Protocol Log</h1>`;
  headap.innerHTML = `<div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px; margin: auto; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>AP</h1></div>`;
  heada.innerHTML = `<div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px; margin: auto; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>AD</h1></div>`;

};

function currentbox() {
  todo.style.width = '10%';
  done.style.width = '10%';
  current.style.width = '60%';

  headpl.innerHTML = `<div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px; margin: auto; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>PL</h1></div>`;
  heada.innerHTML = `<div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px; margin: auto; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>AD</h1></div>`;
  headap.innerHTML = `<h1>Active Protocol</h1>`

};

function donebox() {
  todo.style.width = '10%';
  done.style.width = '60%';
  current.style.width = '10%';

  headpl.innerHTML = ` <div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px; margin: 0; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>PL</h1></div>`;
  headap.innerHTML = `<div style=" display: flex; width: 100%; height: 65px; font-weight:bold; background-color:#0A001F; color:white; border-radius: 15px;  margin: 0; align-items:center; justify-content: center; font-size: 1.5vw;" ><h1>AP</h1></div>`;
  heada.innerHTML = `<h1>Archive Data</h1>`
};

function reset() {
 
  todo.style.width = '30%';
  done.style.width = '30%';
  current.style.width = '30%'
 
  heada.innerHTML = `<h1>Archive Data</h1>`;
  headap.innerHTML = `<h1>Active Protocol</h1>`;
  headpl.innerHTML = `<h1>Protocol Log</h1>`;

};

heada.innerHTML = `<h1>Archive Data</h1>`;
headap.innerHTML = `<h1>Active Protocol</h1>`;
headpl.innerHTML = `<h1>Protocol Log</h1>`;

todo.addEventListener('click',(e) => {
  todobox();
});

current.addEventListener('click',(e) => {
  currentbox();
});

done.addEventListener('click',(e) => {
  donebox();
});

grid.addEventListener('click', (e) => {
  reset();
});
