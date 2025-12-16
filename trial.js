// trial.js

// --- 1. HERO ANIMATION FUNCTION ---
// We wrap this in a function so we can call it ONLY after the preloader is done.
function startCelebration() {
    const tl = gsap.timeline();

    tl.to(".main-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)" 
    })
    .to(".sub-text", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: -0.8
    })
    .to(".name-highlight", {
        color: "#ff8fab", 
        webkitTextStroke: "0px",
        duration: 0.5
    })
    .to(".decor-item", {
        opacity: 0.8, 
        scale: 1,
        duration: 1.5,
        stagger: 0.2, 
        ease: "power2.out"
    }, "-=0.5")
    .to(".scroll-instruction", {
        opacity: 1,
        duration: 1,
        y: 10,
        yoyo: true,
        repeat: -1 
    });
}

// --- 2. BACKGROUND & SCROLL LOGIC ---
// These can run immediately as they don't depend on the preloader timing
document.addEventListener("DOMContentLoaded", () => {
    
    // Background Photo Loop
    const photos = document.querySelectorAll('.photo');
    let index = 0;

    function switchPhoto() {
        if(photos.length > 0) {
            photos[index].classList.remove('active');
            index = (index + 1) % photos.length;
            photos[index].classList.add('active');
        }
    }
    setInterval(switchPhoto, 4000); 

    // Scroll Reveal (Gallery Section)
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".message-line", {
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 60%", 
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3, 
        ease: "power3.out"
    });
});

// --- 3. GAME LOGIC & REDIRECTION ---
// This handles the walking and then switching to the new pages.

function movePanda(zoneId, message, type) {
    const panda = document.getElementById('panda');
    const speech = document.getElementById('panda-speech');
    
    // Coordinates for where the Panda walks to
    const positions = {
        'secret': { top: '73%', left: '10%' }, 
        'mall':   { top: '42%', left: '71%' }, 
        'rest':   { top: '43%', left: '28%' }, 
        'cinema': { top: '18%', left: '33%' }, 
        'disco':  { top: '33%', left: '56%' }  
    };

    const target = positions[zoneId];

    if (target && panda) {
        // A. Move the Panda
        panda.style.top = target.top;
        panda.style.left = target.left;
        
        // B. Show Speech Bubble
        if (speech) {
            speech.innerText = message;
            panda.classList.add('talking');

            // C. Wait 1.5s for walk animation, then REDIRECT
            setTimeout(() => {
                panda.classList.remove('talking');
                
                // MAPPING ZONES TO HTML FILES
                const pageMap = {
                    'letter': 'secret.html',   
                    'gifts':  'gifts.html',
                    'food':   'food.html',
                    'gallery': 'movie.html',  
                    'music':  'songs.html'
                };

                if (pageMap[type]) {
                    window.location.href = pageMap[type];
                } else {
                    console.error("Page not found for type: " + type);
                }

            }, 1500);
        }
    }
}