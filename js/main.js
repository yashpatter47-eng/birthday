console.log("MAIN JS LOADED");

// ======================
// ACTIVE SCREEN SYSTEM
// ======================

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const current = document.getElementById(id);

    if (current) {
        current.classList.add("active");
    }

}

// ======================
// LOADER
// ======================

const loadingMessages = [
    "Searching...",
    "Finding Someone Special...",
    "Scanning Memories...",
    "Found ❤️ Japleen",
    "Preparing Surprise... ❤️"
];

const loadingText = document.getElementById("loadingText");

let loadIndex = 0;

function typeText(text, callback) {

    if (!loadingText) return;

    loadingText.innerHTML = "";

    let i = 0;

    function write() {

        if (i < text.length) {

            loadingText.innerHTML += text.charAt(i);

            i++;

            setTimeout(write, 80);

        } else {

            setTimeout(callback, 500);

        }

    }

    write();

}

function startLoader() {

    if (loadIndex >= loadingMessages.length) {

        setTimeout(() => {

            showScreen("welcome");

        }, 1000);

        return;

    }

    typeText(loadingMessages[loadIndex], () => {

        loadIndex++;

        startLoader();

    });

}

showScreen("loader");

startLoader();

// ======================
// START JOURNEY
// ======================

const startBtn = document.getElementById("startJourney");

if (startBtn) {

    startBtn.onclick = () => {

        showScreen("question");

    };

}// ======================
// LETTER + ENVELOPE
// ======================

const openLetterBtn = document.getElementById("openLetter");
const envelope = document.getElementById("envelope");
const letterBox = document.getElementById("letterContent");
const continueBtn = document.getElementById("toGallery");

const letterText = `Dear Japleen ❤️

Happy Birthday! Malkin ji 

Today is all about you.

I hope every dream you have comes true.

May your smile never fade.

Thank you for being such an amazing person.
We may not be together on this birthday,
but someday we'll celebrate it together.
 I'm looking forward to that day. ❤️
 once again happy birthday bauni 😍

Enjoy your special day.

❤️

Yash`;

if (continueBtn) {
    continueBtn.style.display = "none";
}

// ======================
// LETTER
// ======================

function showLetter() {

    if (!letterBox) return;

    // Show full letter instantly
    letterBox.innerHTML = letterText;

    if (continueBtn) {

        continueBtn.style.display = "inline-block";

    }

}

if (openLetterBtn) {

    openLetterBtn.onclick = () => {

        // Prevent double click
        openLetterBtn.disabled = true;

        envelope.classList.add("open");

        const topFlap = document.getElementById("envelopeTop");

        if (topFlap) {

            topFlap.style.transition = "0.6s";
            topFlap.style.opacity = "0";

        }

        if (continueBtn) {

            continueBtn.style.display = "none";

        }

        setTimeout(() => {

            showLetter();

        }, 600);

    };

}

if (continueBtn) {

    continueBtn.onclick = () => {

        showScreen("gallery");

    };

}
// ======================
// GALLERY SLIDER
// ======================

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const toCakeBtn = document.getElementById("toCake");

let currentSlide = 0;

function showSlide(index) {

    if (slides.length === 0) return;

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

}

showSlide(currentSlide);

// NEXT

if (nextBtn) {

    nextBtn.onclick = () => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    };

}

// PREVIOUS

if (prevBtn) {

    prevBtn.onclick = () => {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = slides.length - 1;

        }

        showSlide(currentSlide);

    };

}

// AUTO SLIDE

if (slides.length > 0) {

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 4000);

}

// NEXT SURPRISE

if (toCakeBtn) {

    toCakeBtn.onclick = () => {

        showScreen("cake");

    };

}

// ======================
// CAKE CELEBRATION
// ======================

const cakeBtn = document.getElementById("cutCake");
const cakeEffects = document.getElementById("cakeEffects");
const continueCake = document.getElementById("continueAfterCake");

function createConfetti(){

    const colors = [
        "#ff4f88",
        "#ffd700",
        "#00e5ff",
        "#8aff6b",
        "#ffffff"
    ];

    for(let i=0;i<120;i++){

        const c = document.createElement("div");

        c.className = "confetti";

        c.style.left = Math.random()*100 + "vw";

        c.style.background =
        colors[Math.floor(Math.random()*colors.length)];

        c.style.animationDelay =
        (Math.random()*1.2) + "s";

        c.style.transform =
        "rotate(" + (Math.random()*360) + "deg)";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },4000);

    }

}

if(cakeBtn){

    cakeBtn.onclick=()=>{

        // Cake Button Hide
        cakeBtn.style.display="none";

        // Cake Bounce
        const cake=document.querySelector(".cakeEmoji");

        if(cake){

            cake.style.transition=".4s";

            cake.style.transform="scale(1.25) rotate(-8deg)";

            setTimeout(()=>{

                cake.style.transform="scale(1) rotate(0deg)";

            },400);

        }

        // Fireworks
        if(typeof launchFirework==="function"){

            launchFirework();

            setTimeout(launchFirework,500);

            setTimeout(launchFirework,1000);

        }

        // Balloons
        if(typeof releaseBalloons==="function"){

            releaseBalloons();

        }

        // Confetti
        createConfetti();

        // Celebration
        if(cakeEffects){

            cakeEffects.style.display="flex";

        }

    };

}

if(continueCake){

    continueCake.onclick=()=>{

        showScreen("fireworks");

        if(typeof birthdayReveal==="function"){

            birthdayReveal();

        }

    };

}

// Continue Button

if (continueCake) {

    continueCake.onclick = () => {

        birthdayReveal();

        setTimeout(() => {

            showScreen("fireworks");

        }, 1000);

    };

}

// ======================
// FIREWORKS + COUNTDOWN
// ======================

const countdown = document.getElementById("countdown");
const countNumber = document.getElementById("countNumber");
const toYasleenBtn = document.getElementById("toYasleen");

function launchFirework() {

    const area = document.getElementById("fireworkCanvas");

    if (!area) return;

    for (let i = 0; i < 40; i++) {

        const spark = document.createElement("div");

        spark.style.position = "absolute";
        spark.style.width = "6px";
        spark.style.height = "6px";
        spark.style.borderRadius = "50%";
        spark.style.background = [
            "#ff4f88",
            "#ffd700",
            "#00e5ff",
            "#ffffff",
            "#7CFC00"
        ][Math.floor(Math.random() * 5)];

        spark.style.left = "50%";
        spark.style.top = "50%";
        spark.style.transition = "1.5s ease-out";

        area.appendChild(spark);

        requestAnimationFrame(() => {

            const x = (Math.random() - 0.5) * 700;
            const y = (Math.random() - 0.5) * 700;

            spark.style.transform = `translate(${x}px,${y}px)`;
            spark.style.opacity = "0";

        });

        setTimeout(() => spark.remove(), 1500);

    }

}

function releaseBalloons() {

    const container = document.getElementById("balloonContainer");

    if (!container) return;

    for (let i = 0; i < 25; i++) {

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        balloon.style.left = Math.random() * 100 + "vw";

        balloon.style.background = [
            "#ff4f88",
            "#ffd700",
            "#00d9ff",
            "#7CFC00",
            "#ffffff"
        ][Math.floor(Math.random() * 5)];

        balloon.style.animationDuration = (6 + Math.random() * 4) + "s";

        container.appendChild(balloon);

        setTimeout(() => balloon.remove(), 10000);

    }

}

function birthdayReveal() {

    if (!countdown) return;

    countdown.style.display = "flex";

    let n = 3;

    countNumber.innerHTML = n;

    const timer = setInterval(() => {

        n--;

        if (n > 0) {

            countNumber.innerHTML = n;

        } else if (n === 0) {

            countNumber.innerHTML = "🎉";

            launchFirework();

            releaseBalloons();

        } else {

            clearInterval(timer);

            countdown.style.display = "none";

        }

    }, 1000);

}

if (toYasleenBtn) {

    toYasleenBtn.onclick = () => {

        showScreen("yasleen");

    };

}
// ======================
// YASLEEN + VOICE + END
// ======================

const makeYasleenBtn = document.getElementById("makeYasleen");
const yasleenTitle = document.getElementById("yasleenAnimation");
const yasleenResult = document.getElementById("yasleenResult");
if (makeYasleenBtn) {

    makeYasleenBtn.onclick = () => {

        // ⚡ Screen Flash
        screenFlash();

        makeYasleenBtn.disabled = true;

        const nameMerge = document.getElementById("nameMerge");
        const name1 = document.getElementById("name1");
        const name2 = document.getElementById("name2");
        const plus = document.getElementById("plus");
        const finalName = document.getElementById("yasleenAnimation");
        const nextBtn = document.getElementById("toVoice");

        // Heart Zoom
        plus.style.transition = ".5s";
        plus.style.transform = "scale(2)";
        plus.style.opacity = "1";

        // Merge Animation
        setTimeout(() => {

            name1.classList.add("mergeLeft");
            name2.classList.add("mergeRight");
            plus.style.opacity = "0";

        },700);

        // Show Yasleen
        setTimeout(() => {

            nameMerge.style.display = "none";

            finalName.style.display = "block";

            // Fireworks
            if (typeof launchFirework === "function") {
                launchFirework();
                setTimeout(launchFirework,400);
                setTimeout(launchFirework,800);
                setTimeout(launchFirework,1200);
            }

            // Hearts
            if (typeof heartExplosion === "function") {
                heartExplosion(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );
            }

        },2000);

        // Story
        setTimeout(() => {

            if (yasleenResult) {
                yasleenResult.style.display = "block";
            }

        },2800);

        // Continue Button
        setTimeout(() => {

            if (nextBtn) {

                nextBtn.style.display = "inline-block";

                nextBtn.onclick = () => {

                    showScreen("voice");

                };

            }

        },4200);

    };

}



// ======================
// VOICE NOTE
// ======================

const playVoiceBtn = document.getElementById("playVoice");
const stopVoiceBtn = document.getElementById("stopVoice");
const voiceNext = document.getElementById("voiceNext");
const voiceAudio = document.getElementById("voiceAudio");

if (playVoiceBtn && voiceAudio) {

    // ▶ Play
    playVoiceBtn.onclick = () => {

        voiceAudio.play();

        playVoiceBtn.innerHTML = "⏸ Playing...";

    };

    // ⏹ Stop
    if (stopVoiceBtn) {

        stopVoiceBtn.onclick = () => {

            voiceAudio.pause();

            voiceAudio.currentTime = 0;

            playVoiceBtn.innerHTML = "▶ Play Voice Note";

        };

    }

    // ❤️ Continue
    if (voiceNext) {

     voiceNext.onclick = () => {

    // Stop Voice
    voiceAudio.pause();
    voiceAudio.currentTime = 0;

    // Open End Page
showScreen("end");

// Start Cinematic Ending
setTimeout(() => {

    startEndingEffects();

}, 300);

};

    }

    // Audio Finished
    voiceAudio.onended = () => {

        playVoiceBtn.innerHTML = "✅ Finished";

    };

}
// ======================
// END PAGE
// ======================

const endScreen = document.getElementById("end");

if (endScreen) {

    console.log("❤️ Birthday Website Completed ❤️");

}
// ======================
// BACKGROUND MUSIC
// ======================

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

if (musicBtn && bgMusic) {

    musicBtn.onclick = () => {

        if (!musicPlaying) {

            bgMusic.play();
            musicPlaying = true;
            musicBtn.innerHTML = "⏸";

        } else {

            bgMusic.pause();
            musicPlaying = false;
            musicBtn.innerHTML = "🎵";

        }

    };

}

// ======================
// FLOATING HEARTS
// ======================

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";
    heart.className = "heart";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "7s linear";
    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

        heart.style.transform =
            `translateY(-120vh) rotate(${720 + Math.random() * 360}deg)`;

        heart.style.opacity = "0";

    });

    setTimeout(() => {

        heart.remove();

    }, 7000);

}

setInterval(createHeart, 900);

// ======================
// CURSOR GLOW
// ======================

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "25px";
glow.style.height = "25px";
glow.style.borderRadius = "50%";
glow.style.background = "rgba(255,255,255,.15)";
glow.style.backdropFilter = "blur(4px)";
glow.style.pointerEvents = "none";
glow.style.zIndex = "99999";

document.body.appendChild(glow);

window.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX - 12 + "px";
    glow.style.top = e.clientY - 12 + "px";

});

// ======================
// SHOOTING STARS
// ======================

function shootingStar() {

    const star = document.createElement("div");

    star.className = "shootingStar";

    star.style.position = "fixed";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 200 + "px";
    star.style.width = "120px";
    star.style.height = "2px";
    star.style.background = "white";
    star.style.pointerEvents = "none";
    star.style.transform = "rotate(-35deg)";
    star.style.transition = "1.5s linear";
    star.style.zIndex = "0";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transform =
            "translate(-600px,600px) rotate(-35deg)";

        star.style.opacity = "0";

    });

    setTimeout(() => {

        star.remove();

    }, 1500);

}

setInterval(shootingStar, 3500);

// ======================
// FINISHED
// ======================

console.log("❤️ Happy Birthday Website Ready ❤️");

// ================= IMAGE CLICK VIEWER =================

const viewer = document.createElement("div");

viewer.id = "imageViewer";

viewer.innerHTML = `
<div id="viewerBox">
    <img id="viewerImage">
    <span id="viewerClose">&times;</span>
</div>
`;

document.body.appendChild(viewer);

viewer.style.display = "none";

// Open Image
document.querySelectorAll(".slide").forEach(img => {

    img.onclick = () => {

        viewer.style.display = "flex";

        document.getElementById("viewerImage").src = img.src;

    };

});

// Close Image
document.getElementById("viewerClose").onclick = () => {

    viewer.style.display = "none";

};

// ======================
// SCREEN FLASH
// ======================

function screenFlash() {

    let flash = document.getElementById("flash");

    if (!flash) {

        flash = document.createElement("div");

        flash.id = "flash";

        flash.style.position = "fixed";
        flash.style.left = "0";
        flash.style.top = "0";
        flash.style.width = "100%";
        flash.style.height = "100%";
        flash.style.background = "#ffffff";
        flash.style.opacity = "0";
        flash.style.pointerEvents = "none";
        flash.style.zIndex = "999999";

        document.body.appendChild(flash);

    }

    flash.animate(
        [
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 350
        }
    );

}


// ======================
// FINAL CELEBRATION
// ======================

const finalCelebrate = document.getElementById("finalCelebrate");

if(finalCelebrate){

    finalCelebrate.onclick = ()=>{

        // 8 Fireworks
        for(let i=0;i<8;i++){

            setTimeout(()=>{

                if(typeof launchFirework==="function"){

                    launchFirework();

                }

            },i*500);

        }

        // Hearts
        if(typeof heartExplosion==="function"){

            for(let i=0;i<6;i++){

                setTimeout(()=>{

                    heartExplosion(

                        Math.random()*window.innerWidth,

                        Math.random()*window.innerHeight

                    );

                },i*350);

            }

        }

        // Balloons
        if(typeof releaseBalloons==="function"){

            releaseBalloons();

        }

    };

}
// ======================
// CINEMATIC END
// ======================

function startEndingScene(){

    // Stars
    for(let i=0;i<120;i++){

        const s=document.createElement("div");

        s.className="star";

        s.style.left=Math.random()*100+"vw";
        s.style.top=Math.random()*100+"vh";

        s.style.animationDelay=Math.random()*2+"s";

        document.body.appendChild(s);

    }

    // Random Fireworks
    let fire=setInterval(()=>{

        if(typeof launchFirework==="function"){

            launchFirework();

        }

    },1800);

    // Floating Hearts
    let hearts=setInterval(()=>{

        if(typeof heartExplosion==="function"){

            heartExplosion(

                Math.random()*window.innerWidth,

                Math.random()*window.innerHeight

            );

        }

    },1500);

    // THE END
    setTimeout(()=>{

        let end=document.createElement("div");

        end.id="theEnd";

        end.innerHTML="✨ THE END ✨";

        document.body.appendChild(end);

        setTimeout(()=>{

            end.classList.add("show");

        },100);

    },7000);

}
// ======================
// MOVIE TITLE ANIMATION
// ======================

