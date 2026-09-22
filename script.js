/* ==========================================================================
   EmailJS Initialization (Must run early to avoid initialization errors)
   ========================================================================== */
if (typeof emailjs !== "undefined") {
    emailjs.init("rnTrmOTY0qW2UVjOK");
}

document.addEventListener("DOMContentLoaded", function () {

    /* ============================= */
    /* Dark Mode Toggle */
    /* ============================= */
    window.toggleMode = function () {
        document.body.classList.toggle("light");
    };


    /* ============================= */
    /* Typing Animation */
    /* ============================= */
    const roles = ["AI Engineer", "ML Developer", "Deep Learning Explorer"];
    const typingEl = document.getElementById("typing");

    if (typingEl) {
        let i = 0, j = 0;
        let deleting = false;

        function type() {
            const currentRole = roles[i];

            if (!deleting) {
                typingEl.textContent = currentRole.substring(0, j++);
                if (j > currentRole.length) {
                    deleting = true;
                    setTimeout(type, 1000);
                    return;
                }
            } else {
                typingEl.textContent = currentRole.substring(0, j--);
                if (j < 0) {
                    deleting = false;
                    i = (i + 1) % roles.length;
                }
            }

            setTimeout(type, deleting ? 50 : 100);
        }

        type();
    }


    /* ============================= */
    /* Skills Animation */
    /* ============================= */
    const progressBars = document.querySelectorAll(".progress span");

    function animateSkills() {
        progressBars.forEach(bar => {
            if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
                bar.style.width = bar.dataset.width;
            }
        });
    }

    window.addEventListener("scroll", animateSkills);
    animateSkills(); // run once on load


    /* ============================= */
    /* Modal */
    /* ============================= */
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");

    window.openModal = function (img, title) {
        if (!modal) return;
        modal.style.display = "flex";
        modalImg.src = img;
        modalTitle.textContent = title;
    };

    window.closeModal = function () {
        if (modal) modal.style.display = "none";
    };


    /* ============================= */
    /* Particles Background */
    /* ============================= */
    const canvas = document.getElementById("particles");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles = Array.from({ length: 70 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 2,
            dx: (Math.random() - 0.5),
            dy: (Math.random() - 0.5)
        }));

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const accent = getComputedStyle(document.body)
                .getPropertyValue('--accent');

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                // bounce effect
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }


    /* ============================= */
    /* Email Obfuscation */
    /* ============================= */
    const emailElement = document.getElementById("email");

    if (emailElement) {
        const user = "sandipdusadh50";
        const domain = "gmail.com";
        emailElement.innerHTML =
            `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
    }


    /* ============================= */
    /* EmailJS Contact Form PREMIUM */
    /* ============================= */
    const form = document.getElementById("contact-form");
    const sendBtn = document.getElementById("sendBtn");

    if (form && sendBtn) {

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            startLoading();

            // We make sure emailjs exists before attempting to send
            if (typeof emailjs !== "undefined") {
                emailjs.sendForm(
                    "service_hma0mfl",
                    "template_pyeslng",
                    form
                ).then(() => {
                    showSuccess();
                    form.reset();
                }).catch((error) => {
                    console.error("EmailJS Error details:", error);
                    showError();
                });
            } else {
                console.error("EmailJS SDK failed to load. Check your CDN script tag.");
                showError();
            }
        });

        /* --- Button States --- */
        function startLoading() {
            sendBtn.classList.remove("success", "error");
            sendBtn.classList.add("loading");
            sendBtn.disabled = true;
            sendBtn.textContent = "Sending... ⏳";
        }

        function showSuccess() {
            sendBtn.classList.remove("loading", "error");
            sendBtn.classList.add("success");
            sendBtn.textContent = "Sent ✅";
            sendBtn.disabled = true;

            setTimeout(() => {
                resetButton();
            }, 2000);
        }

        function showError() {
            sendBtn.classList.remove("loading", "success");
            sendBtn.classList.add("error");
            sendBtn.textContent = "Failed ❌";
            sendBtn.disabled = false;

            // Optional: show error message under form
            showMessage("Failed to send message. Try again!", "red");

            setTimeout(() => {
                sendBtn.classList.remove("error");
                sendBtn.textContent = "Send Message";
            }, 2000);
        }

        function resetButton() {
            sendBtn.classList.remove("success", "loading", "error");
            sendBtn.disabled = false;
            sendBtn.textContent = "Send Message";
        }

        /* --- Optional Error Message Under Form --- */
        function showMessage(text, color) {
            const existingMsg = form.querySelector(".form-message");
            if (existingMsg) existingMsg.remove();

            const msg = document.createElement("p");
            msg.textContent = text;
            msg.className = "form-message";
            msg.style.color = color;
            msg.style.marginTop = "10px";
            form.appendChild(msg);

            setTimeout(() => msg.remove(), 4000);
        }
    }

});
