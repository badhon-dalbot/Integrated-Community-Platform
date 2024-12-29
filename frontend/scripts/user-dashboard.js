// Sample user data (replace with actual data from your backend)
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  memberSince: "January 1, 2023",
  activities: {
    lostAndFound: 2,
    marketplace: 3,
    alerts: 1,
    events: 4,
  },
};

// Update user profile information
document.getElementById("user-name").textContent = userData.name;
document.getElementById("profile-name").textContent = userData.name;
document.getElementById("profile-email").textContent = userData.email;
document.getElementById("member-since").textContent = userData.memberSince;

// Update activity counts
document.getElementById(
  "lost-found-count"
).textContent = `${userData.activities.lostAndFound} items`;
document.getElementById(
  "marketplace-count"
).textContent = `${userData.activities.marketplace} listings`;
document.getElementById(
  "alerts-count"
).textContent = `${userData.activities.alerts} active`;
document.getElementById(
  "events-count"
).textContent = `${userData.activities.events} attending`;

// Event listeners for buttons and links
document.getElementById("logout-btn").addEventListener("click", function () {
  alert("Logout functionality to be implemented");
});

document
  .getElementById("edit-profile-btn")
  .addEventListener("click", function () {
    alert("Edit profile functionality to be implemented");
  });

const quickAccessLinks = [
  "lost-found-link",
  "marketplace-link",
  "alerts-link",
  "events-link",
];
quickAccessLinks.forEach((linkId) => {
  document.getElementById(linkId).addEventListener("click", function (e) {
    e.preventDefault();
    alert(`Navigate to ${this.querySelector("h3").textContent} page`);
  });
});
