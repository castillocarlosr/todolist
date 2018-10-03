'use strict';

function loadCurrentClass(){
  let tempClass = localStorage.getItem('class');
  if(tempClass){
    avatarClass = parseInt(JSON.parse(tempClass));
  }
  else{
    avatarClass = 'peasant';
  }
}
loadCurrentClass();

function saveCurrentClass(){
  if(!avatarClass){
    avatarClass = 'peasant';
  }
  localStorage.setItem('class', JSON.stringify(avatarClass));
}