'use strict';

//Removes the fireworks at start-up

var lastLookedAtName = '';

var addDaily = document.getElementById('dailyForm');
var addToDo = document.getElementById('todoForm');
var updateDailyObjectForm = document.getElementById('dailyDetails');
var dailyListHead = document.getElementById('dailyLegend');
var todoListHead = document.getElementById('todoLegend');
var dailyModal = document.getElementById('dailyModal');
var todoModal = document.getElementById('todoModal');
var dailyFieldset = document.getElementById('dailyFeildset');
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
  new Task('Drink water', '', 'daily', 'EoD', 1);
  new Task('Take 6000 steps', '', 'daily', 'EoD', 3);
  new Task('Get 8 hours of sleep', '', 'daily', 'EoD', 3);
  new Task('Graduate CodeFellows 201','Present this final project in front of the class on Friday!','toDo','EoD Friday', 5);
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

function updateTask(taskName, taskDescript, taskType, dueDate, pointValue, newName){
  let index = getTaskIndexByName(taskName);
  console.log('attempting to update index ' + index);
  if( index || index === 0 ){
    if(newName){
      Task.allTasks[index].name = newName;
    }
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
      let labelElement = addElement('label', '' , fieldsetElement);
      let inputElement = addElement('input', '' ,labelElement);
      addElement('span', Task.allTasks[i].name, labelElement);
      let modalElement = addElement('p', 'Click me', labelElement);
      modalElement.addEventListener('click', dailyDetailHandler);
      
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
      let labelElement = addElement('label', '' , fieldsetElement);
      let inputElement = addElement('input', '', labelElement);
      addElement('span', Task.allTasks[i].name, labelElement);
      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);

      inputElement.addEventListener('click', checkboxHandler);
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
// var levelPoint = 11;

// if (levelPoint<5 || levelPoint>5 || levelPoint>10) {
//   var sheetToBeRemoved = document.getElementById('fireworksOnOff');
//   var sheetParent = sheetToBeRemoved.parentNode;
//   sheetParent.removeChild(sheetToBeRemoved);
// }



//event handler when a checkbox is clicked

function checkboxHandler() {

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

/////////to make the daily task detail form appear//////////////
// Get the daily detail modal
var dailyDetailModal = document.getElementById('dailyDetailModal');

//event handler for when "Click Me" text area is clicked
function dailyDetailHandler(event){
  event.preventDefault();
  let targetedValue = event.target.previousSibling.innerHTML;
  lastLookedAtName = targetedValue;
  let targetedTask = '';
  for (let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].name === targetedValue){
      targetedTask = Task.allTasks[i];
    }
  }
  console.log(event.target.previousSibling.value + ' was pressed.');
  let dailyTaskName = document.getElementById('dailyDetailTaskName');
  // dailyTaskName.setAttribute('value', targetedTask.name);
  dailyTaskName.setAttribute('value', targetedTask.name);
  dailyDetailModal.style.display = 'block';
  let dailyTaskDifficulty = document.getElementById('dailyDetailTaskDifficulty');
  let displayDifficultyElement = 0;
  switch(targetedTask.value){
  case 1:
    displayDifficultyElement = 0;
    break;
  case 3:
    displayDifficultyElement = 1;
    break;
  case 5:
    displayDifficultyElement = 2;
    break;
  }
  dailyTaskDifficulty.children[displayDifficultyElement].setAttribute('selected', 'selected');
}

function updateCurrentTask(){
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
  updateTask(lastLookedAtName,'','daily','end of day today', taskPoints, newDailyTaskName);
  dailyDetailModal.style.display = 'none';
  renderDaily();
}

updateDailyObjectForm.addEventListener('submit', updateCurrentTask);

function changePic(){
  var timer = setInterval(nextImage, 2000);
  var curImage = 0;
  var numImages = 2;

  
  function nextImage() {
    var pic;
    // remove showMe class from current image
    pic = document.getElementById("slideimg" + curImage);
    removeClass(pic, "");
  
    // compute next image
    curImage++;
    // if (curImage > numImages - 1) {
    //     curImage = 0;
    // }
  
    // add showMe class to next image
      
    pic = document.getElementById("slideimg" + curImage);
    addClass(pic, "showMe");
    pic2 = document.getElementById("slideimg0");
    removeClass(pic2, "showMe");
  }
  
  function addClass(elem, name) {
    var change = elem.className;
    if (change) change += " ";  // if not blank, add a space separator
    change += name;
    elem.className = change;
  }
  
  function removeClass(elem, name) {
    var change = elem.className;
    elem.className = change.replace(name, "").replace(/   /g, " ").replace(/^ | $/g, "");  // remove name and extra blanks
  }
}
  

function run(){
  if(currentPoints === 10){
    changePic();
  }
  else{

  }
}  
  
run();
