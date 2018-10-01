'use strict';

var addDailyButton = document.getElementById('dailyButton');
var addToDoButton = document.getElementById('todoButton');

//Need a task object; should use a constructor
function Task(taskName, taskDescript, taskType, dueDate, pointValue){
  this.name = taskName;
  this.description = taskDescript;
  this.taskType = taskType;
  this.dueDate = dueDate;
  this.value = pointValue;
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


//need a handler to update daily task list

//function updateDaily(){

//};

//  change the object to delete the list & add the new update list.
dailyButton.addEventLister('submit', updateDaily);




//need a handler to update non-daily To Do list
//  change the object to delete the list & add the new update list.
//function updateToDo(){

//};

addToDoButton.addEventLister('submit', updateToDo);

