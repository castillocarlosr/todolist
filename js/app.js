'use strict';

//Removes the fireworks at start-up


var addDaily = document.getElementById('dailyForm');
var addToDo = document.getElementById('todoForm');
var dailyListHead = document.getElementById('dailyLegend');
var todoListHead = document.getElementById('todoLegend');
var dailyModal = document.getElementById('dailyModal');
var todoModal = document.getElementById('todoModal');
var currentPoints = 0;


//Need a task object; should use a constructor
function Task(taskName, taskDescript, taskType, dueDate, pointValue){
  this.name = taskName;
  this.description = taskDescript;
  this.taskType = taskType;
  this.dueDate = dueDate;
  this.value = pointValue;
  this.completionState = 'open';
  Task.allTasks.push(this);
}
Task.allTasks = [];


function buildTasks(){
  new Task('task 1', 'task 1 description - synch', 'daily', 'now', 1);
  new Task('task 2', 'task 2 description - synch', 'daily', 'soon', 5);
  new Task('task 3', 'task 3 description - asynch', 'toDo', 'later', 8);
  localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
}

function addTask(taskName, taskDescript, taskType, dueDate, pointValue){
  //check for uniqueness for all tasks, regardless of type
  let index = getTaskIndexByName(taskName);
  if( !( index || index === 0 ) ){
    new Task(taskName, taskDescript, taskType, dueDate, pointValue);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    //How do we need to handle duplicate task names?
    console.log('Task name already in use, use something else');

  }
}

function getTaskIndexByName(taskName){
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].name === taskName){
      return i;
    }
  }
}

function updateTask(taskName, taskDescript, taskType, dueDate, pointValue){
  let index = getTaskIndexByName(taskName);
  if( index || index === 0 ){
    Task.allTasks[index].description = taskDescript;
    Task.allTasks[index].taskType = taskType;
    Task.allTasks[index].dueDate = dueDate;
    Task.allTasks[index].value = pointValue;
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    //How do we need to handle updating a non-existent task?
    console.log('Task does not exist; try adding a task with that name instead');
  }
}

function removeTask(taskName){
  let index = getTaskIndexByName(taskName);
  if( index || index === 0 ){
    let removedTask = Task.allTasks.splice(index,1);
    console.log('removing ' + removedTask);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    console.log('No task with that name exists.');
  }
}

function generateTasks(){
  var myTasks = localStorage.getItem('tasks');
  if(!myTasks || myTasks.length === 0){
    buildTasks();
  }
  else{
    Task.allTasks = JSON.parse(myTasks);
  }
}

generateTasks();

function renderDaily(){
  while(dailyListHead.childNodes.length > 1){
    dailyListHead.removeChild(dailyListHead.lastChild);
  }
  let fieldsetElement = addElement('fieldset','',dailyListHead);
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].taskType === 'daily'){
      let labelElement = addElement('label', Task.allTasks[i].name, fieldsetElement);
      let inputElement = addElement('input','',labelElement);
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
      inputElement.addEventListener('click', checkboxHandler);
    }
    else{
      console.log('Not a daily task - type is: ' + Task.allTasks[i].taskType);
    }
  }
}
renderDaily();

function renderToDo(){
  while(todoListHead.childNodes.length > 1){
    todoListHead.removeChild(todoListHead.lastChild);
  }
  let fieldsetElement = addElement('fieldset','',todoListHead);
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].taskType === 'toDo'){
      let labelElement = addElement('label', Task.allTasks[i].name, fieldsetElement);
      let inputElement = addElement('input', '', labelElement);
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
    }
    else{
      console.log('Not a toDo task - type is: ' + Task.allTasks[i].taskType);
    }
  }
}
renderToDo();

function addElement(tag,elementContent,parentElement){
  let newElement = document.createElement(tag);
  if(elementContent){
    let newElementContent = document.createTextNode(elementContent);
    newElement.appendChild(newElementContent);
  }
  parentElement.appendChild(newElement);
  return(newElement);
}

//need a handler to update daily task list

function updateDaily(event){
  event.preventDefault();
  let newDailyTaskName = event.target.taskname.value;
  let taskDiff = event.target.difficulity.value;
  let taskPoints = 0;
  switch(taskDiff){
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  addTask(newDailyTaskName,'','daily','end of day today', taskPoints);
  dailyModal.style.display = 'none';


  renderDaily();
}

// //  change the object to delete the list & add the new update list.
addDaily.addEventListener('submit', updateDaily);




//need a handler to update non-daily To Do list
//  change the object to delete the list & add the new update list.
function updateToDo(event){
  event.preventDefault();
  let newTodoTaskName = event.target.taskname.value;
  let newTodoTaskDesc = event.target.taskdescription.value;
  let taskDiff = event.target.difficulity.value;
  let taskDueDate = event.target.dueDate.value;
  let taskPoints = 0;
  switch(taskDiff){
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  addTask(newTodoTaskName,newTodoTaskDesc,'toDo', taskDueDate, taskPoints);
  todoModal.style.display = 'none';
  renderToDo();
}

addToDo.addEventListener('submit', updateToDo);


// function for adding fireworks then setting timer to remove
//if points = 5, 10, 15, 20....false  else true
// function myFunction(true) {
//   setTimeout(function(){ alert("Hello"); }, 3000);
// else{
//   var sheetToBeRemoved = document.getElementById('fireworksOnOff');
// var sheetParent = sheetToBeRemoved.parentNode;
// sheetParent.removeChild(sheetToBeRemoved);
// }
// }
var levelPoint = 11;

if (levelPoint<5 || levelPoint>5 || levelPoint>10) {
  var sheetToBeRemoved = document.getElementById('fireworksOnOff');
  var sheetParent = sheetToBeRemoved.parentNode;
  sheetParent.removeChild(sheetToBeRemoved);
}



//event handler when a checkbox is clicked

function checkboxHandler(event) {
  event.preventDefault();

  for (var i=0; i<Task.allTasks.length; i++){
    if (this.value === Task.allTasks[i].name){
      Task.allTasks[i].completionState = 'complete';
      currentPoints = Task.allTasks[i].value + currentPoints;
      
      var changePoints = document.getElementById('displayedPoints');
      changePoints.innerHTML = currentPoints.toString();
      break;
    }
  }
}
