
const siteConfig = {
    aboutImagesCount: 8, 
    placesImagesCount: 17, 
    
    hobbies: [
        { file: 'hobbies_1.jpg', title: 'Arduino' },
        { file: 'hobbies_2.jpg', title: 'Kickbox' },
        { file: 'hobbies_3.jpg', title: 'Competitions' },
        { file: 'hobbies_4.jpg', title: 'Puzzles' },
        { file: 'hobbies_5.jpg', title: 'Trying New Foods' },
        { file: 'hobbies_6.jpg', title: 'Watching' },
        { file: 'hobbies_7.jpg', title: 'Games' },
        { file: 'hobbies_8.jpg', title: 'Travelling' },
        { file: 'hobbies_9.jpg', title: 'Cooking' },
        { file: 'hobbies_10.jpg', title: 'Having a pet' },
        { file: 'hobbies_11.jpg', title: 'Hardware & Software' }
    ]
};

const nav = document.getElementById('pageNav');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const projectCards = document.querySelectorAll('.project-mini-card');
const welcomeImage = document.querySelector('.about-hero-image');


const knockAudio = new Audio('assets/sounds/knock.mp3');
const buyAudio = new Audio('assets/sounds/buy.mp3');
const whooshAudio = new Audio('assets/sounds/whoosh.mp3');
const backgroundAudio = new Audio('assets/sounds/waves.mp3');

knockAudio.volume = 0.5;
buyAudio.volume = 0.15;
whooshAudio.volume = 0.15;
backgroundAudio.volume = 0; 
backgroundAudio.loop = true;

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  
  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    nav.classList.add('nav-hidden');
  } else if (currentScrollY < lastScrollY) {
    nav.classList.remove('nav-hidden');
  }

  if (welcomeImage) {
    const offset = Math.max(-120, Math.min(0, currentScrollY * -0.14));
    welcomeImage.style.transform = `translateY(${offset}px)`;
  }

  lastScrollY = currentScrollY;
});




