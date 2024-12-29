const darkModeToggle = document.getElementById('dark-mode');
const body = document.body;

// Check if dark mode is already enabled in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Dark mode toggle functionality
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
});