/* =========================================
   WILLEM & SONJA WEDDING WEBSITE
   MAIN JAVASCRIPT
========================================= */


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
    IMPORTANT:
    Replace this URL with the NEW /exec URL
    from your Google Apps Script Web App.

    Example:

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
*/

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzjRdG1mTVYdaamf41huSEWIQ7o0VItfNf1NIjQ3gU8ccFbQffqVUG8b_OEW0w0dSUL3A/exec";


if (rsvpForm) {

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* -----------------------------------------
           GET SUBMIT BUTTON
        ----------------------------------------- */

        const submitButton =
            rsvpForm.querySelector("button[type='submit']");


        /* -----------------------------------------
           SHOW SENDING MESSAGE
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

            const formData = new FormData(rsvpForm);


            /* -----------------------------------------
               SEND TO GOOGLE APPS SCRIPT
            ----------------------------------------- */

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });


            /* -----------------------------------------
               SUCCESS MESSAGE
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

            /* -----------------------------------------
               ERROR
            ----------------------------------------- */

            console.error(
                "RSVP submission error:",
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
           ENABLE BUTTON AGAIN
        ----------------------------------------- */

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Stuur RSVP";
        }

    });

}