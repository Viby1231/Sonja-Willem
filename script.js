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

if (rsvpForm && formMessage && rsvpFrame) {

    const submitButton = rsvpForm.querySelector(
        "button[type='submit']"
    );

    const requestIdInput = document.getElementById("requestId");

    let currentRequestId = null;
    let requestTimeout = null;


    /* =====================================
       SUBMIT RSVP
    ===================================== */

    rsvpForm.addEventListener("submit", (event) => {

        if (!rsvpForm.reportValidity()) {
            event.preventDefault();
            return;
        }

        // Prevent duplicate submissions
        if (currentRequestId !== null) {
            event.preventDefault();
            return;
        }

        // Generate a unique request ID
        currentRequestId =
            Date.now().toString() + "-" +
            Math.random().toString(36).substring(2);

        requestIdInput.value = currentRequestId;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Stuur...";
        }

        formMessage.textContent =
            "Jou RSVP word gestuur. Wag asseblief...";

        formMessage.style.color = "#b85c38";

        const submittedRequestId = currentRequestId;


        // Wait up to 30 seconds for Google's response
        requestTimeout = setTimeout(() => {

            if (currentRequestId === submittedRequestId) {

                formMessage.textContent =
                    "Ons kon nie die bevestiging ontvang nie. " +
                    "Kontroleer asseblief jou e-pos voordat jy weer indien.";

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Probeer weer";
                }

                currentRequestId = null;
            }

        }, 30000);

        /*
          IMPORTANT:
          Do not use preventDefault() here.

          The browser must submit the form normally
          to the hidden Google Apps Script iframe.
        */

    });


    /* =====================================
       RECEIVE GOOGLE RESPONSE
    ===================================== */

    window.addEventListener("message", (event) => {

        // Only accept messages from our hidden iframe
        if (event.source !== rsvpFrame.contentWindow) {
            return;
        }

        const result = event.data;

        if (!result || result.type !== "RSVP_RESULT") {
            return;
        }

        // Make sure this is the correct submission
        if (result.requestId !== currentRequestId) {
            return;
        }

        clearTimeout(requestTimeout);


        if (result.success === true) {

            formMessage.textContent =
                "Baie dankie! Jou RSVP is suksesvol ontvang. ❤️";

            formMessage.style.color = "#b85c38";

            rsvpForm.reset();

        } else {

            formMessage.textContent =
                "Jou RSVP kon nie gestuur word nie: " +
                (result.error || "Probeer asseblief weer.");

            formMessage.style.color = "#b85c38";

        }


        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Stuur RSVP";
        }

        currentRequestId = null;

    });

}