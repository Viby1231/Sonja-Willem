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
   RSVP FORM
========================================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");
const rsvpFrame = document.getElementById("rsvpFrame");


if (rsvpForm) {

    rsvpForm.addEventListener("submit", () => {

        const submitButton =
            rsvpForm.querySelector("button[type='submit']");


        /* -----------------------------------------
           SHOW SENDING
        ----------------------------------------- */

        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Stuur...";

        }


        if (formMessage) {

            formMessage.textContent =
                "Jou RSVP word gestuur...";

            formMessage.style.color =
                "#b85c38";

        }


        /*
            IMPORTANT:

            We DO NOT use event.preventDefault().

            The browser submits the form directly
            to Google Apps Script.
        */


        /* -----------------------------------------
           WAIT FOR GOOGLE APPS SCRIPT
        ----------------------------------------- */

        setTimeout(() => {

            if (formMessage) {

                formMessage.textContent =
                    "Dankie! Jou RSVP is ontvang. ❤️";

                formMessage.style.color =
                    "#b85c38";

            }


            rsvpForm.reset();


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Stuur RSVP";

            }

        }, 2000);

    });

}


/* =========================================
   MOBILE HERO SLIDESHOW
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".hero-gallery");

    if (!gallery) return;

    const photos = Array.from(
        gallery.querySelectorAll(".hero-photo")
    );

    if (photos.length < 2) return;

    let currentIndex = 0;
    let slideshowTimer;

    function showNextPhoto() {
        photos[currentIndex].classList.remove("active");

        currentIndex = (currentIndex + 1) % photos.length;

        photos[currentIndex].classList.add("active");
    }

    function startSlideshow() {
        clearInterval(slideshowTimer);

        if (window.innerWidth <= 700) {
            slideshowTimer = setInterval(showNextPhoto, 4000);
        }
    }

    startSlideshow();

    window.addEventListener("resize", startSlideshow);
});
