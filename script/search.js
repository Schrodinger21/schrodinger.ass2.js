"use strict";

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBtn = document.getElementById("calculate-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const formEl = document.getElementById("container-form");
const btnFind = document.getElementById("find-btn");

renderTableData(petArr);
// Event click Find.
btnFind.onclick = function () {
  let petFind = petArr;
  // Find id.
  if (idInput.value) {
    petFind = petFind.filter((pet) =>
      pet.id.toUpperCase().includes(idInput.value.toUpperCase())
    );
  }
  // Find name.
  if (nameInput.value) {
    petFind = petFind.filter((pet) =>
      pet.name.toUpperCase().includes(nameInput.value.toUpperCase())
    );
  }
  // Find type.
  if (typeInput.value !== "Select Type") {
    petFind = petFind.filter((pet) => pet.type === typeInput.value);
  }
  // Find breed.
  if (breedInput.value !== "Select Breed") {
    petFind = petFind.filter((pet) => pet.breed === breedInput.value);
  }
  // Find vaccinated.
  if (vaccinatedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.vaccinated === true);
  }
  // Find dewormed.
  if (dewormedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.dewormed === true);
  }
  // Find sterilized.
  if (sterilizedInput.checked === true) {
    petFind = petFind.filter((pet) => pet.sterilized === true);
  }
  renderTableData(petFind);
  console.log(renderTableData(petFind));

  // Clear input.
  function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    typeInput.value = "Select Type";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  }
  clearInput();
};
// Render table.
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}Kg</td>
    <td>${petArr[i].petLength}cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].petcolor}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi bi-x-circle-fill"
    }"></i></td>
    
    <td>${petArr[i].date}</td>`;
    tableBodyEl.appendChild(row);
  }
}
// Tạo Array breed.
const breedList = breedArr.map((breedArr) => {
  return breedArr.breed;
});
// Thêm breed vào option lựa chọn.
function renderBreed() {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  breedList.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedItem}</option>`;
    breedInput.appendChild(option);
  });
}
renderBreed();
