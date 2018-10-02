'use strict';


// //append a p tag to the avatar id with the current class name
// var getAvatar = document.getElementById('avatar');
// var className = document.createTextNode(avatarClass);
// var getP = document.createElement('p');
// getAvatar.appendChild(getP);
// getP.appendChild(className);
// var avatarClass = 'Peasant';

// //append a p tag to the smallAvatar id with the current points value
// var getSmallAvatar = document.getElementById('smallAvatar');
// var pointsValue = document.createTextNode(currentPoints);
// getSmallAvatar.appendChild(getP);
// getP.appendChild(pointsValue);
// var currentPoints = 0;

// append current point total to below avatar
var currentPoints = 0;
var getAvatar = document.getElementById('avatar');
addElement('p', currentPoints.toString(), getAvatar);

// prepend current point total above avatar
var avatarClass = 'Peasant';
var className = document.createTextNode(avatarClass);
var classNameElement = document.createElement('p');
classNameElement.appendChild(className);
getAvatar = document.getElementById('avatar');
//getAvatar.prependChild(classNameElement);

//parentNode.insertBefore(newNode, referenceNode);
getAvatar.insertBefore(classNameElement, getAvatar.firstChild);


