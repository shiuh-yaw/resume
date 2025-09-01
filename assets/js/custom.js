// iOS Safari viewport height fix
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setVH();

// Update on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Smooth scrolling for navigation links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? 50 : 70;
      const isMobile = window.innerWidth <= 991;
      const mobileOffset = isMobile ? 20 : 0;
      const targetPosition = target.offsetTop - navbarHeight - mobileOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Mobile menu enhancements
function setupMobileMenu() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  if (navbarToggler && navbarCollapse && navLinks.length > 0) {
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  }
}

// Setup mobile menu when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileMenu);
} else {
  setupMobileMenu();
}

// Also setup after a short delay to ensure Bootstrap is loaded
setTimeout(setupMobileMenu, 100);
