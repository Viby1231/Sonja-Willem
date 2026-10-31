
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
   RSVP FORM - CLOUDFLARE API
========================================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

const RSVP_API =
    "https://wedding-rsvp-api.hendricowybenga.workers.dev";

if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (event) => {
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

        try {
            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData.entries());

            const result = await fetch(RSVP_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const response = await result.json();

            if (!result.ok || !response.success) {
                throw new Error(response.error || "Submission failed");
            }

            if (formMessage) {
                formMessage.textContent =
                    "Dankie! Jou RSVP is ontvang. ❤️";
                formMessage.style.color = "#b85c38";
            }

            rsvpForm.reset();

        } catch (error) {
            console.error("RSVP error:", error);

            if (formMessage) {
                formMessage.textContent =
                    "Jammer! Jou RSVP kon nie gestuur word nie. Probeer asseblief weer.";
                formMessage.style.color = "#b85c38";
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Stuur RSVP";
            }
        }
    });
}
