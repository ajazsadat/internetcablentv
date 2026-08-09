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

  document.querySelectorAll("form[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector("[data-form-note]");
      if (note) {
        note.textContent =
          "Thanks — your request was captured. A specialist will follow up shortly.";
      }
      form.reset();
    });
  });
})();
