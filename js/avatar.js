'use strict';

var userName = localStorage.getItem('name');
var avatarClass = 'Peasant';
// var fireworkClass = 'fireworksOnOff';
var currentPoints = 0;
loadCurrentPoints();

var getAvatar = document.getElementById('avatar');
var addedElement = addElement('p', currentPoints.toString(), getAvatar);
var pScore = document.createTextNode('  points');
addedElement.setAttribute('id', 'displayedPoints');
displayedPoints.appendChild(pScore);

var className = document.createTextNode(avatarClass);
var classNameElement = document.createElement('p');
classNameElement.appendChild(className);
getAvatar = document.getElementById('avatar');
addedElement = getAvatar.insertBefore(classNameElement, getAvatar.firstChild);
addedElement.setAttribute('id', 'currentClass');

// below are fireworks on and off
// function isNotFive() {
//   if ((currentPoints % 5) === 0){
//     //console.log('false1');
//     return(false);
//   }
//   else{
//     //console.log('true2');
//     return(true);
//   }
// }
// if (isNotFive())
// if (5){
//   var sheetToBeRemoved = document.getElementById('fireworksOnOff');
//   var sheetParent = sheetToBeRemoved.parentNode;
//   sheetParent.removeChild(sheetToBeRemoved);
// }

//might work below but so far not working for Carlos.
// var isNotFive = function(currentPoints) {
//   if ((currentPoints % 5) === 0){
//     return(false);
//   }
//   else{
//     return(true);
//     console.log(isNotFive);
//   }
// };

// var checkFireworks = function(){
//   if (isNotFive(currentPoints)) {
//     var sheetToBeRemoved = document.getElementById('fireworksOnOff');
//     var sheetParent = sheetToBeRemoved.parentNode;
//     sheetParent.removeChild(sheetToBeRemoved);
//   }
//   else{
//     var getFireworks = document.getElementById('fireworksOnOff');
//     var className = document.createTextNode(fireworkClass);
//     var classNameElement = document.createElement('div');
//     classNameElement.appendChild(className);
//     getFireworks = document.getElementById('fireworksOnOff');
//     addedElement = getFireworks.insertBefore(classNameElement, getFireworks.firstChild);
//     addedElement.setAttribute('id', 'currentClass');
//   }
// };

// function isNotFive() {
//   if ((currentPoints % 5) === 0){
//     //console.log('false1');
//     return(init(), draw());
//   }
//   else{
//     console.log('no fireworks');
//   }
// }

//adding big character to character page
//avatar = a variable to hold the users current avatar
function characterAvatar() {
  var characterAvatar = document.getElementById('bigCharacter');
  if (characterAvatar){
    characterAvatar.innerHTML = avatar;
  }
}

//adding character name to character page
//userName = a variable to hold the users name and store in local storage.
function characterName() {
  var characterName = document.getElementById('characterName');
  if (characterName) {
    characterName.innerHTML = userName + ' the ' + avatarClass;
  }
}

//populating the users current experience points to character page
function characterPoints() {
  var characterPoints = document.getElementById('characterPoints');
  if (characterPoints) {
    characterPoints.innerHTML = currentPoints;
  }
}

//populating the Next Character Level in the character page
function characterNext() {
  var characterNext = document.getElementById('characterNext');
  var points = 0;
  var avatarNext = 'Peasant';

  if (characterNext) {

    if (currentPoints < 10){
      avatarNext = 'Farmer';
      points = 10 - currentPoints;
    } else if (10 <= currentPoints < 20) {
      avatarNext = 'Master Farmer';
      points = 20 - currentPoints;
    } else if (20 <= currentPoints < 50) {
      avatarNext = 'Craftsperson';
      points = 50 - currentPoints;
    } else if (50 <= currentPoints < 100) {
      avatarNext = 'Artisan';
      points = 100 - currentPoints;
    } else if (100 <= currentPoints < 200) {
      avatarNext = 'Lord';
      points = 200 - currentPoints;
    } else if (200 <= currentPoints < 400) {
      avatarNext = 'Mage';
      points = 400 - currentPoints;
    } else if (400 <= currentPoints < 1000) {
      avatarNext = 'Royalty';
      points = 1000 - currentPoints;
    } else if (1000 <= currentPoints < 2500) {
      avatarNext = 'God';
      points = 2500 - currentPoints;
    } else {
      avatarNext = 'Ruler Of Everything';
      points = 100000000;
    }

    characterNext.innerHTML = 'Only ' + points + ' points until ' + avatarNext + '!';
  }
}

characterPoints();
characterAvatar();
characterName();
characterNext();



