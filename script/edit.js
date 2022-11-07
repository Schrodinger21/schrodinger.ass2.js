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

renderTableData(petArr);
// Event click Submit.
submitBtn.onclick = function () {
  const fullDate = new Date();
  const data = {
    name: nameInput.value,
    id: idInput.value,
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
  // Update data.
  const validate = valiDatedata(data);
  if (validate) {
    const index = petArr.findIndex((petId) => petId.id === data.id);
    data.date = petArr[index].date; // Giữ nguyên ngày tháng.
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    clearInput();
    console.log(petArr);
    renderTableData(petArr);
    formEl.classList.add("hide");
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
      <button class="btn btn-warning" onclick="editPet('${
        petArr[i].id
      }')">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
  console.log(petArr);
}
// Hiển thị ngày
function day(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
// Edit pet
function editPet(petId) {
  formEl.classList.remove("hide");
  for (let i = 0; i < petArr.length; i++) {
    if (petId == petArr[i].id) {
      console.log(petId);
      idInput.value = petArr[i].id;
      nameInput.value = petArr[i].name;
      colorInput.value = petArr[i].petcolor;
      ageInput.value = petArr[i].age;
      weightInput.value = petArr[i].weight;
      lengthInput.value = petArr[i].petLength;
      typeInput.value = petArr[i].type;
      renderBreed();
      breedInput.value = petArr[i].breed;
      vaccinatedInput.checked = petArr[i].vaccinated;
      dewormedInput.checked = petArr[i].dewormed;
      sterilizedInput.checked = petArr[i].sterilized;
    }
  }
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
