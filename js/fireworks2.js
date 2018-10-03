// below are fireworks on and off
// function isNotTen() {
//   if (((loadCurrentPoints() % 10)) === 0){
//     console.log('false1');
//     return(false);
//   }
//   else{
//     console.log('true2');
//     return(true);
//   }
// }
// if (isNotTen())
if (true){
    var sheetToBeRemoved = document.getElementById('fireworksOnOff');
    var sheetParent = sheetToBeRemoved.parentNode;
    sheetParent.removeChild(sheetToBeRemoved);
  }
  
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