// Sample data for community updates

// Function to create update cards
function createUpdateCard(item) {
  return `
        <div class="update-card">
            <div class="update-header">
                <span class="update-action-icon">🏷️</span>
                <span class="update-author">${item.source}</span>
                <span class="update-timestamp">${item.created_at}</span>
            </div>
            <div class="update-content">
                <p>${item.item_name}</p>
                ${
                  item.photo_url
                    ? `<img src="${item.photo_url}" alt="${item.item_name}" class="update-image">`
                    : ""
                }
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

// const getLostItems = async () => {
//   // const response = await fetch('/lost-and-found');
//   const response = await fetch(
//     `http://localhost:5000/lost-and-found/lost-item`,
//     {
//       method: "GET",
//       // headers: { Authorization: `Bearer ${token}` },
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   // const items = await response.json();\
//   if (response.ok) {
//     const items = await response.json();
//     return items;
//   }
// };

const getLatestUpdates = async () => {
  // const response = await fetch('/lost-and-found');
  const response = await fetch(`http://localhost:5000/latest-updates`, {
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

const displayLatestUpdates = async () => {
  const updatesFeed = document.getElementById("updatesFeed");
  const items = await getLatestUpdates();
  console.log(items);
  items.forEach((item) => {
    updatesFeed.innerHTML += createUpdateCard(item);
  });
};
displayLatestUpdates();

// const displayFoundItems = async () => {
//   const updatesFeed = document.getElementById("updatesFeed");
//   const items = await getFoundItems();
//   console.log(items);
//   items.forEach((item) => {
//     updatesFeed.innerHTML += createUpdateCard(item);
//   });
// };
// displayFoundItems();
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
