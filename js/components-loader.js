// Load Navbar and Footer components
document.addEventListener('DOMContentLoaded', function () {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            const navPlaceholder = document.getElementById('navbar-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = html;
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = html;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});
