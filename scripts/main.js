// 1. Select the main container once
const container = document.getElementById('portfolio-container');
let allProjects = []; 

// 2. Load data and show everything to start
async function init() {
    try {
        const response = await fetch('./projects.json');
        allProjects = await response.json();
        renderProjects('all'); // Initialize showing all
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

// 3. The "Workhorse" function
function renderProjects(filterTag) {
    // Clear the container first
    container.innerHTML = "";

    // Filter the data based on the tag passed to the function
    const filtered = filterTag === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.tag.includes(filterTag));

    // Build the HTML cards
    filtered.forEach(project => {
        container.innerHTML += `
            <div class="card">
              <div class="card-text">
                <h3>${project.title}</h3>
              </div>
            </div>
        `;
    });
}



// 4. Event Listeners
document.getElementById("softwareProjectButton").addEventListener("click", () => renderProjects("Software"));
document.getElementById("firmwareProjectButton").addEventListener("click", () => renderProjects("Firmware"));
document.getElementById("hardwareProjectButton").addEventListener("click", () => renderProjects("Hardware"));
document.getElementById("fpgaProjectButton").addEventListener("click", () => renderProjects("FPGA"));

init();