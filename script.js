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

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwfLky_WHWkRAgSlK0ylaL66B35qKM5Xm3kBAQX1MLZqHCQyaY46mvdOC0phas7fx-Ucw/exec";


if (rsvpForm) {

    rsvpForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const submitButton =
            rsvpForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Stuur...";
        }

        if (formMessage) {
            formMessage.textContent = "Jou RSVP word gestuur...";
            formMessage.style.color = "#b85c38";
        }


        /* Create a hidden iframe */
        const iframe = document.createElement("iframe");

        iframe.name = "rsvpFrame";
        iframe.style.display = "none";

        document.body.appendChild(iframe);


        /* Create a temporary form */
        const form = document.createElement("form");

        form.method = "POST";
        form.action = GOOGLE_SCRIPT_URL;
        form.target = "rsvpFrame";
        form.style.display = "none";


        /* Copy all RSVP fields */
        const formData = new FormData(rsvpForm);

        formData.forEach((value, key) => {

            const input = document.createElement("input");

            input.type = "hidden";
            input.name = key;
            input.value = value;

            form.appendChild(input);

        });


        document.body.appendChild(form);


        /* Submit to Google Apps Script */
        form.submit();


        /* Give Google Apps Script time to process */
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

            form.remove();
            iframe.remove();

        }, 2000);

    });

}