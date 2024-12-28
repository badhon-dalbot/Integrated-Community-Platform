document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const body = document.body;

    // Initialize dark mode based on localStorage
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

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                window.location.href = '/profile.html';  // Redirect to profile page after successful login
            } else {
                // Display login failed message (this will trigger when the response is not OK)
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Collecting form data
        const userData = {
            name: document.getElementById('reg-name').value,
            username: document.getElementById('reg-username').value,
            phone: document.getElementById('reg-phone').value,
            email: document.getElementById('reg-email').value,
            address: document.getElementById('reg-address').value,
            role: document.getElementById('reg-role').value,
            password: document.getElementById('reg-password').value
        };

        console.log(userData);
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert('Registration successful! Please login.');
                // Hide registration section and show login section
                registerSection.style.display = 'none';
                loginSection.style.display = 'block';
            } else {
                const errorResponse = await response.json(); // Read the error message from response
                alert(errorResponse.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

});
