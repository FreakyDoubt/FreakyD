// Falling Hearts
function createFallingHearts() {
    const container = document.getElementById('falling-hearts');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

// Carousel data (ganti kata & gambar)
const carouselData = [
    { img: "love-image.png", msg: "Cantik ❤️" },
    { img: "love-image-2.png", msg: "Comel ☀️" },
    { img: "love-image-3.png", msg: "Lucu 💘" }
];

let currentIndex = 0;

function updateCarousel(index) {
    if (index === currentIndex) return;

    const image = document.getElementById('carousel-image');
    const message = document.getElementById('carousel-message');

    // Fade out
    image.classList.add('fade-out');
    message.classList.add('fade-out');

    setTimeout(() => {
        currentIndex = index;
        image.src = carouselData[index].img;
        message.textContent = carouselData[index].msg;

        // Fade in
        image.classList.remove('fade-out');
        message.classList.remove('fade-out');
        image.classList.add('fade-in');
        message.classList.add('fade-in');

        setTimeout(() => {
            image.classList.remove('fade-in');
            message.classList.remove('fade-in');
        }, 400);
    }, 400);

    // Update button states
    document.querySelectorAll('.carousel-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// Date and Time
function updateDateTime() {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = timeStr;
}

// Splash Effect
function createSplash(x, y, emoji) {
    const splash = document.createElement('div');
    splash.className = 'splash';
    splash.textContent = emoji;
    splash.style.left = x + 'px';
    splash.style.top = y + 'px';
    document.body.appendChild(splash);
    
    setTimeout(() => splash.remove(), 600);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();

    const audio = document.getElementById('bg-music');
    const landing = document.getElementById('landing-screen');
    const main = document.getElementById('main-content');

    // Continue button
    document.getElementById('continue-btn').addEventListener('click', () => {
        landing.classList.add('fade-out');
        setTimeout(() => {
            landing.style.display = 'none';
            main.style.display = 'flex';
            main.classList.add('fade-in');
            audio.play().catch(() => console.log("Audio autoplay diblokir, klik dulu layar."));
            updateDateTime();
            setInterval(updateDateTime, 1000);
        }, 500);
    });

    // Carousel buttons
    document.querySelectorAll('.carousel-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => updateCarousel(index));
    });

    // Decorative hearts click effect
    document.querySelectorAll('.decorative-hearts span').forEach((heart) => {
        heart.addEventListener('click', (e) => {
            createSplash(e.clientX, e.clientY, heart.textContent);
        });
    });
});
