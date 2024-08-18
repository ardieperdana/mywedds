let currentSlide = 0;

function openInvitation() {
    document.querySelector('.open-button').style.display = 'none';
    document.querySelector('.invitation-content').classList.remove('hidden');
    startSlideshow();
}

function startSlideshow() {
    const slides = document.querySelectorAll('.slideshow-container img');
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = 1;
    setTimeout(startSlideshow, 3000); // 3 detik untuk tiap slide
}

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const photos = document.querySelector('.slideshow-container');
    if (scrollPosition > photos.offsetTop - window.innerHeight + 200) {
        photos.style.opacity = 1;
    } else {
        photos.style.opacity = 0;
    }
});
