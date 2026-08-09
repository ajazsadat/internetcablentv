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

  function setPending(form, pending) {
    const button = form.querySelector('button[type="submit"]');
    form.querySelectorAll("input, select, textarea, button, fieldset").forEach((el) => {
      el.disabled = pending;
    });
    if (button) {
      button.textContent = pending ? "Sending..." : "Request Free Quote";
    }
  }

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const note = form.querySelector("[data-form-note]");
      const success = form.parentElement
        ? form.parentElement.querySelector("[data-form-success]")
        : null;
      const formData = new FormData(form);
      const consentInput = form.querySelector('input[name="consent"]');
      const packages = formData
        .getAll("packages")
        .map((value) => String(value))
        .filter(Boolean);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        address: String(formData.get("address") || formData.get("zip") || "").trim(),
        provider: String(formData.get("provider") || "").trim(),
        usage: String(formData.get("usage") || "").trim(),
        packages,
        message: String(formData.get("message") || "").trim(),
        source: form.getAttribute("data-form-source") || "website",
        consent: !!(consentInput && consentInput.checked),
      };

      if (note) {
        note.hidden = true;
        note.textContent = "";
      }

      setPending(form, true);

      try {
        const response = await fetch(resolveContactEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.ok) {
          throw new Error(data.error || "Unable to send your request right now.");
        }

        form.reset();
        form.hidden = true;
        if (success) {
          success.hidden = false;
        } else if (note) {
          note.hidden = false;
          note.classList.remove("pc-form-error");
          note.textContent =
            "Thanks — we received your request. A specialist will follow up shortly.";
        }
      } catch (error) {
        if (note) {
          note.hidden = false;
          note.classList.add("pc-form-error");
          note.textContent =
            error && error.message
              ? error.message
              : "Unable to send your request right now. Please call us or try again.";
        }
        setPending(form, false);
      }
    });
  });
})();
