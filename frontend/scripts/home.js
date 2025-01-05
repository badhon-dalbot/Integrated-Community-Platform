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
function createUpdateCard(item) {
    return `
        <div class="update-card">
            <div class="update-header">
                <img src="${item.avatar}" alt="${item.author}" class="update-avatar">
                <span class="update-author">${item.author}</span>
                <span class="update-timestamp">${item.date_lost}</span>
            </div>
            <div class="update-content">
                <p>${item.item_name}</p>
                ${item.photo_url ? `<img src="${item.photo_url}" alt="${item.item_name}" class="update-image">` : ''}
            </div>
            <div class="update-actions">
                <button class="update-action">
                    <span class="update-action-icon">👍</span>
                    ${item?.likes || 0} Likes
                </button>
                <button class="update-action">
                    <span class="update-action-icon">💬</span>
                    ${item?.comments || "No"} Comments
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

const getLostItems = async () => {
    // const response = await fetch('/lost-and-found');
    const response = await fetch(`http://localhost:5000/lost-and-found/lost-item`, {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
        headers: { "Content-Type": "application/json" },
      });
    // const items = await response.json();\
    if (response.ok) {
        const items = await response.json();
        return items;
        
    }
};

const getFoundItems = async () => {
    // const response = await fetch('/lost-and-found');
    const response = await fetch(`http://localhost:5000/lost-and-found/found-item`, {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
        headers: { "Content-Type": "application/json" },
      });
    // const items = await response.json();\
    if (response.ok) {
        const items = await response.json();
        return items;
    }
};


const displayLostItems = async () => {  
    const updatesFeed = document.getElementById('updatesFeed');
    const items = await getLostItems();
    console.log(items);
    items.forEach(item => {
        updatesFeed.innerHTML += createUpdateCard(item);
    });
};
displayLostItems();


const displayFoundItems = async () => {  
    const updatesFeed = document.getElementById('updatesFeed');
    const items = await getFoundItems();
    console.log(items);
    items.forEach(item => {
        updatesFeed.innerHTML += createUpdateCard(item);
    });
};
displayFoundItems();
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

