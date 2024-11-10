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

document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("December 22, 2024 09:00:00").getTime();

    // Membuat elemen countdown
    const countdownElem = document.getElementById("countdown");

    // Inisialisasi FlipClock
    const clock = $(countdownElem).FlipClock(0, {
        clockFace: 'DailyCounter',
        countdown: true
    });

    // Mengupdate countdown setiap detik
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mengupdate flip clock dengan nilai baru
        clock.setValue(`${days}:${hours}:${minutes}:${seconds}`);

        // Jika countdown selesai
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Waktu Telah Tiba!";
        }
    }, 1000);
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
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.src; // Gunakan gambar yang sama
            overlay.style.display = 'flex';
            overlay.innerHTML = `
                <div class="close-btn">×</div>
                <img src="${src}" alt="${img.alt}">
            `;
        });
    });

    // Klik pada overlay untuk menutup
    overlay.addEventListener('click', (e) => {
        if (closeButton.class == e.target.class) {
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

const resizeNav = () =>{
    const viewportWidth = window.innerWidth
    const contentBodyWidth = $('.content-body').outerWidth()
    const navWidth = $('nav.top-navbar').outerWidth()
    const primaryPaneWidth = $('.primary-pane .pane').outerWidth() 
    if (navWidth > contentBodyWidth) {
        const newMaxwidth = parseInt(viewportWidth - primaryPaneWidth);
        $('nav.top-navbar').css('max-width', newMaxwidth)
    }
}

$(function(){
    console.log('SAAT INI BAHASA',window.lang)
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

    $('#translate').change(function(e){
        const value = $(this).val()
        let suffixData = ''
        if (name) {
            suffixData = `QQ=${encodeURIComponent(name)}`;
        }

        if (closeFriend) {
            if (suffixData != '') suffixData += '&';
            suffixData += `close=${closeFriend}`
        }
        
        if (dataTranslate.hasOwnProperty(value)) {
            let redirectUrl = dataTranslate[value]

            if (suffixData != '') {
                redirectUrl = `${redirectUrl}?${suffixData}`
            }
            window.location.href = redirectUrl
        }
    })

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
        $('audio').trigger('play');
        resizeNav()
    })

    $('#music').click(function(e){
        $(this).toggleClass('play')
        $(this).toggleClass('mute')

        if ($(this).hasClass('play')) {
            $('audio').trigger('play')
            $(this).attr('src','media/sound.png')
            $('audio').prop('muted', false)
        }else{
            $('audio').prop('muted', true)
            $(this).attr('src','media/sound-mute.png')
        }
    })
})