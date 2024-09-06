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


function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to greet user
function greetUser(name) {
    name = name.replaceAll('-',' ')
    return `${name}`;
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening berhasil disalin: ' + text);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}

$(function(){
    const dataTranslate = {
        'id' : 'index.html',
        'ar' : 'index-ar.html',
        'en' : 'index-en.html',
    }

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:4,
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        smartSpeed: 5000,
        rewind: false
    });
    $('nav').css('filter','invert(1)')
    $(window).scroll(function(){
        $('nav').css('filter','invert(1)')
        if ($(window).scrollTop() > 900) {
            $('nav').css('filter','invert(0)')
        }
    })

    $('#translate').change(function(e){
        const value = $(this).val()
        if (dataTranslate.hasOwnProperty(value)) {
            window.location.href = dataTranslate[value]
        }
    })

    const name = getQueryParameter('QQ');
    const closeFriend = getQueryParameter('close')
    $('.guest-flex').hide()
    if (name) {
        const greetingMessage = greetUser(name)
        $('.guest-flex').show()
        $('.guest-name').text(greetingMessage)
    }

    if (closeFriend) {
        $('.surprize').removeClass('hidden')
    }

    $('.label .item').click(function(e){
        const name = $(this).data('name')
        $('.label .item').removeClass('active')
        $(this).toggleClass('active')
        if (name == 'bank') {
            $('.info .bank').show()
            $('.info .qris').hide()
        }else{
            $('.info .bank').hide()
            $('.info .qris').show()

        }
    })

    $('.fa-copy').tooltip()

    $('.fa-copy').click(function(e){
        navigator.clipboard.writeText($(this).data('num'))
        $(this).attr('data-bs-original-title', 'Copied');
        $(this).tooltip('show')
    })

    $("#btn-open").click(function(e){
        $('.img-overlay').fadeOut('fast');
        $('.content-body').fadeIn('slow');
    })
})