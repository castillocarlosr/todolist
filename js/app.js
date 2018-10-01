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
  new Task('task 1', 'task 1 description - synch', 'daily', 1);
  new Task('task 2', 'task 2 description - synch', 'daily', 5);
  new Task('task 3', 'task 3 description - asynch', 'toDo', 5);
  localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
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