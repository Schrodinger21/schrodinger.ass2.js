"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");

// Event click submit.
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Check validate.
  function valiDatedata(data) {
    let isValidate = true;
    if (breedInput.value.trim().length === 0) {
      alert("Please select Breed");
      isValidate = false;
    } else if (data.type === "Select Type") {
      alert("Please select Type");
      isValidate = false;
    }
    return isValidate;
  }
  // Clear Input.
  const clearInput = function () {
    typeInput.value = "Select Type";
    breedInput.value = "";
  };
  // Add breed to list.
  const validate = valiDatedata(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    clearInput();
    console.log(breedArr);
    renderBreedTable(breedArr);
  }
});
// Render list Breed.
function renderBreedTable(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${i + 1}</th>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>    
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].breed
    }','${breedArr[i].type}')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  }
}
// Delete breed.
const deleteBreed = (breedIndex) => {
  if (confirm("You are sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedIndex == breedArr[i].breed) {
        console.log(breedIndex);
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
      }
    }
  }
};
