'use strict';

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
  new Task('task 3', 'task 3 description - asynch', 'toDo', 'later', 5);
  localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
}

function addTask(taskName, taskDescript, taskType, dueDate, pointValue){
  //check for uniqueness for all tasks, regardless of type 
  if(bTaskUnique(taskName)){
    new Task(taskName, taskDescript, taskType, dueDate, pointValue);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else{
    //How do we need to handle duplicate task names?
    console.log('Task name already in use, use something else');
  }
}

function bTaskUnique(taskName){
  let bResult = true;
  for(let i = 0; i < Task.allTasks.length; i++){
    if(Task.allTasks[i].name === taskName){
      bResult = false;
      break;
    }
  }
  return bResult;
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