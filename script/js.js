document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Demo shopping cart: updates the count locally; no payment or backend is connected.
  let cartCount = 0;
  const countDisplay = document.querySelector("#cart-count");
  const cartMessage = document.querySelector("#cart-message");

  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      if (countDisplay) countDisplay.textContent = cartCount;
      if (cartMessage) cartMessage.textContent = `${button.dataset.product} added to your demo cart.`;
      button.classList.add("added");
      window.setTimeout(() => button.classList.remove("added"), 350);
    });
  });

  // Search filters the product cards by their names.
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#spice-search");
  const productCards = [...document.querySelectorAll(".product-card")];
  const emptyMessage = document.querySelector("#search-empty");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => event.preventDefault());
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      productCards.forEach((card) => {
        const matches = card.dataset.name.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
    });
  }

  // Contact form gives front-end feedback only.
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");
  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      formFeedback.textContent = "Thank you! Your message is ready. This demo form is not connected to a server.";
      contactForm.reset();
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.querySelector("#back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 450);
    }, { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
});
