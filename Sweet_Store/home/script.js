// This is a way to change the first image in the carousel every time the page reloads.
// Made by dynamically adding the active class to the corresponding carousel tag.
// The active class in the Bootstrap carousel specifies which image will be the initial one
// The idea is adapted from http://lezione.dugward.ru/u25.html

var elementIds = ["carousel1", "carousel2", "carousel3"];
var randomIndex = Math.floor(Math.random() * elementIds.length);
var element = document.getElementById(elementIds[randomIndex]);
element.classList.add("active");

// This is the function that should implement further logic for processing a confirmed order.
// It's not implemented in this project, so it just have an alert.
function checkout() {
  alert("Thank you, the order has been placed.");
}
