// main.js - Core functionality for Tactile Studio (Dark Mode & i18n)

const translations = {
    "id": {
        "nav_home": "Home",
        "nav_shop": "Shop",
        "nav_costume": "Custome",
        "nav_desain": "Desain",
        "nav_cart": "Keranjang",
        "nav_admin": "Admin",
        "hero_title": "Feel Every Keystroke.",
        "hero_desc": "Tactile Studio menghadirkan keyboard mekanikal kustom yang dirakit dengan presisi. Tingkatkan produktivitas Anda dengan pengalaman mengetik terbaik.",
        "btn_explore": "Jelajahi Koleksi",
        "btn_costume": "Rakit Sendiri",
        "profile_title": "Tentang Tactile Studio",
        "profile_desc": "Kami percaya bahwa keyboard bukan sekadar alat, melainkan perpanjangan dari diri Anda. Setiap produk dirakit dengan ketelitian tinggi.",
        "bestsellers_title": "Best Sellers",
        "reviews_title": "Apa Kata Mereka?",
        "footer_desc": "Membawa pengalaman mengetik Anda ke tingkat selanjutnya.",
        "shop_title": "Katalog Produk",
        "shop_add_cart": "🛒 Masukkan Keranjang",
        "cart_title": "Keranjang Belanja",
        "cart_empty": "Keranjang Anda Kosong",
        "cart_subtotal": "Subtotal",
        "cart_total": "Total",
        "cart_checkout": "Pesan Sekarang"
    },
    "en": {
        "nav_home": "Home",
        "nav_shop": "Shop",
        "nav_costume": "Custom",
        "nav_desain": "Designs",
        "nav_cart": "Cart",
        "nav_admin": "Admin",
        "hero_title": "Feel Every Keystroke.",
        "hero_desc": "Tactile Studio presents custom mechanical keyboards assembled with precision. Elevate your productivity with the ultimate typing experience.",
        "btn_explore": "Explore Collection",
        "btn_costume": "Build Your Own",
        "profile_title": "About Tactile Studio",
        "profile_desc": "We believe a keyboard is not just a tool, but an extension of yourself. Each product is assembled with utmost precision.",
        "bestsellers_title": "Best Sellers",
        "reviews_title": "What They Say?",
        "footer_desc": "Taking your typing experience to the next level.",
        "shop_title": "Product Catalog",
        "shop_add_cart": "🛒 Add to Cart",
        "cart_title": "Shopping Cart",
        "cart_empty": "Your Cart is Empty",
        "cart_subtotal": "Subtotal",
        "cart_total": "Total",
        "cart_checkout": "Checkout Now"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // === DARK MODE LOGIC ===
    const body = document.body;
    
    // Create toggle buttons if they don't exist in a container
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !document.getElementById('themeToggle')) {
        const liTheme = document.createElement('li');
        liTheme.innerHTML = `<button id="themeToggle" class="icon-btn">🌙</button>`;
        const liLang = document.createElement('li');
        liLang.innerHTML = `<button id="langToggle" class="icon-btn">🇬🇧 EN</button>`;
        
        navLinks.appendChild(liTheme);
        navLinks.appendChild(liLang);
    }

    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');

    // Load Theme
    let currentTheme = localStorage.getItem('tactileTheme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if(themeToggle) themeToggle.innerText = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('tactileTheme', 'dark');
                themeToggle.innerText = '☀️';
            } else {
                localStorage.setItem('tactileTheme', 'light');
                themeToggle.innerText = '🌙';
            }
        });
    }

    // === LANGUAGE LOGIC ===
    let currentLang = localStorage.getItem('tactileLang') || 'id';
    
    function applyTranslation(lang) {
        if(langToggle) langToggle.innerText = lang === 'id' ? '🇬🇧 EN' : '🇮🇩 ID';
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Keep original inner HTML structure if it has icons, but simple replace for now
                if(el.innerHTML.includes('🛒')) {
                    el.innerHTML = '🛒 ' + translations[lang][key].replace('🛒 ', '');
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });
    }

    applyTranslation(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'id' ? 'en' : 'id';
            localStorage.setItem('tactileLang', currentLang);
            applyTranslation(currentLang);
        });
    }
});
