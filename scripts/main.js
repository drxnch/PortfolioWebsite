// 1. Select the main container once
const container = document.getElementById('portfolio-container');
const featured_container = document.getElementById('featured-projects-container');
const beyondWorkContainer = document.getElementById('beyond-work-container');
let allProjects = [];
let featuredProjects = [];
let filteredProjects = [];
let beyondWorkInfo = [];
let activeIndex = 0;
let isAnimating = false;

// 2. Load data and show everything to start
async function init() {
    try {
        const response = await fetch('./data/projects.json');
        allProjects = await response.json();
        const featured_response = await fetch('./data/featured_projects.json');
        featuredProjects = await featured_response.json();
        const beyondWorkResponse = await fetch('./data/beyond_work.json');
        beyondWorkInfo = await beyondWorkResponse.json();
        
        renderFeaturedProjects();
        renderProjects('all');
        renderBeyondWorkCards();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

// 3. Color map
const colorMap = {
    'Software': 'var(--avery)',
    'Firmware': 'var(--mango)',
    'Hardware': 'var(--tangerine)',
    'FPGA':     'var(--tango-pink)',
    'all':      'var(--white)'
};

function renderProjects(filterTag) {
    activeIndex = 0;

    filteredProjects = filterTag === 'all'
        ? allProjects
        : allProjects.filter(p => p.tag.includes(filterTag));

    const cardColor = colorMap[filterTag] || 'var(--white)';

    // Build the carousel structure
    container.innerHTML = `
        <div class="carousel-wrapper">
            <button class="carousel-btn left-btn" id="prevBtn">&#8592;</button>
            <div class="carousel-track" id="carouselTrack"></div>
            <button class="carousel-btn right-btn" id="nextBtn">&#8594;</button>
        </div>
    `;

    renderVisible(cardColor);

    document.getElementById('prevBtn').addEventListener('click', () => navigate(-1, cardColor));
    document.getElementById('nextBtn').addEventListener('click', () => navigate(1, cardColor));
}

function getWrappedIndex(index) {
    const len = filteredProjects.length;
    return ((index % len) + len) % len;
}

function renderVisible(cardColor) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    // Get left, center, right indices with wrapping
    const leftIndex  = getWrappedIndex(activeIndex - 1);
    const centerIndex = getWrappedIndex(activeIndex);
    const rightIndex = getWrappedIndex(activeIndex + 1);

    const slots = [
        { project: filteredProjects[leftIndex],   role: 'side' },
        { project: filteredProjects[centerIndex], role: 'center' },
        { project: filteredProjects[rightIndex],  role: 'side' },
    ];

    track.innerHTML = slots.map(({ project, role }) => `
        <div class="card-slot ${role}" data-id="${project.id}" style="border-top: 4px solid ${cardColor}">
            <div class="card-text">
                <h3 style="color: ${cardColor}">${project.title}</h3>
                <p class="card-year">${project.year}</p>
                <div class="card-tags">
                    ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function navigate(direction, cardColor) {
    if (isAnimating) return;
    isAnimating = true;

    activeIndex = getWrappedIndex(activeIndex + direction);
    renderVisible(cardColor);

    setTimeout(() => { isAnimating = false; }, 300);
}

function renderFeaturedProjects() {
    featured_container.innerHTML = "";
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

function renderBeyondWorkCards() {
    beyondWorkContainer.innerHTML = "";
    beyondWorkInfo.forEach(hobby => {beyondWorkContainer.innerHTML += `
            
            <div class="card">
              <div class="card-text">
                <h3>${hobby.title}</h3>
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
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.getElementById("menu-background").classList.toggle("hidden");
});

init();