// Kode untuk memutar musik
document.addEventListener('DOMContentLoaded', (event) => {
    const backgroundMusic = document.getElementById('background-music');
    const envelope = document.getElementById('envelope');

    // BARIS BARU: Atur volume ke 30%
    backgroundMusic.volume = 0.3;

    // Mulai musik saat amplop diklik
    envelope.addEventListener('click', () => {
        backgroundMusic.play();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- AMBIL SEMUA ELEMEN YANG DIBUTUHKAN ---
    const cardContainer = document.querySelector('.card-container');
    const seal = document.getElementById('seal');
    const envelope = document.getElementById('envelope');
    const pinPage = document.getElementById('pinPage');
    const letterPage = document.getElementById('letterPage');
    const memoryPage = document.getElementById('memoryPage');
    const finalLetterPage = document.getElementById('finalLetterPage');
    const photoPage = document.getElementById('photoPage'); // Halaman baru

    // Pop-up dan tombol
    const wrongPinPopup = document.getElementById('wrongPinPopup');
    const closePopupButton = document.getElementById('closePopupButton');
    const emptyPinPopup = document.getElementById('emptyPinPopup');
    const closeEmptyPopupButton = document.getElementById('closeEmptyPopupButton');
    
    // PIN
    const pinInputs = document.querySelectorAll('.pin-input');
    const pinButton = document.getElementById('pinButton');
    const correctPin = "161005";

    // Tombol Navigasi Antar Halaman
    const continueButton = document.getElementById('continueButton');
    const memoryBackButton = document.getElementById('memoryBackButton');
    const memoryNextButton = document.getElementById('memoryNextButton');
    const finalLetterBackButton = document.getElementById('finalLetterBackButton');
    const finalLetterNextButton = document.getElementById('finalLetterNextButton');
    const photoBackButton = document.getElementById('photoBackButton'); // Tombol baru
    const finishButton = document.getElementById('finishButton'); // Tombol baru


    // --- FUNGSI UTAMA UNTUK PENSKALAAN KARTU ---
    function scaleCardContainer() {
        if (!cardContainer) return;
        const baseWidth = 380; const baseHeight = 600;
        const windowWidth = window.innerWidth; const windowHeight = window.innerHeight;
        const scaleX = windowWidth / baseWidth; const scaleY = windowHeight / baseHeight;
        const scale = Math.min(scaleX, scaleY) * 0.95;
        cardContainer.style.transform = `scale(${scale})`;
    }

    scaleCardContainer();
    window.addEventListener('resize', scaleCardContainer);

    // --- EVENT SAAT SEGEL DIKLIK ---
    seal.addEventListener('click', function() {
        envelope.classList.add('opening');
        setTimeout(function() {
            envelope.style.display = 'none';
            pinPage.classList.add('visible');
            pinInputs[0].focus();
        }, 1000);
    });

    // --- FUNGSI UNTUK PIN INPUT AGAR OTOMATIS PINDAH ---
    pinInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/g, '');
            if (input.value.length === 1 && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                pinInputs[index - 1].focus();
            }
        });
    });

    // --- EVENT SAAT TOMBOL "MASUK" PADA HALAMAN PIN DIKLIK ---
    pinButton.addEventListener('click', function() {
        let enteredPin = Array.from(pinInputs).map(input => input.value).join('');

        if (enteredPin === "") {
            emptyPinPopup.classList.add('visible');
        } else if (enteredPin === correctPin) {
            pinPage.classList.remove('visible');
            setTimeout(() => {
                letterPage.classList.add('visible');
            }, 500);
        } else {
            wrongPinPopup.classList.add('visible'); 
            pinInputs.forEach(input => input.value = '');
        }
    });

    // --- EVENT UNTUK TOMBOL "COBA LAGI" & "OKE" DI POP-UP ---
    closePopupButton.addEventListener('click', function() {
        wrongPinPopup.classList.remove('visible');
        pinInputs[0].focus();
    });
    closeEmptyPopupButton.addEventListener('click', function() {
        emptyPinPopup.classList.remove('visible');
        pinInputs[0].focus();
    });

    // --- LOGIKA NAVIGASI ANTAR HALAMAN ---
    
    // Halaman Surat -> Halaman Memory
    continueButton.addEventListener('click', function() {
        letterPage.classList.remove('visible');
        memoryPage.classList.add('visible');
    });

    // Halaman Memory -> Halaman Surat (Kembali)
    memoryBackButton.addEventListener('click', function() {
        memoryPage.classList.remove('visible');
        letterPage.classList.add('visible');
    });

    // Halaman Memory -> Halaman Pesan Utama
    memoryNextButton.addEventListener('click', function() {
        memoryPage.classList.remove('visible');
        favoriteMemoryPage.classList.add('visible');
    });

    favoriteMemoryBackButton.addEventListener('click', function() {
        favoriteMemoryPage.classList.remove('visible');
        memoryPage.classList.add('visible');
    });

    favoriteMemoryNextButton.addEventListener('click', function() {
        favoriteMemoryPage.classList.remove('visible');
        finalLetterPage.classList.add('visible');
    });


    // Halaman Pesan Utama -> Halaman Memory (Kembali)
    finalLetterBackButton.addEventListener('click', function() {
        finalLetterPage.classList.remove('visible');
        memoryPage.classList.add('visible');
    });

    // Halaman Pesan Utama -> Halaman Foto
    finalLetterNextButton.addEventListener('click', function() {
        finalLetterPage.classList.remove('visible');
        photoPage.classList.add('visible');
    });

    // Halaman Foto -> Halaman Pesan Utama (Kembali)
    photoBackButton.addEventListener('click', function() {
        photoPage.classList.remove('visible');
        finalLetterPage.classList.add('visible');
    });

    // Tombol "Kirim Pesan" di halaman terakhir
    finishButton.addEventListener('click', function() {
        // --- PENTING: GANTI NOMOR DAN PESAN DI BAWAH INI ---

        // 1. Ganti dengan nomor WhatsApp tujuan (gunakan format 62, bukan 0)
        const phoneNumber = "6287724310996"; 

        // 2. Tulis pesan yang Anda inginkan di sini
        const message = `Hai! Jadwak`;

        // Mengubah pesan menjadi format URL yang aman
        const encodedMessage = encodeURIComponent(message);

        // Membuat link WhatsApp
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Membuka link di tab baru
        window.open(whatsappURL, '_blank');
    });
});