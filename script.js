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


/*
    PUT YOUR GOOGLE APPS SCRIPT /exec URL HERE
*/

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz84HYcLdojN57Gu0XWYjhhK1WRN20HfdQBVDSJxBev-G1L5SOnk3BJiTQfV6ddt34orw/exec";


if (rsvpForm) {

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();


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


        try {

            /* -----------------------------------------
               COLLECT FORM DATA
            ----------------------------------------- */

            const formData =
                new FormData(rsvpForm);


            /* -----------------------------------------
               SEND TO GOOGLE APPS SCRIPT
            ----------------------------------------- */

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                body: formData,

                mode: "no-cors"

            });


            /* -----------------------------------------
               SUCCESS
            ----------------------------------------- */

            if (formMessage) {

                formMessage.textContent =
                    "Dankie! Jou RSVP is ontvang. ❤️";

                formMessage.style.color =
                    "#b85c38";

            }


            /* -----------------------------------------
               CLEAR FORM
            ----------------------------------------- */

            rsvpForm.reset();


        } catch (error) {

            console.error(
                "RSVP error:",
                error
            );


            if (formMessage) {

                formMessage.textContent =
                    "Iets het verkeerd geloop. Probeer asseblief weer.";

                formMessage.style.color =
                    "#b85c38";

            }

        }


        /* -----------------------------------------
           ENABLE BUTTON
        ----------------------------------------- */

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Stuur RSVP";

        }

    });

}