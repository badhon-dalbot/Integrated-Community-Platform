document.addEventListener('DOMContentLoaded', async () => {
    const logoutBtn = document.getElementById('logout-btn');
    const darkModeToggle = document.getElementById('dark-mode');
    const body = document.body;

    // Fetch user profile data
    try {
        const response = await fetch('/api/profile');
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('profile-name').textContent = userData.name;
            document.getElementById('profile-username').textContent = userData.username;
            document.getElementById('profile-phone').textContent = userData.phone;
            document.getElementById('profile-email').textContent = userData.email;
            document.getElementById('profile-address').textContent = userData.address;
            document.getElementById('profile-role').textContent = userData.role;
        } else {
            // Redirect to login page if the profile data cannot be fetched
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load profile. Please try again.');
    }

    // Logout functionality
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (response.ok) {
                window.location.href = '/index.html';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Logout failed. Please try again.');
        }
    });

    // Check if dark mode is already enabled in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled'); // Save preference to localStorage
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled'); // Save preference to localStorage
        }
    });
});
