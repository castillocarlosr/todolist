'use strict';

//when the date value is 12am
//look in LS for the 'tasks'
//parse JSON to access the array
//grab the tasks that have task type = 'daily'
//change status to 'open'
//clear current dailies
// renderDaily()

//get old date
//parse it to get old hour
//compare it to new date
  //if not the same: run the function
//store new date to local storage


var dateNew = new Date();
var currentDate = dateNew.getDate();
var recentDate = localStorage.getItem('date');
var recentDay = recentDate.getDate();



function repopulateDailies() {
  var tasks = localStorage.getItem('tasks');
  var currentTasks = JSON.parse(tasks);

  for (var i=0; i < currentTasks.length; i++) {
    if (currentTasks[i].type.value === 'daily') {
      currentTasks[i].status.value = 'open';
    }

    renderDaiy();
  }
  localStorage.setItem('date', recentDate);
}


if (currentDate !== recentDay) {
  repopulateDailies();
}

