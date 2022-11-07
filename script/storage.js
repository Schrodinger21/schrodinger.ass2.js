"use strict";

const tableBodyEl = document.getElementById("tbody");
const sidebarBtn = document.getElementById("sidebar");
const petArr = getFromStorage("petArr") || [];
const breedArr = getFromStorage("breedArr") || [];

// Animation open sidebar.
sidebarBtn.addEventListener("click", function () {
  sidebarBtn.classList.toggle("active");
});
// Save data.
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Get data.
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
