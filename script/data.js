"use strict";

const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const fileInput = document.getElementById("input-file");

// Event click Export File.
exportBtn.addEventListener("click", function () {
  saveStaticDataToFile();
  console.log();
});

// Save file.
function saveStaticDataToFile() {
  const exportData = JSON.stringify(petArr, null, 2);
  const blob = new Blob([exportData], { type: "application/json" });
  saveAs(blob, "Data.json");
}

// Event click Import file.
importBtn.addEventListener("click", function () {
  // If there's no file, do nothing.
  if (!fileInput.value) {
    alert("You need to select the file to import");
  } else {
    const file = fileInput.files[0];
    const reader = new FileReader();
    // Event load file.
    reader.addEventListener("load", function () {
      saveToStorage("petArr", JSON.parse(reader.result));
      alert("successfully completed");
    });
    // Read the file.
    reader.readAsText(file);
  }
  // Clear input.
  fileInput.value = "";
});
