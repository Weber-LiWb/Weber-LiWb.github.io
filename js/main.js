document.addEventListener('DOMContentLoaded', () => {

    // --- Active nav detection ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Mobile hamburger menu toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    if (hamburger && navUl) {
        hamburger.addEventListener('click', () => {
            navUl.classList.toggle('nav-open');
            hamburger.classList.toggle('is-active');
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!expanded));
        });
        // Close menu when a nav link is clicked
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('nav-open');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Dark mode toggle ---
    const darkToggle = document.querySelector('.dark-mode-toggle');
    if (darkToggle) {
        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark-mode');
            darkToggle.textContent = '\u2600';
            darkToggle.setAttribute('aria-label', 'Switch to light mode');
        }

        darkToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            darkToggle.textContent = isDark ? '\u2600' : '\u263E';
            darkToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }

    // --- Sticky header border on scroll ---
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    if (header || backToTop) {
        window.addEventListener('scroll', () => {
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 10);
            }
            if (backToTop) {
                backToTop.classList.toggle('visible', window.scrollY > 300);
            }
        });
    }

    // --- Back-to-top button ---
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Fade-in on scroll ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        fadeObserver.observe(section);
    });
});
