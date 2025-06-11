document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    this.querySelector("i").classList.toggle("fa-times");
    this.querySelector("i").classList.toggle("fa-bars");
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      mobileMenuBtn.querySelector("i").classList.remove("fa-times");
      mobileMenuBtn.querySelector("i").classList.add("fa-bars");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact Form Functionality
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const form = this;
      const submitBtn = document.getElementById("submit-btn");
      const result = document.getElementById("result");

      // Form validation
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Reset error messages
        document
          .querySelectorAll(".error-message")
          .forEach((el) => (el.textContent = ""));

        // Validate form fields
        let isValid = true;

        // Name validation
        const name = document.getElementById("name");
        if (name.value.trim().length < 2) {
          document.getElementById("name-error").textContent =
            "Please enter a valid name (at least 2 characters)";
          isValid = false;
        }

        // Email validation
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          document.getElementById("email-error").textContent =
            "Please enter a valid email address";
          isValid = false;
        }

        // Phone validation (optional)
        const phone = document.getElementById("phone");
        if (phone.value && !/^[0-9]{10,15}$/.test(phone.value)) {
          document.getElementById("phone-error").textContent =
            "Please enter a valid phone number (10-15 digits)";
          isValid = false;
        }

        // Message validation
        const message = document.getElementById("message");
        if (message.value.trim().length < 10) {
          document.getElementById("message-error").textContent =
            "Please enter a message (at least 10 characters)";
          isValid = false;
        }

        if (!isValid) return;

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        // Get form data
        const formData = new FormData(form);

        // Send form data
        fetch(form.action, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            result.innerHTML = data.message;
            result.classList.add(data.success ? "success" : "error");

            if (data.success) {
              form.reset();
              // Redirect to thank-you page
              window.location.href = "thank-you.html";
            }
          })
          .catch((error) => {
            result.innerHTML = "Something went wrong. Please try again later.";
            result.classList.add("error");
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
          });
      });

      // Real-time validation
      document.getElementById("name").addEventListener("input", validateName);
      document.getElementById("email").addEventListener("input", validateEmail);
      document.getElementById("phone").addEventListener("input", validatePhone);
      document
        .getElementById("message")
        .addEventListener("input", validateMessage);

      function validateName() {
        const name = document.getElementById("name");
        const error = document.getElementById("name-error");
        if (name.value.trim().length < 2 && name.value.trim().length > 0) {
          error.textContent = "Name should be at least 2 characters";
        } else {
          error.textContent = "";
        }
      }

      function validateEmail() {
        const email = document.getElementById("email");
        const error = document.getElementById("email-error");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value) && email.value.trim().length > 0) {
          error.textContent = "Please enter a valid email address";
        } else {
          error.textContent = "";
        }
      }

      function validatePhone() {
        const phone = document.getElementById("phone");
        const error = document.getElementById("phone-error");

        if (phone.value && !/^[0-9]{10,15}$/.test(phone.value)) {
          error.textContent = "Phone number should be 10-15 digits";
        } else {
          error.textContent = "";
        }
      }

      function validateMessage() {
        const message = document.getElementById("message");
        const error = document.getElementById("message-error");

        if (
          message.value.trim().length < 10 &&
          message.value.trim().length > 0
        ) {
          error.textContent = "Message should be at least 10 characters";
        } else {
          error.textContent = "";
        }
      }
    });
  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });
});
