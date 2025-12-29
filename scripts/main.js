const softwareProjectButton = document.getElementById("softwareProjectButton");
const firmwareProjectButton = document.getElementById("firmwareProjectButton");
const hardwareProjectButton = document.getElementById("hardwareProjectButton");
const fpgaProjectButton = document.getElementById("fpgaProjectButton");

const softwareProjects = document.getElementById("softwareProjects");
const firmwareProjects = document.getElementById("firmwareProjects");
const hardwareProjects = document.getElementById("hardwareProjects");
const fpgaProjects = document.getElementById("fpgaProjects");

const flappyBirdFpga = document.getElementById("flappyBirdFpga");
function showSoftwareProjects() {
  softwareProjects.classList.remove("hidden");
  firmwareProjects.classList.add("hidden");
  hardwareProjects.classList.add("hidden");
  fpgaProjects.classList.add("hidden");
}

function showFirmwareProjects() {
  softwareProjects.classList.add("hidden");
  firmwareProjects.classList.remove("hidden");
  hardwareProjects.classList.add("hidden");
  fpgaProjects.classList.add("hidden");
}

function showHardwareProjects() {
  softwareProjects.classList.add("hidden");
  firmwareProjects.classList.add("hidden");
  hardwareProjects.classList.remove("hidden");
  fpgaProjects.classList.add("hidden");
}

function showFpgaProjects() {
  softwareProjects.classList.add("hidden");
  firmwareProjects.classList.add("hidden");
  hardwareProjects.classList.add("hidden");
  fpgaProjects.classList.remove("hidden");
}

const flappyBirdDialog = document.getElementById("flappyBirdDialog");

flappyBirdFpga.addEventListener("click", () => {
  flappyBirdDialog.showModal();
});
