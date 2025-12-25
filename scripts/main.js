const softwareProjectButton = document.getElementById("softwareProjectButton");
const firmwareProjectButton = document.getElementById("firmwareProjectButton");
const softwareProjects = document.getElementById("softwareProjects");
const firmwareProjects = document.getElementById("firmwareProjects");

// function showSoftwareProjects() {
//   var x = document.getElementById("softwareProjects");
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else {
//     x.style.display = "block";
//   }
// }

// function showSoftwareProjects() {
//   const x = document.getElementById("softwareProjects");
//   const isVisible = window.getComputedStyle(x).display === "none";

//   x.style.display = isVisible ? "block" : "none";
// }

function showSoftwareProjects() {
  softwareProjects.classList.remove("hidden");
  firmwareProjects.classList.add("hidden");
}

function showFirmwareProjects() {
  softwareProjects.classList.add("hidden");
  firmwareProjects.classList.remove("hidden");
}