const aboutSlider = document.getElementById('about-slider');
if (aboutSlider) {
    
    let aboutIndices = Array.from({length: siteConfig.aboutImagesCount}, (_, i) => i + 1);
    for (let i = aboutIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [aboutIndices[i], aboutIndices[j]] = [aboutIndices[j], aboutIndices[i]];
    }

    aboutIndices.forEach((num, index) => {
        let img = document.createElement('img');
        img.src = `assets/images/about/about_${num}.jpg`;
        img.className = (index === 0) ? 'slide active' : 'slide';
        img.alt = `About Me ${num}`;
        aboutSlider.appendChild(img);
    });

    const aboutSlides = document.querySelectorAll('#about-slider .slide');
    let currentSlide = 0;
    let sliderInterval;

    function startSlider() {
        if (aboutSlides.length > 1) {
            sliderInterval = setInterval(() => {
                aboutSlides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % aboutSlides.length;
                aboutSlides[currentSlide].classList.add('active');
            }, 2000); 
        }
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    startSlider();
    aboutSlider.addEventListener('mouseenter', stopSlider);
    aboutSlider.addEventListener('mouseleave', startSlider);
}


const hobbiesGallery = document.getElementById('hobbies-gallery');
if (hobbiesGallery) {
    let shuffledHobbies = [...siteConfig.hobbies];
    
    
    for (let i = shuffledHobbies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledHobbies[i], shuffledHobbies[j]] = [shuffledHobbies[j], shuffledHobbies[i]];
    }

    shuffledHobbies.forEach(hobby => {
        let item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="assets/images/hobbies/${hobby.file}" alt="${hobby.title}">
            <div class="gallery-overlay"><h3>${hobby.title}</h3></div>
        `;
        hobbiesGallery.appendChild(item);
    });
}


const placesMarquee = document.getElementById('places-marquee');
if (placesMarquee) {
    
    let placesIndices = Array.from({length: siteConfig.placesImagesCount}, (_, i) => i + 1);
    for (let i = placesIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [placesIndices[i], placesIndices[j]] = [placesIndices[j], placesIndices[i]];
    }

    let trackHTML = '<div class="marquee-track">';
    placesIndices.forEach(num => {
        trackHTML += `<img src="assets/images/places/places_${num}.jpg" alt="Place ${num}">`;
    });
    trackHTML += '</div>';
    
    
    placesMarquee.innerHTML = trackHTML + trackHTML;
}



const doorBtn = document.getElementById('door-btn');
const navControls = document.querySelector('.nav-controls');
const doorInputContainer = document.getElementById('door-input-container');
const doorInputWrapper = document.querySelector('.glass-input-wrapper');
const doorInput = document.getElementById('door-input');
const doorError = document.getElementById('door-error');

let isDoorOpen = false;
let isDoorLocked = false; 
let doorInactivityTimer = null;


function closeDoorInactivity() {
    if (!isDoorOpen || isDoorLocked) return;
    
    doorInputContainer.classList.remove('visible');
    isDoorOpen = false;
    
    
    setTimeout(() => {
        if (!isDoorOpen) {
            doorInputContainer.classList.add('hidden');
            doorInput.value = '';
        }
    }, 500); 
}


function resetDoorTimer() {
    if (doorInactivityTimer) clearTimeout(doorInactivityTimer);
    if (isDoorOpen && !isDoorLocked) {
        doorInactivityTimer = setTimeout(closeDoorInactivity, 10000);
    }
}

if (doorBtn) {
    doorBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (isDoorOpen || isDoorLocked) return;

        isDoorLocked = true; 
        knockAudio.play().catch(()=>{});

        setTimeout(() => {
            doorInputContainer.classList.remove('hidden');
            void doorInputContainer.offsetWidth; 
            
            doorInputContainer.classList.add('visible');
            doorInput.focus();
            isDoorOpen = true;
            isDoorLocked = false; 
            
            resetDoorTimer(); 
        }, 1000);
    });
}

if (doorInput) {
    
    doorInput.addEventListener('input', resetDoorTimer);

    doorInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = doorInput.value.trim().toLowerCase();
            
            if (val === 'fishing') {
                if (doorInactivityTimer) clearTimeout(doorInactivityTimer);
                goFishing();
            } else if (val === 'restricted') {
                if (doorInactivityTimer) clearTimeout(doorInactivityTimer);
                goRestricted();
            } else {
                isDoorLocked = true; 
                if (doorInactivityTimer) clearTimeout(doorInactivityTimer); 
                
                doorInputWrapper.classList.add('hidden');
                doorError.classList.remove('hidden');

                setTimeout(() => {
                    doorError.classList.add('hidden');
                    doorInputWrapper.classList.remove('hidden');
                    
                    
                    doorInputContainer.classList.remove('visible');
                    
                    setTimeout(() => {
                        doorInputContainer.classList.add('hidden');
                        doorInput.value = '';
                        isDoorOpen = false;
                        isDoorLocked = false; 
                    }, 500);
                    
                }, 2000);
            }
        }
    });
}

let fadeInterval;

function fadeAudioIn() {
    clearInterval(fadeInterval);
    backgroundAudio.play().catch(()=>{});
    
    fadeInterval = setInterval(() => {
        if (backgroundAudio.volume < 0.05) { 
            backgroundAudio.volume = Math.min(0.05, backgroundAudio.volume + 0.005);
        } else {
            clearInterval(fadeInterval);
        }
    }, 100);
}

function fadeAudioOut() {
    clearInterval(fadeInterval);
    
    fadeInterval = setInterval(() => {
        if (backgroundAudio.volume > 0) {
            backgroundAudio.volume = Math.max(0, backgroundAudio.volume - 0.01);
        } else {
            clearInterval(fadeInterval);
            backgroundAudio.pause();
        }
    }, 100);
}



function goFishing() {
    buyAudio.play().catch(()=>{});
    fadeAudioOut();
    
    if (navControls) {
        navControls.style.opacity = '0';
    }

    if (waterLine) waterLine.classList.remove('show-water');
    if (secretBoat) secretBoat.classList.remove('show-boat');

    document.body.classList.add('slide-down-active');

    setTimeout(() => {
        window.location.href = "/fishing";
    }, 1500);
}

function goRestricted() {
    whooshAudio.play().catch(()=>{});
    fadeAudioOut();
    
    if (navControls) {
        navControls.style.opacity = '0';
    }

    
    if (waterLine) waterLine.classList.remove('show-water');
    if (secretBoat) secretBoat.classList.remove('show-boat');

    document.body.classList.add('slide-up-active');
    document.body.classList.add('enter-veil-active');

    setTimeout(() => {
        window.location.href = "/restricted";
    }, 1500);
}



const waterLine = document.getElementById('water-line');
const secretBoat = document.getElementById('secret-boat');
let topTimer = null;
let isSeaVisible = false;

function handleTopTimer() {
    if (window.scrollY === 0) {
        if (!isSeaVisible && topTimer === null) {
            topTimer = setTimeout(() => {
                
                waterLine.classList.add('show-water');
                
                setTimeout(() => {
                    secretBoat.classList.add('show-boat');
                    isSeaVisible = true;
                    fadeAudioIn(); 
                }, 500);
                
            }, 5000); 
        }
    } else {
        if (topTimer !== null) {
            clearTimeout(topTimer);
            topTimer = null;
        }
        
        if (isSeaVisible) {
            waterLine.classList.remove('show-water');
            secretBoat.classList.remove('show-boat');
            isSeaVisible = false;
            fadeAudioOut(); 
        }
    }
}

window.addEventListener('scroll', handleTopTimer);
window.addEventListener('load', handleTopTimer);

if (secretBoat) {
    secretBoat.addEventListener('click', goFishing);
}


const footerText = document.querySelector('.site-footer p');
let bottomTimer = null;
let isHintVisible = false;

function handleBottomTimer() {
    
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20;

    if (isAtBottom) {
        if (!isHintVisible && bottomTimer === null) {
            bottomTimer = setTimeout(() => {
                footerText.style.opacity = '0'; 
                
                setTimeout(() => {
                    footerText.innerText = "Click the button and come back here 3 times. Be fast.";
                    footerText.style.opacity = '1'; 
                    isHintVisible = true;
                }, 400); 
                
            }, 5000); 
        }
    } else {
        if (bottomTimer !== null) {
            clearTimeout(bottomTimer);
            bottomTimer = null;
        }
        if (isHintVisible) {
            resetFooterText();
        }
    }
}

function resetFooterText() {
    if (!isHintVisible) return;
    
    if (bottomTimer !== null) {
        clearTimeout(bottomTimer);
        bottomTimer = null;
    }

    footerText.style.opacity = '0';
    setTimeout(() => {
        footerText.innerText = "2026 Samet Bekiroğlu";
        footerText.style.opacity = '1';
        isHintVisible = false;
    }, 400);
}

window.addEventListener('scroll', handleBottomTimer);
window.addEventListener('load', handleBottomTimer);


let secretClickCount = 0;
let secretTimer;
let armedTimer;
let isArmed = false;

if (scrollTopBtn) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = scrollTopBtn.querySelector('.btn-icon');
                if (icon && !icon.classList.contains('spin-once-active')) {
                    icon.classList.add('spin-once-active');
                }
                observer.unobserve(scrollTopBtn);
            }
        });
    });
    observer.observe(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        resetFooterText();
        const icon = scrollTopBtn.querySelector('.btn-icon');

        if (isArmed) {
            clearTimeout(armedTimer);
            isArmed = false;
            goRestricted();
            return;
        }

        secretClickCount++;
        
        if (secretClickCount === 1) {
            secretTimer = setTimeout(() => {
                secretClickCount = 0;
            }, 5000);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } else if (secretClickCount === 3) {
            clearTimeout(secretTimer);
            secretClickCount = 0;
            isArmed = true;

            if (icon) {
                icon.classList.remove('icon-up');
                icon.classList.add('icon-down');
            }

            armedTimer = setTimeout(() => {
                isArmed = false;
                if (icon) {
                    icon.classList.remove('icon-down');
                    icon.classList.add('icon-up');
                }
            }, 5000);
            
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}


function syncSecretBoat() {
    let saveString = localStorage.getItem("fishingSave");
    if (saveString) {
        try {
            
            let saveData = JSON.parse(saveString);
            
            
            if (saveData.currentSkin) {
                let boatImg = document.querySelector('#secret-boat img');
                if (boatImg) {
                    
                    boatImg.src = `assets/images/boat${saveData.currentSkin}.png`;
                }
            }
        } catch(e) {
            console.error("Could not load fishing save data");
        }
    }
}


window.addEventListener('load', syncSecretBoat);



function initLinkedinFallback() {
  const badge = document.querySelector('.badge-base');
  const fallback = document.querySelector('.linkedin-fallback');

  if (!badge || !fallback) return;

  const hideFallback = () => {
    fallback.style.display = 'none';
  };

  const showFallback = () => {
    fallback.style.display = 'inline-flex';
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        hideFallback();
        observer.disconnect();
        return;
      }
    }
  });

  observer.observe(badge, { childList: true, subtree: true });

  setTimeout(() => {
    const hasEmbed = badge.querySelector('iframe, img, svg, .LI-profile-badge');
    if (!hasEmbed || badge.childElementCount <= 1) {
      showFallback();
    } else {
      hideFallback();
    }
    observer.disconnect();
  }, 1400);
}

function createStaticBackground(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      resolve(`url("${canvas.toDataURL('image/webp')}")`);
    };
    img.onerror = () => resolve(`url("${url}")`);
    img.src = url;
  });
}

async function initProjectCardBackgrounds() {
  for (const card of projectCards) {
    const animatedUrl = card.classList.contains('project-mini-card--coding')
      ? 'assets/images/coding.webp'
      : card.classList.contains('project-mini-card--chip')
        ? 'assets/images/chip.webp'
        : card.classList.contains('project-mini-card--energy')
          ? 'assets/images/energy.webp'
          : 'assets/images/website.webp';

    const staticUrl = await createStaticBackground(animatedUrl);
    card.style.setProperty('--card-bg', staticUrl);

    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--card-bg', `url("${animatedUrl}")`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--card-bg', staticUrl);
    });
  }
}

if (projectCards.length) {
  initProjectCardBackgrounds();
}

initLinkedinFallback();
