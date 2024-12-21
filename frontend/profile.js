document.addEventListener('DOMContentLoaded', async () => {
    const logoutBtn = document.getElementById('logout-btn');

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
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load profile. Please try again.');
    }

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
});