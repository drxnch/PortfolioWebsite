// 1. Select the main container once
const container = document.getElementById('portfolio-container');
const featured_container = document.getElementById('featured-projects-container');
let allProjects = []; 
let featuredProjects = [];

let colour;

// 2. Load data and show everything to start
async function init() {
    try {
        const response = await fetch('./data/projects.json');
        allProjects = await response.json();

        const featured_response = await fetch('./data/featured_projects.json');
        featuredProjects = await featured_response.json();
        renderFeaturedProjects();

        renderProjects('all'); // Initialize showing all
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function renderProjects(filterTag) {
    container.innerHTML = "";

    // 1. Map tags to your CSS variable names
    const colorMap = {
        'Software': 'var(--avery)',
        'Firmware': 'var(--mango)',
        'Hardware': 'var(--tangerine)',
        'FPGA':     'var(--tango-pink)',
        'all':      'var(--white)' // Default color
    };

    // 2. Pick the color based on the tag (default to white if not found)
    const cardColor = colorMap[filterTag] || 'var(--white)';

    const filtered = filterTag === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.tag.includes(filterTag));

    // 3. Apply the color to the border or text
    filtered.forEach(project => {
        container.innerHTML += `
            <div class="card" style="border-top: 4px solid ${cardColor}">
              <div class="card-text">
                <h3 style="color: ${cardColor}">${project.title}</h3>
              </div>
            </div>
        `;
    });
}

function renderFeaturedProjects() {
    // Clear the container first
    featured_container.innerHTML = "";

    // Build the HTML cards
    featuredProjects.forEach(project => {
        featured_container.innerHTML += `
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