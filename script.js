/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   RSVP FORM
========================================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

rsvpForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton =
        rsvpForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Stuur...";

    /*
        WE WILL CONNECT THIS TO GOOGLE SHEETS
        AND EMAIL NEXT.
    */

    await new Promise(resolve =>
        setTimeout(resolve, 800)
    );

    formMessage.textContent =
        "Dankie! Jou RSVP is ontvang. ❤️";

    formMessage.style.color =
        "#b85c38";

    rsvpForm.reset();

    submitButton.disabled = false;
    submitButton.textContent = "Stuur RSVP";

});