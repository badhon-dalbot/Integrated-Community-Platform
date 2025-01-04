// Sample data for community updates
const updates = [
    {
        author: "Jane Doe",
        avatar: "https://source.unsplash.com/100x100/?portrait,woman",
        timestamp: "2 hours ago",
        content: "Lost cat near Oak Street Park. Please contact me if found!",
        image: "https://source.unsplash.com/600x400/?cat",
        likes: 15,
        comments: 7
    },
    {
        author: "John Smith",
        avatar: "https://source.unsplash.com/100x100/?portrait,man",
        timestamp: "4 hours ago",
        content: "Selling gently used bicycle. Great condition! DM for details.",
        image: "https://source.unsplash.com/600x400/?bicycle",
        likes: 8,
        comments: 3
    },
    {
        author: "Community Center",
        avatar: "https://source.unsplash.com/100x100/?building",
        timestamp: "1 day ago",
        content: "Reminder: Community cleanup event this Saturday at 10 AM. All volunteers welcome!",
        likes: 32,
        comments: 12
    }
];

// Function to create update cards
function createUpdateCard(update) {
    return `
        <div class="update-card">
            <div class="update-header">
                <img src="${update.avatar}" alt="${update.author}" class="update-avatar">
                <span class="update-author">${update.author}</span>
                <span class="update-timestamp">${update.timestamp}</span>
            </div>
            <div class="update-content">
                <p>${update.content}</p>
                ${update.image ? `<img src="${update.image}" alt="Update image" class="update-image">` : ''}
            </div>
            <div class="update-actions">
                <button class="update-action">
                    <span class="update-action-icon">👍</span>
                    ${update.likes} Likes
                </button>
                <button class="update-action">
                    <span class="update-action-icon">💬</span>
                    ${update.comments} Comments
                </button>
                <button class="update-action">
                    <span class="update-action-icon">↗️</span>
                    Share
                </button>
            </div>
        </div>
    `;
}

// Populate the updates feed
document.addEventListener('DOMContentLoaded', () => {
    const updatesFeed = document.getElementById('updatesFeed');
    updates.forEach(update => {
        updatesFeed.innerHTML += createUpdateCard(update);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});