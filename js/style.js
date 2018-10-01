// Get the modal
var modal = document.getElementById('dailyModal');

// Get the button that opens the modal
var button = document.getElementById('dailyButton');

// Get the <span> element that closes the modal
var close = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal 
button.onclick = function() {
    event.preventDefault();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }