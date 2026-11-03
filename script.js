/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


/* =========================================
   RSVP FORM - FORMSUBMIT.APP
========================================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");
const rsvpFrame = document.getElementById("rsvpFrame");

if (rsvpForm && rsvpFrame) {

    let submissionPending = false;

    const submitButton = rsvpForm.querySelector(
        "button[type='submit']"
    );

    rsvpFrame.addEventListener("load", () => {

        if (!submissionPending) return;

        submissionPending = false;

        if (formMessage) {
            formMessage.textContent =
                "Jou RSVP is ingedien. Kontroleer asseblief jou e-pos indien nodig. ❤️";

            formMessage.style.color = "#b85c38";
        }

        rsvpForm.reset();

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Stuur RSVP";
        }

    });


    rsvpForm.addEventListener("submit", () => {

        submissionPending = true;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Stuur...";
        }

        if (formMessage) {
            formMessage.textContent =
                "Jou RSVP word gestuur...";

            formMessage.style.color = "#b85c38";
        }

    });

}

/* =========================================
   HERO PHOTO SLIDESHOW
========================================= */

const heroPhotos = document.querySelectorAll(".hero-photo");

if (heroPhotos.length > 1) {

    let currentPhoto = 0;

    setInterval(() => {

        heroPhotos[currentPhoto].classList.remove("active");

        currentPhoto = (currentPhoto + 1) % heroPhotos.length;

        heroPhotos[currentPhoto].classList.add("active");

    }, 5000);

}