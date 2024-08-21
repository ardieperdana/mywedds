document.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('fullscreen-overlay');
    document.body.appendChild(overlay);

    const closeButton = document.createElement('div');
    closeButton.classList.add('close-btn');
    closeButton.textContent = '×';
    overlay.appendChild(closeButton);

    // Klik pada gambar untuk memperbesar
    document.querySelectorAll('.owl-item img').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.src; // Gunakan gambar yang sama
            overlay.innerHTML = `
                <div class="close-btn">×</div>
                <img src="${src}" alt="${img.alt}">
            `;
            overlay.style.display = 'flex';
        });
    });

    // Klik pada overlay untuk menutup
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeButton) {
            overlay.style.display = 'none';
        }
    });
});


