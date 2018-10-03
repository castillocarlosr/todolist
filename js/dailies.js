'use strict';

//when the date value is 12am
//look in LS for the 'tasks'
//parse JSON to access the array
//grab the tasks that have task type = 'daily'
//change status to 'open'
//clear current dailies
// renderDaily()


var dateNew = new Date();

var currentHour = dateNew.getHours();

function repopulateDailies() {
  if (currentHour === 0) {
    var tasks = localStorage.getItem('tasks');
    var currentTasks = JSON.parse(tasks);
    console.log(currentTasks);

    for (var i=0; i < currentTasks.length; i++) {
      if (currentTasks[i].type.value === 'daily') {
        currentTasks[i].status.value = 'open';
      }

      renderDaiy();

    }
  }
}

setInterval(repopulateDailies, 60000);
