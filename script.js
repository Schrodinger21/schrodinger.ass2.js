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

// Event click Submit.
submitBtn.onclick = function () {
  const fullDate = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    petLength: lengthInput.value,
    petcolor: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: `${fullDate.getDate()}/${
      fullDate.getMonth() + 1
    }/${fullDate.getFullYear()}`,
  };

  // Check validate.
  function valiDatedata(data) {
    for (let i = 0; i < petArr.length; i++) {
      if (data.id == petArr[i].id) {
        alert("ID must unique!");
        return false;
      }
    }
    if (!data.id) {
      alert("Please input for ID ");
      return false;
    } else if (!data.name) {
      alert("Please input for name");
      return false;
    } else if (data.age < 1 || data.age > 15 || !data.age) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (data.type === "Select Type") {
      alert("Please select Type");
      return false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (data.petLength < 1 || data.petLength > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data.breed === "Select Breed") {
      alert("Please select Breed");
      return false;
    } else {
      return true;
    }
  }

  // Clear input.
  const clearInput = function () {
    idInput.value = "";
    nameInput.value = "";
    typeInput.value = "Select Type";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    ageInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  };

  // Add pets to list.
  const validate = valiDatedata(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    console.log(petArr);
    renderTableData(petArr);
  }
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
    <td>${petArr[i].date}</td>
    <td>
      <button class="btn btn-danger" onclick="deletePet('${
        petArr[i].id
      }')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

//  Delete pet.
const deletePet = (petId) => {
  if (confirm("You are sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId == petArr[i].id) {
        console.log(petId);
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};

//  Show Healthy Pet.
const healthyPetArr = [];
let healthyCheck = true;
healthyBtn.onclick = function () {
  if (healthyCheck) {
    showHealthyPet();
    healthyBtn.innerHTML = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.innerHTML = "Show Healthy Pet";
    healthyCheck = true;
  }
};
function showHealthyPet() {
  let healthyPetArr = petArr.filter(
    (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
  );
  renderTableData(healthyPetArr);
}

// Event onchange type input
typeInput.onchange = function () {
  renderBreed();
};
// Breed type display conditions.
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  if (typeInput.value === "Dog") {
    let breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    let breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
