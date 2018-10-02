'use strict';

var avatarClass = 'Peasant';
var currentPoints = 0;

var getAvatar = document.getElementById('avatar');
var addedElement = addElement('p', currentPoints.toString(), getAvatar);
addedElement.setAttribute('id', 'displayedPoints');

var className = document.createTextNode(avatarClass);
var classNameElement = document.createElement('p');
classNameElement.appendChild(className);
getAvatar = document.getElementById('avatar');
addedElement = getAvatar.insertBefore(classNameElement, getAvatar.firstChild);
addedElement.setAttribute('id', 'currentClass');
