(function () {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const steps = document.querySelectorAll(".process-item");
  if (steps.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    steps.forEach((el) => io.observe(el));
  } else {
    steps.forEach((el) => el.classList.add("inview"));
  }

  function resolveContactEndpoint() {
    try {
      return new URL("/api/contact.php", window.location.origin).pathname;
    } catch (e) {
      return "/api/contact.php";
    }
  }

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = form.querySelector("[data-form-note]");
      const button = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const consentInput = form.querySelector('input[name="consent"]');

      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        zip: String(formData.get("zip") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        source: form.getAttribute("data-form-source") || "website",
        consent: !!(consentInput && consentInput.checked),
      };

      if (note) {
        note.textContent = "Sending…";
        note.style.color = "";
      }
      if (button) {
        button.disabled = true;
      }

      try {
        const response = await fetch(resolveContactEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Unable to send your message right now.");
        }
        form.reset();
        if (note) {
          note.textContent =
            "Thanks — your request was sent. A specialist will follow up shortly.";
        }
      } catch (error) {
        if (note) {
          note.textContent =
            error && error.message
              ? error.message
              : "Unable to send your message right now. Please call us instead.";
          note.style.color = "#c0392b";
        }
      } finally {
        if (button) {
          button.disabled = false;
        }
      }
    });
  });
})();
