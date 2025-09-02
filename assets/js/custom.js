// Custom JavaScript for Resume

// Set viewport height for mobile devices
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize viewport height
setVH();

// Event listeners for viewport height
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Visual viewport support for mobile
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setVH);
}

// Smooth scrolling with offset for fixed navbar
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 80;
  const offset = navbarHeight + 20; // Add some extra padding
  
  const targetPosition = target.offsetTop - offset;
  
  // Prevent multiple rapid scrolls to the same target
  if (window.currentScrollTarget === targetId && Date.now() - window.lastScrollTime < 1000) {
    return;
  }
  
  window.currentScrollTarget = targetId;
  window.lastScrollTime = Date.now();
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Add click event listeners to all navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollTo(targetId);
    });
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Mobile menu setup
function setupMobileMenu() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  if (!navbarToggler || !navbarCollapse) return;
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  });
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Also initialize on Bootstrap events
document.addEventListener('shown.bs.collapse', setupMobileMenu);
document.addEventListener('hidden.bs.collapse', setupMobileMenu);
