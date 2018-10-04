'use strict';

var avatarDom = document.getElementById('avatar');
var userName = localStorage.getItem('name');
var getFireworks = document.getElementById('fireSentence');
var avatarClass = 'Peasant';
var currentPoints = 0;
loadCurrentPoints();
loadClassName();

function loadClassName() {
  let className = localStorage.getItem('class');
  if (className){
    avatarClass = className;
  }
}
//figures out the current class of user
function userCurrentClass() {
  if (currentPoints < 10){
    avatarClass = 'Peasant';
  } else if (currentPoints < 20) {
    avatarClass = 'Farmer';
  } else if (currentPoints < 50) {
    avatarClass = 'Master Farmer';
  } else if (currentPoints < 100) {
    avatarClass = 'Craftsperson';
  } else if (currentPoints < 200) {
    avatarClass = 'Artisan';
  } else if (currentPoints < 400) {
    avatarClass = 'Lord';
  } else if (currentPoints < 1000) {
    avatarClass = 'Mage';
  } else if (currentPoints < 2500) {
    avatarClass = 'Royalty';
  } else {
    avatarClass = 'God';
  }

  var oldClass = localStorage.getItem('class');
  if (oldClass !== avatarClass) {
    levelUpClass();
    // levelUpAvatar();
    levelUpFireworks();

  }
}

function levelUpClass(){
  localStorage.setItem('class', avatarClass);
  let currentClassElement = document.getElementById('currentClass');
  currentClassElement.innerHTML = avatarClass;
}

function levelUpFireworks() {
  document.getElementById('fireSentence').classList.add('fire');
  console.log(document.getElementById('fireSentence'));
  setTimeout(fireOff(), 2000);
}

function fireOff () {
  document.getElementById('fireSentence').classList.remove('fire');
}



//adding points below the header avatar
var getAvatar = document.getElementById('avatar');
var addedElement = addElement('p', currentPoints.toString(), getAvatar);
var pScore = document.createTextNode('  points');
addedElement.setAttribute('id', 'displayedPoints');
displayedPoints.appendChild(pScore);

//adding class above the header avatar
var className = document.createTextNode(avatarClass);
var classNameElement = document.createElement('p');
classNameElement.appendChild(className);
getAvatar = document.getElementById('avatar');
addedElement = getAvatar.insertBefore(classNameElement, getAvatar.firstChild);
addedElement.setAttribute('id', 'currentClass');
userCurrentClass();

//adding big character to character page

// make a function where I generate an image element and attach it to characterAvatar then call the function each time
function generateImage(targetImage) {
  if (generateImage){
    var img = document.createElement('img');
    img.setAttribute('src', targetImage);
    var characterAvatar = document.getElementById('bigCharacter');
    characterAvatar.appendChild(img);
  }
}

function characterAvatar() {
  if (characterAvatar){
    if (currentPoints < 10){
      generateImage('img/sick-girl.png');
    } else if (currentPoints < 20) {
      generateImage('img/farmer.png');
    } else if (currentPoints < 50) {
      generateImage('img/masterfarmer.png');
    } else if (currentPoints < 100) {
      generateImage('img/artist.png');
    } else if (currentPoints < 200) {
      generateImage('img/leader.png');
    } else if (currentPoints < 400) {
      generateImage('img/king.png');
    } else if (currentPoints < 1000) {
      generateImage('img/magician.png');
    } else if (currentPoints < 2500) {
      generateImage('img/queen.png');
    } else {
      generateImage('img/zeus.png');
    }
  }
}

// adding character name to character page
// userName = a variable to hold the users name and store in local storage.
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
    } else if (currentPoints < 20) {
      avatarNext = 'Master Farmer';
      points = 20 - currentPoints;
    } else if (currentPoints < 50) {
      avatarNext = 'Craftsperson';
      points = 50 - currentPoints;
    } else if (currentPoints < 100) {
      avatarNext = 'Artisan';
      points = 100 - currentPoints;
    } else if (currentPoints < 200) {
      avatarNext = 'Lord';
      points = 200 - currentPoints;
    } else if (currentPoints < 400) {
      avatarNext = 'Mage';
      points = 400 - currentPoints;
    } else if (currentPoints < 1000) {
      avatarNext = 'Royalty';
      points = 1000 - currentPoints;
    } else if (currentPoints < 2500) {
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



