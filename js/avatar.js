'use strict';

var avatarClass = 'Peasant';
var currentPoints = 0;

//append a p tag to the avatar id with the current class name
var getAvatar = document.getElementById('avatar');
var className = document.createTextNode(avatarClass);
var getP = document.createElement('p');
getP.appendChild(className);
getAvatar.appendChild(getP);

//append a p tag to the smallAvatar id with the current points value
var getSmallAvatar = document.getElementById('smallAvatar');
var pointsValue = document.createTextNode(currentPoints);
getSmallAvatar.appendChild(getP);
getP.appendChild(pointsValue);


