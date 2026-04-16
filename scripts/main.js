// 1. Constants & config
const container = document.getElementById('portfolio-container');
const featured_container = document.getElementById('featured-projects-container');
const beyondWorkContainer = document.getElementById('beyond-work-container');
const heroSection = document.getElementById('hero-section');
const colorMap = {
    'Software': 'var(--avery)',
    'Firmware': 'var(--mango)',
    'Hardware': 'var(--tangerine)',
    'FPGA': 'var(--tango-pink)',
    'all': 'var(--white)'
};

// 2. State
let allProjects = [];
let featuredProjects = [];
let filteredProjects = [];
let beyondWorkInfo = [];
let activeIndex = 0;
let isAnimating = false;

// 3. Functions (pure logic, no DOM stuff)

function getWrappedIndex(index) {
    const len = filteredProjects.length;
    return ((index % len) + len) % len;
}

function navigate(direction, cardColor) {
    if (isAnimating) return;
    isAnimating = true;

    activeIndex = getWrappedIndex(activeIndex + direction);
    renderVisible(cardColor);

    setTimeout(() => { isAnimating = false; }, 300);
}

// 4. DOM functions (reading/updating the page)

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

function renderVisible(cardColor) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    // Get left, center, right indices with wrapping
    const leftIndex = getWrappedIndex(activeIndex - 1);
    const centerIndex = getWrappedIndex(activeIndex);
    const rightIndex = getWrappedIndex(activeIndex + 1);

    const slots = [
        { project: filteredProjects[leftIndex], role: 'side' },
        { project: filteredProjects[centerIndex], role: 'center' },
        { project: filteredProjects[rightIndex], role: 'side' },
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
    beyondWorkInfo.forEach(hobby => {
        beyondWorkContainer.innerHTML += `
            
            <div class="card">
              <div class="card-text">
                <h3>${hobby.title}</h3>
              </div>
            </div>
        `;
    });
}

function renderHeroTop() {
    if (window.innerWidth < 768) { // Mobile
        heroSection.innerHTML = `
        <div id="hero-container">
        <div id="hero-top">
            <div id="hero-title">Hi. I'm Deven</div>
        </div>
        <div id="hero-bottom">
            <h1>I am a <b style="color: var(--blue)">Computer Engineer.</b></h1> <br/>
            <h2>
            That means that I like to solve problems and think outside of the box.
            </h2> <br />
            <h2>
                This is a place for you to view any work I've done. <br />
                <b style="color: var(--avery)">Enjoy!</b>
            </h2>
        </div>
        <div id="hero-footer">Find out more below</div>
        </div>
    `;
    } else { // Desktop
        heroSection.innerHTML = `
        <div class="hero-container">
    <div class="hero-bg-image"></div>
    
    <div class="hero-content">
            <h1 id="hero-title">Hi. I'm Deven</h1>
        <div class="hero-bottom" style="padding:2rem; max-width:50%;">
            <h1>I am a <b style="color: var(--blue)">Computer Engineer.</b></h1>
            <br />
            <h2>That means that I like to solve problems and think outside of the box.</h2> 
            <br />
            <h2>
                This is a place for you to view any work I've done. <br />
                <b style="color: var(--avery)">Enjoy!</b>
            </h2>
        </div>
    </div>
</div>
      `;
    }
}

// 5. Event handlers



// 6. Event listeners

document.getElementById("softwareProjectButton").addEventListener("click", () => renderProjects("Software"));
document.getElementById("firmwareProjectButton").addEventListener("click", () => renderProjects("Firmware"));
document.getElementById("hardwareProjectButton").addEventListener("click", () => renderProjects("Hardware"));
document.getElementById("fpgaProjectButton").addEventListener("click", () => renderProjects("FPGA"));
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.getElementById("menu-background").classList.toggle("hidden");
});

// 7. Init (runs on load)
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
        renderHeroTop();
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

init();