function startMovieCredits() {

    const yash = document.getElementById("creditYash");
    const heart = document.getElementById("creditHeart");
    const japleen = document.getElementById("creditJapleen");

    if (!yash || !heart || !japleen) return;

    // Animation restart
    yash.style.animation = "none";
    heart.style.animation = "none";
    japleen.style.animation = "none";

    void yash.offsetWidth;

    yash.style.animation = "yashEnter 4s forwards";
    heart.style.animation = "heartBeat 4s forwards";
    japleen.style.animation = "japleenEnter 4s forwards";

    // Fireworks
    if (typeof launchFirework === "function") {

        setTimeout(launchFirework, 500);
        setTimeout(launchFirework, 1200);
        setTimeout(launchFirework, 2000);
        setTimeout(launchFirework, 3000);

    }

    // Hearts
    if (typeof heartExplosion === "function") {

        setTimeout(() => {

            heartExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

        }, 2200);

    }

}
// ======================================
// CINEMATIC ENDING
// ======================================

function startEndingEffects() {

    // Fireworks
    if (typeof launchFirework === "function") {

        let i = 0;

        const fw = setInterval(() => {

            launchFirework();

            i++;

            if (i >= 8) {

                clearInterval(fw);

            }

        }, 1200);

    }

    // Floating Hearts
    const heartInterval = setInterval(() => {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "-50px";
        heart.style.fontSize = (20 + Math.random() * 35) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";
        heart.style.transition = "transform 6s linear, opacity 6s linear";

        document.body.appendChild(heart);

        requestAnimationFrame(() => {

            heart.style.transform =
                `translateY(-${window.innerHeight + 200}px)
                 rotate(${Math.random() * 720}deg)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {

            heart.remove();

        }, 6000);

    }, 500);

    // Show Celebrate Button after credits
    setTimeout(() => {

        clearInterval(heartInterval);

        const btn = document.getElementById("finalCelebrate");

        if (btn) {

            btn.style.display = "inline-block";

            btn.animate([
                {transform:"translateX(-50%) scale(.2)",opacity:0},
                {transform:"translateX(-50%) scale(1.15)",opacity:1},
                {transform:"translateX(-50%) scale(1)",opacity:1}
            ],{
                duration:900,
                fill:"forwards"
            });

        }

    },38000);

}

// Restart Button
const finalBtn = document.getElementById("finalCelebrate");

if(finalBtn){

    finalBtn.onclick=()=>{

        location.reload();

    };

}
// ======================================
// QUESTION + PASSWORD SYSTEM
// ======================================

const startJourney = document.getElementById("startJourney");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const passwordBtn = document.getElementById("passwordBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const accessGranted = document.getElementById("accessGranted");

// Welcome → Question
if (startJourney) {

    startJourney.onclick = () => {

        showScreen("question");

    };

}

// YES → PASSWORD HINT
if (yesBtn) {

    yesBtn.onclick = () => {

        showScreen("passwordHint");

    };

}

// NO Button Bhaagega 😂
if (noBtn) {

    noBtn.onmouseover = () => {

        const x = Math.random() * (window.innerWidth - 180);

        const y = Math.random() * (window.innerHeight - 80);

        noBtn.style.position = "fixed";

        noBtn.style.left = x + "px";

        noBtn.style.top = y + "px";

    };

}

// Password Check
function checkPassword() {

    const pass = passwordInput.value.trim().toLowerCase();

    if (pass === "yasleen") {

        passwordError.innerHTML = "";

        // Hearts
        if (typeof heartExplosion === "function") {

            heartExplosion(
                window.innerWidth / 2,
                window.innerHeight / 2
            );

        }

        // Fireworks
        if (typeof launchFirework === "function") {

            launchFirework();

            setTimeout(launchFirework, 400);

            setTimeout(launchFirework, 800);

        }

        // Access Popup
        accessGranted.classList.add("show");

        // Letter Page
        setTimeout(() => {

            accessGranted.classList.remove("show");

            showScreen("letter");

        }, 1500);

    } else {

        passwordError.innerHTML = "❌ Wrong Password ❤️";

        passwordInput.animate(
            [
                { transform: "translateX(-10px)" },
                { transform: "translateX(10px)" },
                { transform: "translateX(-10px)" },
                { transform: "translateX(10px)" },
                { transform: "translateX(0px)" }
            ],
            {
                duration: 400
            }
        );

    }

}

// Continue Button
if (passwordBtn) {

    passwordBtn.onclick = checkPassword;

}

// ENTER Key Support
if (passwordInput) {

    passwordInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            checkPassword();

        }

    });

}