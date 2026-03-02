document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');

    // Mobile navigation toggle logic can go here
    // For now, it's a simple placeholder
    
    // Example: Add active class to current nav item based on URL
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});
