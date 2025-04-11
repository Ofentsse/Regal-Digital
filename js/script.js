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
    document.addEventListener("DOMContentLoaded", function () {
      const contactForm = document.getElementById("contactForm");
  
      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();
  
          // Reset error messages
          document.querySelectorAll(".error-message").forEach((el) => {
            el.textContent = "";
          });
  
          // Get form values
          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("email").value.trim();
          const phone = document.getElementById("phone").value.trim();
          const message = document.getElementById("message").value.trim();
          const submitBtn = document.getElementById("submit-btn");
          const formStatus = document.getElementById("form-status");
  
          // Validate form
          let isValid = true;
  
          if (!name) {
            document.getElementById("name-error").textContent =
              "Please enter your name";
            isValid = false;
          }
  
          if (!email) {
            document.getElementById("email-error").textContent =
              "Please enter your email";
            isValid = false;
          } else if (!isValidEmail(email)) {
            document.getElementById("email-error").textContent =
              "Please enter a valid email";
            isValid = false;
          }
  
          if (phone && !isValidPhone(phone)) {
            document.getElementById("phone-error").textContent =
              "Please enter a valid phone number";
            isValid = false;
          }
  
          if (!message) {
            document.getElementById("message-error").textContent =
              "Please enter your message";
            isValid = false;
          }
  
          if (!isValid) return;
  
          // Disable submit button during submission
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
  
          // Simulate form submission (replace with actual AJAX call)
          setTimeout(() => {
            // In a real implementation, you would use fetch() or XMLHttpRequest
            // to send the data to your server
            console.log("Form submitted:", { name, email, phone, message });
  
            // Show success message
            formStatus.textContent =
              "Thank you for your message! We will get back to you soon.";
            formStatus.className = "success";
  
            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
  
            // Hide status message after 5 seconds
            setTimeout(() => {
              formStatus.textContent = "";
              formStatus.className = "";
            }, 5000);
          }, 1500);
        });
      }
  
      // Helper functions for validation
      function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
  
      function isValidPhone(phone) {
        // Basic international phone validation
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,6}$/im;
        return re.test(phone);
      }
    });
  
    // Form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;
  
        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show an alert
        console.log("Form submitted:", { name, email, phone, message });
  
        alert("Thank you for your message! We will get back to you soon.");
        contactForm.reset();
      });
    }
  
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
  