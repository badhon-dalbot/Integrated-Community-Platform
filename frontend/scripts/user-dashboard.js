const fetchUserProfile = async () => {
  console.log(localStorage);

  const response = await fetch(`http://localhost:3000/user/profile`, {
    method: "GET",
    // headers: { Authorization: `Bearer ${token}` },
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const userData = await response.json();
    console.log(userData);
    document.getElementById("user-name").textContent = userData.username;
    document.getElementById("profile-name").textContent = userData.fullName;
    document.getElementById("profile-email").textContent = userData.email;
    document.getElementById("member-since").textContent = userData.memberSince;

    // Update activity counts
    document.getElementById("lost-found-count").textContent = `${userData.activities.lostAndFound} items`;
    document.getElementById("marketplace-count").textContent = `${userData.activities.marketplace} listings`;
    document.getElementById("alerts-count").textContent = `${userData.activities.alerts} active`;
    document.getElementById("events-count").textContent = `${userData.activities.events} attending`;
  } else {
    console.error("Failed to fetch user profile");
    // localStorage.removeItem("token");
    // window.location.href = "http:127.0.0.1:5500/frontend/index.html";
  }
};

fetchUserProfile();

// Event listeners for buttons and links
document.getElementById("logout-btn").addEventListener("click", function () {
  alert("Logout functionality to be implemented");
});

document.getElementById("edit-profile-btn").addEventListener("click", function () {
  window.location.href = 'profile.html';
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
