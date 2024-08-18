document.getElementById('openButton').addEventListener('click', function() {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('invitation').classList.remove('hidden');
});

// Scroll show photo effect
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('show');
        }
    });
});
